import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "iEnterprise — Retail Platform",
  description: "Apple ecosystem management for retail enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <main className="ml-[260px] min-h-screen">
          <TopBar />
          <div className="p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
