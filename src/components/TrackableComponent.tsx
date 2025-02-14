// src/components/TrackableComponent.tsx
import React, { useEffect, useCallback } from 'react';
import { TrackingManager } from '../analytics/tracker';

interface TrackableComponentProps {
  elementId: string;
  onMetricsUpdate?: (metrics: any) => void;
  children: React.ReactNode;
}

export const TrackableComponent: React.FC<TrackableComponentProps> = ({
  elementId,
  onMetricsUpdate,
  children,
}) => {
  const trackingManager = new TrackingManager();

  const handleClick = useCallback(async () => {
    await trackingManager.trackEvent({
      type: 'click',
      elementId,
      pageUrl: window.location.pathname,
      userId: 'user-123', // Get from auth
    });
  }, [elementId]);

  useEffect(() => {
    const startTime = Date.now();

    // Track view
    trackingManager.trackEvent({
      type: 'view',
      elementId,
      pageUrl: window.location.pathname,
      userId: 'user-123', // Get from auth
    });

    return () => {
      // Track time spent
      const duration = Date.now() - startTime;
      trackingManager.trackEvent({
        type: 'timeSpent',
        elementId,
        pageUrl: window.location.pathname,
        duration,
        userId: 'user-123', // Get from auth
      });
    };
  }, [elementId]);

  return <div onClick={handleClick}>{children}</div>;
};
