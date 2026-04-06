'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-emerald-950/90 backdrop-blur-md shadow-2xl shadow-emerald-950/20 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white font-headline">
          USINA PAISA
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/">Início</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/sobre">Sobre nós</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/vagas">Vagas</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/acoes-sociais">Ações sociais</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/meio-ambiente">Meio ambiente</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/jovem-aprendiz">Jovem Aprendiz</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/psicologia">Psicologia</Link>
          <Link className="font-headline tracking-tight text-sm uppercase hover:text-emerald-400 transition-colors text-white" href="/noticias">Notícias</Link>
        </div>
        <Link 
          href="/login" 
          className="bg-primary-container text-on-primary-container px-6 py-2 text-sm font-headline uppercase tracking-widest hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 text-center"
        >
          Entrar
        </Link>
      </nav>
    </header>
  );
}
