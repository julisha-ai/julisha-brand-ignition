import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

// Google Analytics Tracking ID - This should be set via environment or config
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual tracking ID

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics on first load
    if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      analytics.init(GA_TRACKING_ID);
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      analytics.trackPageView(location.pathname + location.search);
    }
  }, [location]);

  // Web vitals tracking can be added later if needed
  // For now, we focus on basic Google Analytics tracking

  return null; // This component doesn't render anything
};

export default Analytics;