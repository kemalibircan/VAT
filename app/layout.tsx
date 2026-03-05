import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast-provider";
import { LayoutShell } from "@/components/layout-shell";

export const metadata: Metadata = {
  title: {
    default: "calculatemyvat – Friendly VAT & GST Reverse Calculator",
    template: "%s | calculatemyvat"
  },
  description:
    "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat.",
  metadataBase: new URL("https://calculatemyvat.com"),
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <ToastProvider>
            <LayoutShell>{children}</LayoutShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


