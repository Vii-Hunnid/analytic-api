// src/index.ts

// Export types
export * from './types/email';
export * from './types/analytics';
export * from './types/storage';


// Export components
export { TrackableComponent } from './components/TrackableComponent';
export { AnalyticsDashboard } from './components/AnalyticsDashboard';

// Export email functionality
export { EmailClient } from './email/client';
export { EmailWebhookHandler } from './email/webhook';
export { defaultTemplates } from './email/templates';

// Export analytics functionality
export { TrackingManager } from './analytics/tracker';
export { MetricsAnalyzer } from './analytics/metrics';
export { RealtimeAnalytics } from './analytics/realtime';

// Export storage functionality
export { StorageClient } from './storage/client';
export { queries } from './storage/queries';

// Export configuration
export { getConfig } from './config/env';
