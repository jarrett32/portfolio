import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import { Sidebar } from "./Sidebar";

export const metadata: Metadata = {
  title: "Portfolio - Jathompson.dev",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="MtAyVRQTEK_fUKxCzonYRLNclF8eKY7W4BDyb7rK35Y"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen text-gray-800 antialiased dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AnimatedBackground /> */}
          <div className="relative z-10 mx-4 mb-40 mt-8 flex max-w-5xl flex-col md:mt-20 md:flex-row lg:mx-auto lg:mt-32">
            <Sidebar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
