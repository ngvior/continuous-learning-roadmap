import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NeuralDrift } from "@/components/neural-drift";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Continuous Learning Roadmap",
  description:
    "A public, self-taught learning roadmap for a backend engineer moving toward AI engineering.",
};

export const viewport: Viewport = {
  themeColor: "#12151a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NeuralDrift />
        {children}
      </body>
    </html>
  );
}
