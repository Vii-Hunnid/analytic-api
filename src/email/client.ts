// src/email/client.ts
import { Resend } from 'resend';
import { EmailConfig } from '../types/email';
import { TrackingManager } from '../analytics/tracker';

export class EmailClient {
  private resend: Resend;
  private trackingManager: TrackingManager;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.trackingManager = new TrackingManager();
  }

  async send(config: EmailConfig) {
    let html = config.html || '';

    if (config.trackClicks) {
      html = this.trackingManager.injectClickTracking(html, {
        emailId: crypto.randomUUID(),
        metadata: config.metadata
      });
    }

    if (config.trackOpens) {
      html += this.trackingManager.createTrackingPixel({
        emailId: crypto.randomUUID(),
        metadata: config.metadata
      });
    }

    return this.resend.emails.send({
      from: config.from,
      to: config.to,
      subject: config.subject,
      html
    });
  }
}