// src/analytics/tracker.ts
import crypto from 'crypto';
import { StorageClient } from '../storage/client';
import { TrackingEvent } from '../types/analytics';

export class TrackingManager {
  private storageClient: StorageClient;
  private realtimeClients: Set<WebSocket> = new Set();

  constructor() {
    this.storageClient = new StorageClient();
  }

  createTrackingPixel(metadata: Record<string, any>): string {
    const trackingUrl = this.generateTrackingUrl('open', metadata);
    return `<img src="${trackingUrl}" width="1" height="1" style="display:none" />`;
  }

  injectClickTracking(html: string, metadata: Record<string, any>): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    doc.querySelectorAll('a').forEach((link) => {
      const trackingUrl = this.generateTrackingUrl('click', {
        originalUrl: link.href,
        ...metadata,
      });
      link.href = trackingUrl;
    });

    return doc.documentElement.outerHTML;
  }

  async trackEvent(event: Omit<TrackingEvent, 'timestamp'>) {
    const fullEvent: TrackingEvent = {
      ...event,
      timestamp: new Date(),
    };

    // Store event
    await this.storageClient.storeEvent(fullEvent);

    // Notify realtime clients
    this.notifyRealtimeClients(fullEvent);
  }

  private generateTrackingUrl(type: 'open' | 'click', metadata: Record<string, any>): string {
    const trackingId = crypto.randomBytes(16).toString('hex');
    const params = new URLSearchParams({
      type,
      id: trackingId,
      ...metadata,
    });

    return `${process.env.NEXT_PUBLIC_APP_URL}/api/track?${params.toString()}`;
  }

  private notifyRealtimeClients(event: TrackingEvent) {
    this.realtimeClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(event));
      }
    });
  }
}
