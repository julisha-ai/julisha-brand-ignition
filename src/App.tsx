
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Analytics from "./components/Analytics";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPublic from "./pages/BlogPublic";
import BlogPost from "./pages/BlogPost";
import BlogEditor from "./pages/BlogEditor";
import Services from "./pages/services";
import ServicePage from "./pages/services/[slug]";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import BlogManagement from "./pages/admin/BlogManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import NewsletterManagement from "./pages/admin/NewsletterManagement";
import NotFound from "./pages/NotFound";
import ServiceRecommendations from "./pages/ServiceRecommendations";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Analytics />
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogPublic />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/service-recommendations" element={<ServiceRecommendations />} />
              
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/blog" element={<BlogManagement />} />
              <Route path="/admin/blog/new" element={<BlogEditor />} />
              <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
              <Route path="/admin/contacts" element={<ContactManagement />} />
              <Route path="/admin/newsletter" element={<NewsletterManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
