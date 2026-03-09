import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast-provider";
import { LayoutShell } from "@/components/layout-shell";
import { JsonLd } from "@/components/jsonld";
import { getOrganizationSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    default: "calculatemyvat – Friendly VAT & GST Reverse Calculator",
    template: "%s | calculatemyvat"
  },
  description:
    "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat.",
  metadataBase: new URL(SITE_URL),
  applicationName: "calculatemyvat",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-48.png"]
  },
  openGraph: {
    type: "website",
    siteName: "calculatemyvat",
    url: SITE_URL,
    title: "calculatemyvat – Friendly VAT & GST Reverse Calculator",
    description:
      "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat.",
    images: [
      {
        url: "/brand-mark.png",
        width: 512,
        height: 512,
        alt: "calculatemyvat logo"
      }
    ]
  },
  twitter: {
    card: "summary",
    title: "calculatemyvat – Friendly VAT & GST Reverse Calculator",
    description:
      "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat.",
    images: ["/brand-mark.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <JsonLd data={getOrganizationSchema()} />
        <ThemeProvider>
          <ToastProvider>
            <LayoutShell>{children}</LayoutShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

