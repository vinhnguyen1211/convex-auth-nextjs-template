import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { api } from '../../convex/_generated/api';
import { fetchQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchQuery(
    api.users.viewer,
    {},
    { token: await convexAuthNextjsToken() },
  );
  console.log(' user:', user)

  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`}>
        <body className="font-sans antialiased">
            <ConvexClientProvider>
              <AuthProvider user={user}>
                {children}
              </AuthProvider>
            </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}