// src/analytics/realtime.ts
import { WebSocket } from 'ws';
import { TrackingEvent } from '../types/analytics';

export class RealtimeAnalytics {
  private clients: Set<WebSocket> = new Set();

  addClient(ws: WebSocket) {
    this.clients.add(ws);
    
    ws.on('close', () => {
      this.clients.delete(ws);
    });
  }

  broadcastEvent(event: TrackingEvent) {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(event));
      }
    });
  }
}