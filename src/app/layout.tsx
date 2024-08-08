import type { Metadata } from "next";
import { JetBrains_Mono as FontSans } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/session-provider";
import ThemeProvider from "@/providers/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Teste Marcelo Senna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={fontSans.className + ' overflow-hidden'}>

        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>

    </html>
  );
}
