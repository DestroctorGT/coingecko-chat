import type { Metadata } from "next";
import { Archivo, Archivo_Narrow, Outfit } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-archivo-narrow",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CryptoChat",
  description:
    "Chat con IA sobre criptomonedas con datos en tiempo real de CoinGecko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${archivo.variable} ${outfit.variable} ${archivoNarrow.variable} antialiased bg-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
