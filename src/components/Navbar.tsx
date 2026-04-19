'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="fixed top-0 w-full z-50 bg-emerald-950/95 backdrop-blur-md shadow-2xl shadow-emerald-950/20 transition-all duration-300 border-b border-white/5">
      <nav className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-white font-headline flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
            <span className="text-black text-xs font-black">P</span>
          </span>
          USINA PAISA
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline tracking-tight text-xs uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive 
                    ? 'text-emerald-400 font-semibold' 
                    : 'text-white/70 hover:text-emerald-400'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className={`hidden lg:block px-6 py-2 text-xs font-headline uppercase tracking-widest transition-all duration-300 border text-center rounded-sm ${
              pathname === '/login'
                ? 'bg-emerald-400 text-emerald-950 border-emerald-400 font-bold'
                : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 hover:border-emerald-500 shadow-lg shadow-emerald-900/20'
            }`}
          >
            Entrar
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] bg-emerald-950 z-40 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-8 gap-6 overflow-y-auto h-full">
          {navLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-headline text-2xl font-bold uppercase italic tracking-tighter transition-all ${
                  isActive ? 'text-emerald-400' : 'text-white/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className="border-white/10 my-4" />
          <Link 
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="bg-emerald-500 text-black font-headline font-bold py-4 rounded-sm text-center uppercase tracking-widest"
          >
            Entrar no Portal
          </Link>
        </div>
      </div>
    </header>
  );
}

