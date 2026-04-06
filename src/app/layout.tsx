import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Usina PAISA | Excelência no Agronegócio",
  description: "Cultivando o Futuro: A Excelência do Agronegócio em Cada Safra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-background font-body text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
