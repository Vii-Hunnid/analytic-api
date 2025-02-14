// src/analytics/metrics.ts
import { MetricsConfig } from '../types/analytics';
import { StorageClient } from '../storage/client';

export class MetricsAnalyzer {
  private storageClient: StorageClient;

  constructor() {
    this.storageClient = new StorageClient();
  }

  async getMetrics(config: MetricsConfig) {
    const events = await this.storageClient.getEvents(config.timeRange.start, config.timeRange.end);

    return {
      clicks: this.aggregateClicks(events),
      views: this.aggregateViews(events),
      timeSpent: this.aggregateTimeSpent(events),
      granularity: config.granularity,
    };
  }

  private aggregateClicks(events: any[]) {
    return events.filter((e) => e.type === 'click').length;
  }

  private aggregateViews(events: any[]) {
    return events.filter((e) => e.type === 'view').length;
  }

  private aggregateTimeSpent(events: any[]) {
    const timeSpentEvents = events.filter((e) => e.type === 'timeSpent');
    if (timeSpentEvents.length === 0) return 0;

    return timeSpentEvents.reduce((sum, e) => sum + (e.duration || 0), 0) / timeSpentEvents.length;
  }
}
