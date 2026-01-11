
import Header from "./Header";
import Footer from "./Footer";
import { ChatWidget } from "./ChatWidget";
import CookieConsent from "./CookieConsent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
}
