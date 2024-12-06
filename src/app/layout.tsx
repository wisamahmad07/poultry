import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import LoginForm from "./login-poultry-pro-ai/page";
import { AreaProfitStoreProvider } from "@/providers/counter-store-providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Poultry Pro AI",
  description: "Complete poultry app with machine learning",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log(session?.userId);
  return (
    <html lang="en" suppressHydrationWarning>
      {session?.userId ? (
        <body
          className={`${geistSans.variable} ${geistMono.variable}  flex items-start justify-between`}
        >
          <AreaProfitStoreProvider>
            <ThemeProvider>
              <Sidebar />
              <main className="w-full h-full">
                <Navbar />
                {children}
              </main>
            </ThemeProvider>
          </AreaProfitStoreProvider>
        </body>
      ) : (
        <body>
          <LoginForm />
        </body>
      )}
    </html>
  );
}
