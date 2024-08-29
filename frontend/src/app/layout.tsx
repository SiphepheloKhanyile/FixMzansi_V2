import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/SideNav";

import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FixMzansi",
  description: "An issue tracker platform for South Africa",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers session={session}>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <div
              style={{ flex: "5%" }}
              className="bg-slate-100 border border-slate-200 shadow-inner
                      shadow-slate-300 rounded-tr-lg rounded-br-lg h-screen"
            >
              <SideNav />
            </div>

            <div style={{ flex: "95%" }} className="h-screen m-0 p-0">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
