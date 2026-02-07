import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { AuthGuard } from "@/components/AuthGuard";
import { getClientCount } from "@/actions/dashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse",
  description: "Project & Task Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientCount = await getClientCount();
  const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const innerContent = (
    <ThemeProvider>
      <LayoutWrapper clientCount={clientCount} clerkEnabled={clerkEnabled}>
        {children}
      </LayoutWrapper>
    </ThemeProvider>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {clerkEnabled ? (
          <ClerkProvider>
            <AuthGuard>
              {innerContent}
            </AuthGuard>
          </ClerkProvider>
        ) : (
          innerContent
        )}
      </body>
    </html>
  );
}
