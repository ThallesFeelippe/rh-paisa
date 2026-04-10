import React from 'react';
import { ArrowRight, Timer, PlayCircle, Video, ImageIcon, Calendar, Globe, Share2 } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mural de Notícias | Usina Paisa',
  description: 'Fique por dentro das últimas novidades sobre produção, sustentabilidade e inovação na Usina Paisa.',
};

export default async function NoticiasPage() {
  const allNews = await prisma.news.findMany({
    where: { status: 'PUBLICO' },
    orderBy: { publishedAt: 'desc' }
  });

  const featured = allNews[0];
  const sideNews = allNews.slice(1, 3);
  const remainingNews = allNews.slice(3);

  // Helper to determine link
  const getLink = (news: any) => `/noticias/${news.slug || news.id}`;

  return (
    <div className="bg-white text-emerald-950 selection:bg-emerald-100 selection:text-emerald-900 font-body animate-fade overflow-x-hidden">
      <main className="pt-32 md:pt-40">
        
        {/* Hero / Featured Section - Improved Alignment & Sizing */}
        <section className="px-4 md:px-12 mb-20">
          <div className="relative w-full min-h-[600px] md:h-[80vh] rounded-[48px] overflow-hidden group shadow-2xl border border-slate-100 flex items-end">
            {featured ? (
              <>
                <div className="absolute inset-0 z-0">
                  <img 
                    alt={featured.title} 
                    className="w-full h-full object-cover transition-all duration-[3000ms] group-hover:scale-110" 
                    src={featured.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                
                {/* Visual Indicators */}
                <div className="absolute top-12 right-12 flex gap-4 z-20">
                    {featured.videoUrl && <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl"><Video size={20} /></div>}
                    {featured.gallery && <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl"><ImageIcon size={20} /></div>}
                </div>

                <div className="relative z-10 w-full p-8 md:p-20">
                  <div className="bg-emerald-950/60 backdrop-blur-2xl p-10 md:p-16 rounded-[48px] max-w-6xl border border-white/10 shadow-2xl animate-fade-up">
                    <div className="flex flex-wrap items-center gap-6 mb-10">
                      <span className="px-5 py-2 bg-emerald-600 text-white text-[10px] font-black tracking-[0.3em] uppercase rounded-lg shadow-2xl shadow-emerald-500/20">MANCHETE</span>
                      <span className="text-emerald-100/70 text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                        <Timer size={16} className="text-emerald-400" /> {featured.category} • {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-12 tracking-tighter text-glow uppercase italic font-headline drop-shadow-2xl max-w-5xl">
                      {featured.title}
                    </h1>
                    
                    <p className="text-emerald-50/90 text-xl md:text-3xl mb-14 font-medium max-w-4xl leading-relaxed italic border-l-4 border-emerald-500 pl-10">
                      {featured.excerpt || featured.content.substring(0, 150) + '...'}
                    </p>
                    
                    <Link href={getLink(featured)} className="bg-white text-emerald-950 px-16 py-6 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-700 inline-flex items-center gap-6 font-black uppercase text-xs tracking-[0.2em] group shadow-2xl active:scale-95">
                      LER REPORTAGEM COMPLETA
                      <ArrowRight className="group-hover:translate-x-4 transition-transform" size={20} />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-950 text-emerald-200">
                <p className="text-2xl font-bold uppercase tracking-widest animate-pulse">Aguardando novos conteúdos...</p>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Grid - Only shows if there are more news */}
        {allNews.length > 1 && (
          <section className="px-6 md:px-12 mb-32 group-animate">
            <h2 className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
              <span className="w-12 h-px bg-emerald-600/20"></span> ÚLTIMAS MATÉRIAS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
              {/* Secondary Featured Card */}
              <div className="md:col-span-12 lg:col-span-8 group">
                {sideNews[0] ? (
                  <Link href={getLink(sideNews[0])} className="block">
                    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden mb-10 shadow-xl border border-slate-50">
                      <img 
                        alt={sideNews[0].title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        src={sideNews[0].image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'}
                      />
                      <div className="absolute top-8 left-8">
                        <span className="bg-emerald-600 text-white text-[9px] font-black px-5 py-2 rounded-xl uppercase tracking-widest shadow-2xl">{sideNews[0].category}</span>
                      </div>
                      {sideNews[0].videoUrl && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-950/20 backdrop-blur-[2px]">
                              <PlayCircle size={64} className="text-white" strokeWidth={1.5} />
                          </div>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                      <span className="text-emerald-600">{new Date(sideNews[0].publishedAt || sideNews[0].createdAt).toLocaleDateString('pt-BR')}</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                      <span className="flex items-center gap-2 italic">{sideNews[0].authorName || 'Redação Paisa'}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black mb-6 leading-[0.9] tracking-tighter group-hover:text-emerald-600 transition-colors duration-500 uppercase italic font-headline">
                      {sideNews[0].title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mb-10 font-medium line-clamp-2">
                      {sideNews[0].excerpt || sideNews[0].content.substring(0, 150) + '...'}
                    </p>
                  </Link>
                ) : (
                  <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-[40px] text-slate-300 font-bold uppercase tracking-widest italic">
                    Expansão em andamento...
                  </div>
                )}
              </div>

              {/* Sidebar List */}
              <div className="md:col-span-12 lg:col-span-4 space-y-16">
                {allNews.slice(2, 5).map((news) => (
                  <Link key={news.id} href={getLink(news)} className="block group border-l border-slate-100 pl-8 hover:border-emerald-500 transition-all duration-500">
                    <div className="relative aspect-[16/10] rounded-24 overflow-hidden mb-6 shadow-lg">
                      <img alt={news.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={news.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'} />
                      <div className="absolute top-4 right-4">
                        {news.videoUrl && <div className="bg-white/90 p-1.5 rounded-lg text-emerald-950 shadow-sm"><Video size={12} /></div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-4">
                      <span>{news.category}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-slate-400">{new Date(news.publishedAt || news.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <h4 className="text-2xl font-black leading-tight group-hover:text-emerald-600 transition-colors duration-500 tracking-tighter uppercase italic font-headline">{news.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Full Grid Section */}
        {remainingNews.length > 0 && (
            <section className="px-6 md:px-12 mb-40 pt-20 border-t border-slate-50">
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter flex items-center gap-8 italic uppercase text-emerald-950 font-headline">
                Mural Global <span className="h-px flex-grow bg-slate-100"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
                {remainingNews.map((news) => (
                <Link key={news.id} href={getLink(news)} className="group">
                    <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-8 shadow-xl border border-slate-50">
                    <img alt={news.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={news.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09'} />
                    <div className="absolute bottom-6 left-6 flex">
                        <span className="bg-emerald-950 text-white text-[8px] font-black px-4 py-1.5 rounded-lg tracking-widest uppercase shadow-2xl">{news.category}</span>
                    </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 mb-5 uppercase tracking-widest">
                    <span className="text-emerald-600">{new Date(news.publishedAt || news.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="italic">{news.authorName || 'Redação'}</span>
                    </div>
                    <h3 className="text-3xl font-black mb-4 leading-tight group-hover:text-emerald-600 transition-colors duration-500 uppercase italic font-headline tracking-tighter">{news.title}</h3>
                    <p className="text-slate-500 line-clamp-2 mb-8 text-base font-medium leading-relaxed">{news.excerpt || news.content.substring(0, 100) + '...'}</p>
                    <div className="flex items-center gap-3 text-emerald-950 font-black text-[10px] uppercase tracking-widest group-hover:gap-6 transition-all duration-500">
                    LER AGORA <ArrowRight size={14} className="text-emerald-500" />
                    </div>
                </Link>
                ))}
            </div>
            </section>
        )}

        {/* Empty State Fallback if no news at all */}
        {allNews.length === 0 && (
             <section className="px-6 md:px-12 py-32 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-200 mb-8"><ImageIcon size={48} /></div>
                <h2 className="text-3xl font-black text-emerald-950 uppercase italic tracking-tight font-headline">O Mural está sendo preparado</h2>
                <p className="text-slate-400 mt-4 max-w-md mx-auto">Em breve, grandes atualizações sobre a safra e tecnologia em Alagoas.</p>
             </section>
        )}

        {/* Final Branding Section */}
        <section className="px-4 md:px-12 mb-32">
          <div className="bg-emerald-950 rounded-[48px] md:rounded-[64px] overflow-hidden flex flex-col lg:flex-row relative shadow-2xl border border-white/5 h-auto lg:h-[600px]">
            <div className="lg:w-3/5 p-12 md:p-24 relative z-10 flex flex-col justify-center">
              <span className="text-emerald-400 font-black text-[10px] tracking-[0.5em] uppercase mb-10 block">Usina Paisa • Unidade Alagoas</span>
              <h2 className="text-white text-5xl md:text-[90px] font-black mb-10 leading-[0.85] tracking-tighter italic uppercase font-headline">Energia do <br />Próprio Solo.</h2>
              <div className="flex items-center gap-8">
                <div className="h-1 w-20 bg-emerald-500"></div>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-400 transition-all cursor-pointer"><Share2 size={16} /></div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-emerald-400 hover:border-emerald-400 transition-all cursor-pointer"><Globe size={16} /></div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/5 relative h-64 lg:h-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-transparent to-transparent z-10"></div>
              <img 
                alt="Environmental branding" 
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-[3000ms]" 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
