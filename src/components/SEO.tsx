import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
}

const SEO = ({
  title = "Julisha Solutions - AI Innovation & Brand Management",
  description = "Unifying AI innovation with strategic brand management for seamless digital presence. Transform your business with our Smart Agents, Conversational AI, and comprehensive digital solutions.",
  keywords = "AI solutions, Smart Agents, Conversational AI, Brand Management, Web Development, AI Consulting, Digital Marketing, Business Automation",
  image = "/lovable-uploads/8879aed8-bd16-443b-9953-a535627f1ff3.png",
  url = "https://julisha.com",
  type = "website",
  structuredData
}: SEOProps) => {
  const fullTitle = title.includes("Julisha") ? title : `${title} | Julisha Solutions`;
  const fullUrl = url.startsWith("http") ? url : `https://julisha.com${url}`;
  const fullImage = image.startsWith("http") ? image : `https://julisha.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Julisha Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Julisha Solutions" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:site" content="@JulishaSol" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FFD700" />
      <meta name="msapplication-TileColor" content="#FFD700" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;