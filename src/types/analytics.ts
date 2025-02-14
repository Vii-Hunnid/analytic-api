// src/types/analytics.ts
export interface TrackingEvent {
  type: 'click' | 'view' | 'timeSpent';
  elementId?: string;
  pageUrl?: string;
  duration?: number;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface MetricsConfig {
  timeRange: {
    start: Date;
    end: Date;
  };
  granularity: 'hour' | 'day' | 'week' | 'month';
  metrics: ('clicks' | 'views' | 'timeSpent')[];
}
