// src/storage/queries.ts
export const queries = {
  createTables: {
    events: `
        CREATE TABLE IF NOT EXISTS events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          type VARCHAR NOT NULL,
          data JSONB,
          timestamp TIMESTAMPTZ DEFAULT NOW(),
          user_id VARCHAR,
          session_id VARCHAR
        );
      `,
    metrics: `
        CREATE TABLE IF NOT EXISTS metrics (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          type VARCHAR NOT NULL,
          value NUMERIC,
          timestamp TIMESTAMPTZ DEFAULT NOW(),
          metadata JSONB
        );
      `,
  },
  indexes: {
    eventsTypeIdx: `CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);`,
    eventsTimestampIdx: `CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);`,
  },
};
