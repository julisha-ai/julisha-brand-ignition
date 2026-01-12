import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield } from 'lucide-react';

const CONSENT_KEY = 'julisha_consent_acknowledged';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-[#FFD700]/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">
              This platform employs analytics to deliver an optimized executive experience. 
              Continued engagement signifies acceptance of our{' '}
              <Link to="/terms" className="text-[#FFD700] hover:text-[#FFE44D] underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#FFD700] hover:text-[#FFE44D] underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
          <Button
            onClick={handleAcknowledge}
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-black font-medium whitespace-nowrap"
          >
            Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
}
