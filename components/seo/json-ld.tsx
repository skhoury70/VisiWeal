type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

const baseUrl = "https://visiweal.com";

export function OrganizationSchema({ locale = "en" }: { locale?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Visiweal",
    alternateName: locale === "ar" ? "فيزيويل" : "Visiweal",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.avif`,
    description:
      "Premium M&A, Financial Advisory, and Fractional CFO services for enterprise clients across the Middle East and beyond.",
    foundingDate: "2019",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${baseUrl}/contact`,
    },
    sameAs: [
      "https://www.linkedin.com/company/visiweal/",
      "https://x.com/VisiWeal1",
      "https://www.youtube.com/@VisiWeal",
      "https://www.facebook.com/visiweal/",
    ],
  };

  return <JsonLd data={data} />;
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Visiweal",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

export function ServiceSchema({
  name,
  description,
  providerName = "Visiweal",
  areaServed = "MENA",
}: {
  name: string;
  description: string;
  providerName?: string;
  areaServed?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: providerName,
    },
    areaServed: {
      "@type": "Place",
      name: areaServed,
    },
  };

  return <JsonLd data={data} />;
}

export function FAQPageSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function PersonSchema({
  name,
  givenName,
  familyName,
  jobTitle,
  description,
  url,
  sameAs,
}: {
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  description: string;
  url?: string;
  sameAs?: string[];
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    givenName,
    familyName,
    jobTitle,
    description,
    url: url || `${baseUrl}/founder`,
  };

  if (sameAs) {
    data.sameAs = sameAs;
  }

  return <JsonLd data={data} />;
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  areaServed = "MENA",
}: {
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  areaServed?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url: url || baseUrl,
    areaServed,
  };

  if (telephone) {
    data.telephone = telephone;
  }

  return <JsonLd data={data} />;
}
