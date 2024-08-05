import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Commonlayout from "@/components/common-layout/Common";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobs Search App",
  description: " Search your dream jobs here",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback="{<Loading />}">
        <Commonlayout
            // attribute="class"
            // defaultTheme="system"
            children={children}
        />
        </Suspense>
        </body>
    </html>
    </ClerkProvider>
  );
}
