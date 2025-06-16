// Analytics tracking service
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;
  private trackingId: string | null = null;

  init(trackingId: string) {
    if (this.isInitialized) return;
    
    this.trackingId = trackingId;
    this.loadGoogleAnalytics(trackingId);
    this.isInitialized = true;
  }

  private loadGoogleAnalytics(trackingId: string) {
    // Create gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('config', this.trackingId, {
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Track custom events
  trackEvent({ action, category, label, value, custom_parameters }: AnalyticsEvent) {
    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });
  }

  // Predefined tracking methods
  trackContactFormSubmission(source: string = 'contact_page') {
    this.trackEvent({
      action: 'contact_form_submit',
      category: 'engagement',
      label: source,
    });
  }

  trackNewsletterSignup(source: string = 'footer') {
    this.trackEvent({
      action: 'newsletter_signup',
      category: 'engagement',
      label: source,
    });
  }

  trackServiceView(serviceName: string) {
    this.trackEvent({
      action: 'service_view',
      category: 'services',
      label: serviceName,
    });
  }

  trackButtonClick(buttonName: string, location: string) {
    this.trackEvent({
      action: 'button_click',
      category: 'interaction',
      label: `${buttonName}_${location}`,
    });
  }

  trackDownload(fileName: string, fileType: string) {
    this.trackEvent({
      action: 'download',
      category: 'content',
      label: fileName,
      custom_parameters: {
        file_type: fileType,
      },
    });
  }

  // Conversion tracking
  trackConversion(conversionType: string, value?: number) {
    this.trackEvent({
      action: 'conversion',
      category: 'conversions',
      label: conversionType,
      value: value,
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number) {
    this.trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value),
    });
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Hook for React components
export const useAnalytics = () => {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    trackContactFormSubmission: analytics.trackContactFormSubmission.bind(analytics),
    trackNewsletterSignup: analytics.trackNewsletterSignup.bind(analytics),
    trackServiceView: analytics.trackServiceView.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
  };
};