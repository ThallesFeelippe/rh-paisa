'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre nós', href: '/sobre' },
    { name: 'Vagas', href: '/vagas' },
    { name: 'Ações sociais', href: '/acoes-sociais' },
    { name: 'Meio ambiente', href: '/meio-ambiente' },
    { name: 'Jovem Aprendiz', href: '/jovem-aprendiz' },
    { name: 'Psicologia', href: '/psicologia' },
    { name: 'Notícias', href: '/noticias' },
  ];

  const checkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-emerald-950/90 backdrop-blur-md shadow-2xl shadow-emerald-950/20 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white font-headline">
          USINA PAISA
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline tracking-tight text-sm uppercase transition-all duration-300 ${
                  isActive 
                    ? 'text-emerald-400 font-semibold' 
                    : 'text-white/80 hover:text-emerald-400'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <Link 
          href="/login" 
          className={`px-6 py-2 text-sm font-headline uppercase tracking-widest transition-all duration-300 border text-center rounded-sm ${
            pathname === '/login'
              ? 'bg-emerald-400 text-emerald-950 border-emerald-400 font-bold'
              : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 hover:border-emerald-500 shadow-lg shadow-emerald-900/20 active:scale-95'
          }`}
        >
          Entrar
        </Link>
      </nav>
    </header>
  );
}

