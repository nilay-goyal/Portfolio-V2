import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Pokémon GBA Portfolio",
  description: "A retro-styled portfolio with Pokémon GBA aesthetic",
};

import { WizardProvider } from "../context/WizardContext";
import WizardHandCursor from "../components/WizardHandCursor";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} antialiased font-pixel`}>
        <WizardProvider>
          <WizardHandCursor />
          {children}
        </WizardProvider>
      </body>
    </html>
  );
}
