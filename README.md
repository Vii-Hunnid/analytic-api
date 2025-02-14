# Analytic-API

A comprehensive analytics and email tracking package for Next.js applications. Track user interactions, monitor email engagement, and gather real-time analytics with ease.

## Features

- 📧 Email Tracking
  - Track email opens and clicks
  - Custom email templates
  - Webhook support for email events
- 📊 Analytics
  - Component-level tracking
  - Page view analytics
  - Time spent metrics
  - Real-time updates
- 🔄 Database Integration
  - Supabase support
  - Firebase support
  - Custom storage options

## Installation

```bash
npm install analytic-api
```

## Environment Setup

Add these environment variables to your `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=your_app_url
```

## Basic Usage

### 1. Track Component Interactions

```tsx
import { TrackableComponent } from 'analytic-api';

export default function HomePage() {
  return (
    <TrackableComponent elementId="hero-section">
      <button>Click Me!</button>
    </TrackableComponent>
  );
}
```

### 2. Send Tracked Emails

```tsx
import { EmailClient } from 'analytic-api';

export async function sendWelcomeEmail(userEmail: string) {
  const emailClient = new EmailClient();

  await emailClient.send({
    from: 'welcome@yourapp.com',
    to: userEmail,
    subject: 'Welcome!',
    html: '<p>Welcome to our platform!</p>',
    trackOpens: true,
    trackClicks: true,
  });
}
```

### 3. Display Analytics Dashboard

```tsx
import { AnalyticsDashboard } from 'analytic-api';

export default function AnalyticsPage() {
  return (
    <AnalyticsDashboard
      timeRange={{
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
      }}
      granularity="day"
    />
  );
}
```

## API Routes Setup

### 1. Track Events (app/api/track/route.ts)

```tsx
import { TrackingManager } from 'analytic-api';

export async function POST(req: Request) {
  const trackingManager = new TrackingManager();
  const body = await req.json();

  await trackingManager.trackEvent(body);

  return Response.json({ success: true });
}
```

### 2. Email Webhook (app/api/email-webhook/route.ts)

```tsx
import { EmailWebhookHandler } from 'analytic-api';

export async function POST(req: Request) {
  const webhookHandler = new EmailWebhookHandler();
  const body = await req.json();

  await webhookHandler.handleWebhook(
    body,
    req.headers.get('signature') || '',
    process.env.WEBHOOK_SECRET || '',
  );

  return Response.json({ success: true });
}
```

## Database Setup

### Supabase Setup

Run these SQL queries in your Supabase SQL editor:

```sql
-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR NOT NULL,
  data JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id VARCHAR,
  session_id VARCHAR
);

-- Create indexes
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_timestamp ON events(timestamp);
```

## Advanced Features

### 1. Custom Email Templates

```typescript
import { EmailClient } from 'analytic-api';

const emailClient = new EmailClient();

await emailClient.send({
  from: 'notifications@yourapp.com',
  to: 'user@example.com',
  template: 'welcome',
  data: {
    name: 'John Doe',
    activationLink: 'https://yourapp.com/activate',
  },
});
```

### 2. Real-time Analytics

```typescript
import { RealtimeAnalytics } from 'analytic-api';

const realtime = new RealtimeAnalytics();

// Subscribe to real-time updates
realtime.addClient(websocket);
```

## Configuration Options

```typescript
import { getConfig } from 'analytic-api';

const config = getConfig();
// Access environment variables and configuration
```

## Error Handling

The package includes built-in error handling. Example:

```typescript
try {
  await emailClient.send({
    // email config
  });
} catch (error) {
  if (error.code === 'invalid_recipient') {
    // Handle invalid email
  }
  // Handle other errors
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

For support, email support@yourcompany.com or create an issue in the GitHub repository.
