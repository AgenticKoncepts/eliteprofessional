import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { WishlistProvider } from "@/lib/wishlist";
import { CartProvider } from "@/lib/cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-xs tracking-[0.25em] text-primary-foreground hover:bg-gold hover:text-gold-foreground transition-colors"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Elite Professional — UAE Beauty & Salon Supply" },
      {
        name: "description",
        content:
          "Elite Professional UAE — premium hair care, hair color, salon electronics, tools & accessories since 2001. Free delivery in UAE.",
      },
      { name: "author", content: "Elite Professional" },
      { property: "og:site_name", content: "Elite Professional UAE" },
      { property: "og:title", content: "Elite Professional — UAE Beauty & Salon Supply" },
      {
        property: "og:description",
        content:
          "Premium professional beauty & salon supplies. Hair care, color, electronics, tools and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Elite Professional — UAE Beauty & Salon Supply" },
      { name: "twitter:description", content: "Premium professional beauty & salon supplies in the UAE since 2001." },
      { name: "google-site-verification", content: "vxp32bGcP4kx0bGPg90-CRQ9JOoQFkrLUPRz5HAidmU" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Karla:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap",
      },

    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Elite Professional UAE",
              url: "https://eliteprofessional.lovable.app",
              description:
                "Premium hair care, hair color, salon electronics, tools and accessories distributor in the UAE since 2001.",
              foundingDate: "2001",
              areaServed: "AE",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-50-884-4641",
                email: "info@eliteprofessionaluae.com",
                contactType: "customer service",
              },
            },
            {
              "@type": "WebSite",
              name: "Elite Professional UAE",
              url: "https://eliteprofessional.lovable.app",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <WishlistProvider>
          <CartProvider>
            <Outlet />
          </CartProvider>
        </WishlistProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
