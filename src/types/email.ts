// src/types/email.ts
export interface EmailConfig {
  from: string;
  to: string;
  subject: string;
  template?: string;
  html?: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
  metadata?: Record<string, any>;
}

export interface WebhookConfig {
  url: string;
  secret: string;
  events: string[];
}
