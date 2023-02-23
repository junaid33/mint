import Router from 'next/router';
import { useState, useEffect } from 'react';

import { AnalyticsMediatorInterface } from '@/analytics/AbstractAnalyticsImplementation';
import AnalyticsMediator from '@/analytics/AnalyticsMediator';
import { AnalyticsMediatorConstructorInterface } from '@/analytics/AnalyticsMediator';
import FakeAnalyticsMediator from '@/analytics/FakeAnalyticsMediator';

export type RouteProps = {
  shallow: boolean;
};

/**
 * useAnalytics is the only way to create an AnalyticsMediator. Trying to create an
 * AnalyticsMediator without this hook will break because code like onRouteChange will
 * never be called.
 * @param analyticsConfig Config for each analytics implementation
 */
export function useAnalytics(
  analyticsConfig: AnalyticsMediatorConstructorInterface,
  subdomain?: string,
  internalAnalyticsWriteKey?: string
) {
  const [initializedAnalyticsMediator, setInitializedAnalyticsMediator] = useState(false);
  const [analyticsMediator, setAnalyticsMediator] = useState<AnalyticsMediatorInterface>(
    new FakeAnalyticsMediator()
  );

  // AnalyticsMediator can only run in the browser
  // We use useEffect because it only runs on render
  useEffect(() => {
    if (!initializedAnalyticsMediator && subdomain) {
      const newMediator = new AnalyticsMediator(
        subdomain,
        analyticsConfig,
        internalAnalyticsWriteKey
      );
      setAnalyticsMediator(newMediator);
      setInitializedAnalyticsMediator(true);
    }
  }, [initializedAnalyticsMediator, subdomain, analyticsConfig, internalAnalyticsWriteKey]);

  useEffect(() => {
    analyticsMediator.onRouteChange(Router.asPath, { initialLoad: true });

    Router.events.on('routeChangeComplete', (url: string, routeProps: RouteProps) => {
      analyticsMediator.onRouteChange(url, routeProps);
    });
  }, [analyticsMediator]);

  return analyticsMediator;
}
