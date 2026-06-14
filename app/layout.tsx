import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ghost AI",
  description: "ghost AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "var(--accent-primary)",
              colorBackground: "var(--bg-base)",
              colorInput: "var(--bg-elevated)",
              colorForeground: "var(--text-primary)",
              colorMutedForeground: "var(--text-secondary)",
              colorNeutral: "var(--text-primary)",
              colorBorder: "var(--border-default)",
            },
          }}
          signInFallbackRedirectUrl="/editor"
          signUpFallbackRedirectUrl="/editor"
          afterSignOutUrl="/sign-in"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
