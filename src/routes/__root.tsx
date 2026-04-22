import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

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

export const Route = createRootRoute({
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
      { property: "og:title", content: "Elite Professional — UAE Beauty & Salon Supply" },
      {
        property: "og:description",
        content:
          "Premium professional beauty & salon supplies. Hair care, color, electronics, tools and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Elite Professional — UAE Beauty & Salon Supply" },
      { name: "description", content: "An e-commerce website clone for Elite Professional, a UAE beauty supply store." },
      { property: "og:description", content: "An e-commerce website clone for Elite Professional, a UAE beauty supply store." },
      { name: "twitter:description", content: "An e-commerce website clone for Elite Professional, a UAE beauty supply store." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b115c691-67a7-4d31-a712-f529b12b771e/id-preview-590bc808--6e7b2188-7e4b-475d-83ef-1d441fffd9be.lovable.app-1776604513713.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b115c691-67a7-4d31-a712-f529b12b771e/id-preview-590bc808--6e7b2188-7e4b-475d-83ef-1d441fffd9be.lovable.app-1776604513713.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap",
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
  return (
    <I18nProvider>
      <WishlistProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </WishlistProvider>
    </I18nProvider>
  );
}
