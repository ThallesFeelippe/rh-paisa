import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 60; // Revalidar a cada minuto

export default async function VagasPage() {
  const vagas = await prisma.job.findMany({
    where: { status: 'PUBLICO' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="bg-[#f8faf9] min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden py-16 px-8 lg:px-20">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Agricultural Technology" 
            className="w-full h-full object-cover grayscale-[20%] contrast-110" 
            src="https://images.unsplash.com/photo-1590767187868-b8e9ece0974b?auto=format&fit=crop&q=80&w=2000" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e2f22]/90 via-[#0e2f22]/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tighter uppercase italic font-headline">
            Semeie o seu futuro na <span className="text-[#92f7c3]">USINA PAISA</span>
          </h1>
          <p className="text-xl text-[#ABCFBB] max-w-xl mb-10 font-light font-body">
            Integramos o rigor da engenharia industrial com o ritmo vital da natureza. Venha liderar a revolução sustentável no agronegócio.
          </p>
          <a className="inline-flex items-center gap-3 bg-[#92f7c3] text-[#002113] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all font-headline" href="#vagas">
            Explorar Oportunidades
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Vacancy List */}
      <section className="py-24 px-8 lg:px-20 max-w-7xl mx-auto" id="vagas">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-[#00190f] mb-2 font-headline uppercase italic tracking-tighter">Oportunidades em Aberto</h2>
            <p className="text-[#414844] font-body">Encontre a posição que combina com sua expertise em nosso ecossistema.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-xs font-bold px-4 py-2 bg-[#e6e9e8] rounded-full text-[#414844] font-headline uppercase tracking-widest border border-[#c1c8c2]/30">
              {vagas.length} Vagas Disponíveis
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {vagas.length === 0 ? (
            <div className="bg-white p-20 rounded-xl border border-[#c1c8c2]/50 text-center shadow-sm">
              <Sparkles className="mx-auto text-[#006C48]/30 mb-6" size={48} />
              <h3 className="text-2xl font-bold text-[#00190f] mb-2 font-headline uppercase italic">Banco de Talentos</h3>
              <p className="text-[#414844] mb-8 font-body">Não encontramos vagas abertas no momento, mas adoraríamos conhecer você!</p>
              <Link 
                href="/vagas/inscricao?job=general" 
                className="bg-[#0e2f22] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#006C48] transition-all font-headline"
              >
                CADASTRAR CURRÍCULO GERAL
              </Link>
            </div>
          ) : (
            vagas.map((vaga) => (
              <div key={vaga.id} className="group bg-white p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 hover:shadow-2xl transition-all border-l-8 border-[#006C48] shadow-sm relative overflow-hidden group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#92f7c3]/40 text-[#00734d] text-[10px] font-extrabold uppercase rounded-full font-headline tracking-widest">
                      {vaga.area}
                    </span>
                    <span className="text-[#414844]/60 text-xs flex items-center gap-1 font-body">
                      <Clock size={14} /> Publicada em {new Date(vaga.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#00190f] group-hover:text-[#006C48] transition-colors font-headline uppercase italic tracking-tighter leading-none">
                    {vaga.title}
                  </h3>
                  <p className="text-[#414844] text-sm mt-3 font-body line-clamp-2 max-w-2xl">{vaga.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-8 w-full md:w-auto">
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] font-bold text-[#414844] uppercase tracking-[0.2em] mb-1">Localização</p>
                    <p className="text-sm font-medium flex items-center gap-1 justify-end"><MapPin size={14} className="text-[#006C48]" /> {vaga.location}</p>
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] font-bold text-[#414844] uppercase tracking-[0.2em] mb-1">Modelo</p>
                    <p className="text-sm font-medium uppercase">{vaga.type}</p>
                  </div>
                  <Link 
                    href={`/vagas/inscricao?job=${vaga.id}`}
                    className="w-full md:w-auto px-10 py-5 bg-[#0e2f22] text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#006C48] transition-all font-headline italic"
                  >
                    INSCREVER-SE
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {vagas.length > 0 && (
          <div className="mt-16 bg-[#0e2f22] p-12 rounded-xl text-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2 font-headline uppercase italic">Fique em nosso radar</h3>
              <p className="text-[#ABCFBB] mb-8 font-body max-w-lg mx-auto">Quer trabalhar conosco mas não achou sua vaga ideal? Deixe seu currículo em nosso Banco de Talentos Geral.</p>
              <Link 
                href="/vagas/inscricao?job=general" 
                className="inline-block bg-[#92f7c3] text-[#002113] px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all font-headline italic"
              >
                CADASTRAR NO BANCO GERAL
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#006C48]/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform"></div>
          </div>
        )}
      </section>
    </main>
  );
}
