// src/components/AnalyticsDashboard.tsx
import React, { useEffect, useState } from 'react';
import { MetricsAnalyzer } from '../analytics/metrics';
import { RealtimeAnalytics } from '../analytics/realtime';

interface DashboardProps {
  timeRange: {
    start: Date;
    end: Date;
  };
  granularity: 'hour' | 'day' | 'week' | 'month';
}

export const AnalyticsDashboard: React.FC<DashboardProps> = ({ timeRange, granularity }) => {
  const [metrics, setMetrics] = useState<any>(null);
  const metricsAnalyzer = new MetricsAnalyzer();
  const realtime = new RealtimeAnalytics();

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await metricsAnalyzer.getMetrics({
        timeRange,
        granularity,
        metrics: ['clicks', 'views', 'timeSpent'],
      });
      setMetrics(data);
    };

    fetchMetrics();
  }, [timeRange, granularity]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      {metrics && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <h3>Clicks</h3>
            <p className="text-2xl">{metrics.clicks}</p>
          </div>
          <div className="p-4 border rounded">
            <h3>Views</h3>
            <p className="text-2xl">{metrics.views}</p>
          </div>
          <div className="p-4 border rounded">
            <h3>Avg Time Spent</h3>
            <p className="text-2xl">{Math.round(metrics.timeSpent / 1000)}s</p>
          </div>
        </div>
      )}
    </div>
  );
};
