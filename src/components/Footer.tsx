import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100/60 font-body text-xs mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 w-full border-t border-emerald-900/30 max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-white font-headline">USINA PAISA</div>
          <p className="max-w-xs leading-relaxed">
            The Precision Ecosystem. Liderando a excelência no agronegócio através de tecnologia e sustentabilidade.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <a className="text-emerald-100/50 hover:text-white transition-colors" href="#">Trabalhe Conosco</a>
          <a className="text-emerald-100/50 hover:text-white transition-colors" href="#">Políticas de Privacidade</a>
          <a className="text-emerald-100/50 hover:text-white transition-colors" href="#">Certificados ESG</a>
          <a className="text-emerald-100/50 hover:text-white transition-colors" href="#">Relatório Sustentabilidade</a>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 border border-emerald-800 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer rounded-lg">
            <span className="material-symbols-outlined">language</span>
          </div>
          <div className="w-10 h-10 border border-emerald-800 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer rounded-lg">
            <span className="material-symbols-outlined">monitoring</span>
          </div>
        </div>
      </div>
      <div className="w-full text-center py-8 border-t border-white/5 uppercase tracking-[0.2em] text-[9px] font-bold opacity-50">
        © 2024 USINA PAISA - The Precision Ecosystem. All rights reserved.
      </div>
    </footer>
  );
}
