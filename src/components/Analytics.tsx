import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

// Google Analytics Tracking ID - Unified across all Julisha Solutions domains
const GA_TRACKING_ID = 'G-L93EVW97ED';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics on first load
    analytics.init(GA_TRACKING_ID);
  }, []);

  useEffect(() => {
    // Track page views on route changes
    analytics.trackPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;