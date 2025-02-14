// src/email/templates.ts
export interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
  variables?: string[];
}

export const defaultTemplates: Record<string, EmailTemplate> = {
  welcome: {
    name: 'welcome',
    subject: 'Welcome to our platform!',
    html: `
        <h1>Welcome!</h1>
        <p>Hello {{name}},</p>
        <p>Welcome to our platform. We're excited to have you here!</p>
      `,
    variables: ['name'],
  },
  notification: {
    name: 'notification',
    subject: 'New Activity Alert',
    html: `
        <h2>New Activity</h2>
        <p>{{message}}</p>
      `,
    variables: ['message'],
  },
};
