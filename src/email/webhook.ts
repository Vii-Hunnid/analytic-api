
// src/email/webhook.ts
import crypto from 'crypto';
import { WebhookConfig } from '../types/email';
import { StorageClient } from '../storage/client';

export class EmailWebhookHandler {
  private storageClient: StorageClient;
  
  constructor() {
    this.storageClient = new StorageClient();
  }

  async handleWebhook(payload: any, signature: string, secret: string) {
    if (!this.verifySignature(payload, signature, secret)) {
      throw new Error('Invalid webhook signature');
    }

    await this.processWebhookEvent(payload);
  }

  private verifySignature(payload: any, signature: string, secret: string): boolean {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(JSON.stringify(payload)).digest('hex');
    return signature === digest;
  }

  private async processWebhookEvent(payload: any) {
    await this.storageClient.storeEvent({
      type: 'email_event',
      data: payload,
      timestamp: new Date()
    });
  }
}