// src/storage/client.ts
import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { TrackingEvent } from '../types/analytics';

export class StorageClient {
  private supabase;
  private firebase;

  constructor() {
    // Initialize Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      this.supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    }

    // Initialize Firebase
    if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
      const app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG));
      this.firebase = getFirestore(app);
    }
  }

  async storeEvent(event: TrackingEvent) {
    if (this.supabase) {
      const { data, error } = await this.supabase
        .from('events')
        .insert(event)
        .select();
        
      if (error) throw error;
      return data;
    }
    
    if (this.firebase) {
      const docRef = await this.firebase
        .collection('events')
        .add(event);
      return { id: docRef.id };
    }

    throw new Error('No database configured');
  }

  async getMetrics(config: {
    elementId?: string;
    pageUrl?: string;
    timeRange: { start: Date; end: Date };
    type: 'click' | 'view' | 'timeSpent';
  }) {
    if (this.supabase) {
      let query = this.supabase
        .from('events')
        .select('*')
        .eq('type', config.type)
        .gte('timestamp', config.timeRange.start.toISOString())
        .lte('timestamp', config.timeRange.end.toISOString());

      if (config.elementId) {
        query = query.eq('elementId', config.elementId);
      }

      if (config.pageUrl) {
        query = query.eq('pageUrl', config.pageUrl);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return this.aggregateMetrics(data);
    }

    throw new Error('No database configured');
  }

  private aggregateMetrics(events: TrackingEvent[]) {
    return {
      total: events.length,
      byHour: this.groupByHour(events),
      byUser: this.groupByUser(events),
      averageDuration: this.calculateAverageDuration(events)
    };
  }

  private groupByHour(events: TrackingEvent[]) {
    return events.reduce((acc, event) => {
      const hour = new Date(event.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  private groupByUser(events: TrackingEvent[]) {
    return events.reduce((acc, event) => {
      if (event.userId) {
        acc[event.userId] = (acc[event.userId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }

  private calculateAverageDuration(events: TrackingEvent[]) {
    const timeSpentEvents = events.filter(e => e.type === 'timeSpent' && e.duration);
    if (timeSpentEvents.length === 0) return 0;
    
    const total = timeSpentEvents.reduce((sum, e) => sum + (e.duration || 0), 0);
    return total / timeSpentEvents.length;
  }
}

// src/storage/queries.ts
export const createTables = {
  supabase: `
    CREATE TABLE events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      type VARCHAR NOT NULL,
      element_id VARCHAR,
      page_url VARCHAR,
      duration INTEGER,
      user_id VARCHAR,
      session_id VARCHAR,
      metadata JSONB,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    CREATE INDEX idx_events_type ON events(type);
    CREATE INDEX idx_events_timestamp ON events(timestamp);
    CREATE INDEX idx_events_user_id ON events(user_id);
  `
};