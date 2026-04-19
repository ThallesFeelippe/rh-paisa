import React from 'react';
import { Newspaper, ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function NoticiasPage() {
  const news = [
    {
      id: 1,
      title: 'Usina Paisa atinge recorde de moagem na safra 2024',
      excerpt: 'Com investimentos em tecnologia e novos processos, superamos a meta anual de processamento de cana-de-açúcar.',
      date: '15 Abr, 2024',
      author: 'Comunicação Paisa',
      category: 'Produção',
      image: 'https://images.unsplash.com/photo-1594142461710-859a1f287042?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Novo programa de sustentabilidade regenerativa é lançado',
      excerpt: 'Iniciativa visa restaurar ecossistemas locais e promover o uso consciente da água em todo o ciclo industrial.',
      date: '10 Abr, 2024',
      author: 'ESG Team',
      category: 'Sustentabilidade',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Capacitação técnica para jovens da região abre inscrições',
      excerpt: 'O programa Jovem Aprendiz 2024 focará em automação industrial e manutenção de sistemas 4.0.',
      date: '05 Abr, 2024',
      author: 'RH Paisa',
      category: 'Social',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <main className="bg-[#f8faf9] min-h-screen pt-32 pb-24 px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="text-emerald-600" size={32} />
            <span className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-emerald-600">Sala de Imprensa</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-slate-900 italic uppercase tracking-tighter leading-none mb-6">
            Notícias & <span className="text-emerald-600">Atualizações</span>
          </h1>
          <p className="font-body text-slate-500 text-xl max-w-2xl leading-relaxed">
            Fique por dentro das últimas conquistas, inovações e compromissos da Usina Paisa com o futuro.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {news.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {item.author}</span>
                </div>
                <h2 className="font-headline text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight italic uppercase">
                  {item.title}
                </h2>
                <p className="font-body text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-emerald-600 font-headline font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Ler Notícia Completa <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 p-12 bg-emerald-950 rounded-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="font-headline text-3xl font-bold text-white mb-2 uppercase italic">Assine nossa Newsletter</h3>
              <p className="text-emerald-100/60 font-body">Receba as principais atualizações da Usina Paisa diretamente em seu e-mail.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-white/5 border border-white/10 px-6 py-4 rounded-sm text-white outline-none focus:border-emerald-500 transition-all w-full md:w-80"
              />
              <button className="bg-emerald-500 text-black font-headline font-bold px-8 py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all">
                Assinar
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </div>
    </main>
  );
}
