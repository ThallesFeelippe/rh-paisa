'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Factory, History, Award, ArrowRight, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="Vast green sugarcane plantation stretching to the horizon under a golden sunrise"
            src="/img/fazenda.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-8 md:px-24 max-w-4xl">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter mb-8">
            Cultivando o Futuro: A Excelência do <span className="text-tertiary-fixed italic">Agronegócio</span> em Cada Safra
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-body mb-10 max-w-2xl leading-relaxed">
            Unimos a tradição da terra à inovação tecnológica para liderar a produção sustentável no campo, gerando valor que brota da raiz.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/vagas"
              className="tonal-shift text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center gap-2"
            >
              Conhecer Produção
              <span className="material-symbols-outlined">agriculture</span>
            </Link>
            <Link 
              href="/sobre"
              className="glass-card text-white border border-white/20 px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
            >
              Nossa Origem
            </Link>
          </div>
        </div>
      </section>

      {/* Nossos Números Section */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto overflow-hidden relative">
        <div className="absolute right-8 top-16 select-none pointer-events-none">
          <span className="text-[12rem] font-headline font-bold text-on-surface/[0.03] leading-none">2024</span>
        </div>
        <div className="relative z-10 mb-16">
          <h2 className="font-headline text-5xl font-bold text-primary mb-4">Nossos Números</h2>
          <p className="font-body text-on-surface-variant text-lg max-w-2xl">
            Resultados que impactam a economia nacional e preservam o futuro das próximas gerações.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          <div className="md:col-span-6 lg:col-span-5 bg-surface-container-low p-10 flex flex-col justify-between min-h-[280px]">
            <span className="material-symbols-outlined text-4xl text-primary mb-8">factory</span>
            <div>
              <h3 className="font-headline text-6xl font-bold text-primary mb-2">2.5M</h3>
              <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">Toneladas de Cana Processadas/Ano</p>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-4 bg-primary-container p-10 flex flex-col justify-between min-h-[280px]">
            <span className="material-symbols-outlined text-4xl text-secondary">terrain</span>
            <div>
              <h3 className="font-headline text-5xl font-bold text-white mb-2">45k</h3>
              <p className="font-headline text-on-primary-container uppercase tracking-widest text-sm">Hectares de Cultivo Sustentável</p>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-3 bg-surface-container-highest p-10 flex flex-col justify-between min-h-[280px]">
            <span className="material-symbols-outlined text-4xl text-primary mb-8">groups</span>
            <div>
              <h3 className="font-headline text-5xl font-bold text-primary mb-2">1,200+</h3>
              <p className="font-headline text-on-surface-variant uppercase tracking-widest text-sm">Empregos Diretos Gerados</p>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-4 bg-surface-container-low p-10 flex flex-col justify-between min-h-[280px] border border-outline/10 hover:border-primary/20 transition-all group">
            <span className="material-symbols-outlined text-4xl text-primary mb-8 group-hover:scale-110 transition-transform">bolt</span>
            <div>
              <h3 className="font-headline text-5xl font-bold text-primary mb-2">380 GWh</h3>
              <p className="font-headline text-primary/60 uppercase tracking-widest text-xs font-bold">Energia Limpa Produzida/Ano</p>
            </div>
          </div>
          <div className="md:col-span-12 lg:col-span-8 relative overflow-hidden bg-surface-container-low min-h-[280px] group">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-105 transition-transform duration-700"
              alt="Industrial facility silhouette"
              src="/img/CORTEDECANA QUEIMADA.png"
            />
            <div className="relative z-10 p-10 h-full flex flex-col justify-center max-w-2xl">
              <h3 className="font-headline text-3xl font-bold text-primary mb-4">Tecnologia de Ponta</h3>
              <p className="font-body text-on-surface-variant text-lg">Automação industrial 4.0 e monitoramento via satélite garantem a máxima eficiência em cada gota de combustível produzida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED: O Ciclo da Precisão Section */}
      <section className="relative bg-[#02130d] py-32 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="px-8 max-w-screen-2xl mx-auto mb-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block animate-fade">Exclusivo: Engenharia Verde</span>
              <h2 className="font-headline text-5xl md:text-6xl font-black text-white italic transition-all">O Ciclo da <span className="text-emerald-500">Precisão</span></h2>
              <div className="h-1.5 w-32 bg-emerald-500 rounded-full"></div>
              <p className="font-body text-emerald-100/60 text-xl leading-relaxed max-w-xl pt-4">
                Integramos cada etapa da produção com tecnologia de ponta para garantir que nada seja desperdiçado.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 max-w-screen-2xl mx-auto relative z-10">
          {[
            { id: '01', icon: Leaf, title: 'Plantio', desc: 'Seleção genética e monitoramento via satélite para solo otimizado e crescimento sustentável.' },
            { id: '02', icon: Factory, title: 'Colheita', desc: 'Operação 100% mecanizada e georreferenciada para máxima preservação da soqueira.' },
            { id: '03', icon: History, title: 'Processamento', desc: 'Extração de alta performance com controle automatizado de pureza e temperatura.' },
            { id: '04', icon: Award, title: 'Bioenergia', desc: 'O bagaço da cana alimenta nossas turbinas, gerando energia limpa para milhares de lares.' },
          ].map((step, idx) => (
            <div
              key={step.id}
              className="group relative p-10 bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/30"
            >
              {/* Background Number */}
              <span className="absolute -top-6 -left-4 text-9xl font-black text-white/[0.02] group-hover:text-emerald-500/[0.05] transition-colors duration-500 select-none">
                {step.id}
              </span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mb-8 group-hover:bg-emerald-500 transition-colors duration-500">
                  <step.icon size={32} className="text-emerald-500 group-hover:text-black transition-colors duration-500" />
                </div>

                <h4 className="font-headline text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h4>
                <p className="text-emerald-500/60 text-sm leading-relaxed group-hover:text-emerald-100 transition-colors">
                  {step.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-emerald-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver Detalhes <ArrowRight size={14} />
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Soluções de Alto Impacto Section */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-headline text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4">Portfólio de Produtos</p>
          <h2 className="font-headline text-5xl font-bold text-white uppercase italic">Soluções de <span className="text-emerald-500">Alto Impacto</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[700px]">
          <div className="md:col-span-8 group relative overflow-hidden rounded-3xl">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Açúcar VHP de alta pureza"
              src="/img/cana.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-end">
              <h4 className="font-headline text-4xl font-bold text-white mb-2 italic">Açúcar VHP</h4>
              <p className="text-white/70 max-w-md mb-6">Exportamos Açúcar VHP e Branco com padrões internacionais de pureza para as maiores indústrias globais.</p>
              <Link 
                href="/vagas"
                className="text-emerald-500 font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer"
              >
                SAIBA MAIS <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="flex-1 group relative overflow-hidden rounded-3xl">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Etanol combustível"
                src="/img/etanol.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h4 className="font-headline text-2xl font-bold text-white mb-1">Etanol</h4>
                <p className="text-white/70 text-sm">Bio combustível de alta octanagem.</p>
              </div>
            </div>
            <div className="flex-1 group relative overflow-hidden rounded-3xl">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Energia renovável"
                src="/img/solar.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h4 className="font-headline text-2xl font-bold text-white mb-1">Bioeletricidade</h4>
                <p className="text-white/70 text-sm">Energia 100% renovável via biomassa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustentabilidade e Meio Ambiente (DARK GREEN VERSION) */}
      <section className="bg-[#0e2f22] text-white py-32 overflow-hidden relative">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden rounded-xl">
              <img
                alt="Sustainable farming field"
                className="w-full aspect-[4/5] object-cover"
                src="/img/meioambiente.png" />
              <div className="absolute bottom-12 -right-4 bg-emerald-500 text-black p-10 max-w-[280px] shadow-2xl">
                <h3 className="font-headline text-4xl font-bold mb-2">100%</h3>
                <p className="font-headline text-xs font-bold uppercase tracking-widest leading-tight">Resíduo Zero no Processamento</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <span className="inline-block px-4 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-headline font-bold tracking-[0.2em] uppercase mb-8">Compromisso ESG</span>
              <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8 leading-tight italic uppercase">Sustentabilidade e <span className="text-emerald-400">Meio Ambiente</span></h2>
              <p className="font-body text-emerald-100/60 text-lg leading-relaxed max-w-xl">
                Nossa operação é um ciclo fechado de vida. Da fertirrigação com vinhaça à cogeração de energia com bagaço, cada subproduto é reinserido no ecossistema de valor, eliminando desperdícios e regenerando a terra.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="font-headline text-xl font-bold mb-2">Fertilizantes Orgânicos</h4>
                  <p className="text-emerald-100/40 text-sm">Utilização de subprodutos orgânicos para nutrir o solo sem a dependência exclusiva de químicos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustentabilidade Journey (LIGHT VERSION) */}
      <section className="bg-white text-on-surface py-32 overflow-hidden relative">
        <div className="max-w-screen-xl mx-auto px-8 flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-visible">
              <img
                alt="Reflorestamento e cuidado com o solo"
                className="w-full aspect-square object-cover rounded-none shadow-xl"
                src="/img/reflorestamento.png" />
              <div className="absolute -bottom-6 -right-6 bg-white border border-emerald-500/20 p-8 shadow-2xl flex flex-col gap-1 min-w-[180px]">
                <h3 className="font-headline text-3xl font-black text-emerald-600 leading-none">98%</h3>
                <p className="font-headline text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight italic">De Reuso de Água no Ciclo Industrial</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-emerald-600 font-headline font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Sustainability First</span>
              <h2 className="font-headline text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-8">Compromisso com o <br />Futuro: <span className="text-emerald-700">Jornada ESG</span></h2>
              <p className="font-body text-slate-600 text-lg leading-relaxed mb-10">
                Na USINA PAISA, a sustentabilidade não é um departamento, é a nossa essência. Desenvolvemos ecossistemas de regeneração que vão além da conformidade legal, impactando positivamente a biodiversidade local e fortalecendo as comunidades vizinhas através de educação e inovação tecnológica.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">check</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-slate-800">Certificação Internacional</h4>
                  <p className="text-slate-500 text-sm italic">Mantemos os mais altos padrões de exportação e segurança industrial.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">check</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-slate-800">Impacto Comunitário</h4>
                  <p className="text-slate-500 text-sm italic">Programas de capacitação técnica para mais de 500 jovens anualmente.</p>
                </div>
              </div>
            </div>

            <button className="bg-[#0e2f22] text-white px-10 py-5 font-headline font-bold uppercase tracking-widest text-xs hover:bg-emerald-900 transition-all mt-4">
              Ver Relatório ESG
            </button>
          </div>
        </div>
      </section>

      {/* Ações Sociais Section (MATCHING SCREENSHOT) */}
      <section className="py-32 px-8 bg-slate-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-emerald-600 font-headline font-bold text-[10px] uppercase tracking-widest block">Responsabilidade Humana</span>
            <h2 className="font-headline text-5xl font-black text-slate-900">Transformando Vidas e Comunidades</h2>
            <p className="text-slate-500 max-w-3xl leading-relaxed">
              Nosso compromisso social transpende os portões da usina. Investimos no desenvolvimento humano e no fortalecimento das raízes locais, criando um ecossistema de oportunidades onde a inovação caminha lado a lado com o bem-estar social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 bg-white">
            {[
              { title: 'Educação do Futuro', desc: 'Suporte contínuo a escolas locais e centros de treinamento técnico para os desafios da indústria 4.0 no agronegócio sustentável.', icon: 'school', link: 'Ver Projetos' },
              { title: 'Saúde e Bem-Estar', desc: 'Clínicas móveis e programas de saúde preventiva para nossos colaboradores e suas famílias, garantindo qualidade de vida no campo e na cidade.', icon: 'health_and_safety', link: 'Impacto Gerado' },
              { title: 'Cultura na Usina', desc: 'Fomento às artes locais, eventos culturais e incentivo ao esporte. Preservamos a identidade regional e incentivamos o potencial criativo de nossa gente.', icon: 'diversity_2', link: 'Agenda Cultural' },
            ].map((item, idx) => (
              <div key={idx} className={`p-12 space-y-8 group hover:bg-slate-50 transition-all border-r border-slate-200 last:border-r-0`}>
                <div className="w-12 h-12 bg-[#0e2f22] flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-white text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed min-h-[80px] italic">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-headline font-bold text-[10px] uppercase tracking-widest cursor-pointer group-hover:gap-4 transition-all">
                  {item.link} <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
