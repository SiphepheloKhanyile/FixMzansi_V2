import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/SideNav";

import { cn } from "@/lib/utils";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div style={{ display: "flex", minHeight: "100vh" }}>

          <div 
            style={{ flex: "3%", height: "100vh"}} 
            className="bg-slate-100 border border-slate-200 shadow-inner  shadow-slate-300 rounded-tr-[10px] rounded-br-[10px]"
          >
            <SideNav />
          </div>

          <div style={{ flex: "97%" }} className="bg-orange-20">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
