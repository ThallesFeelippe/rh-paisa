import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import { 
  ArrowLeft, 
  Calendar, 
  Tag as TagIcon,
  Share2,
  Clock,
  User,
  Quote,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { Metadata } from 'next';

interface NewsPageProps {
  params: {
    id: string;
  };
}

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const news = await prisma.news.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    }
  });

  if (!news) return { title: 'Notícia não encontrada | Usina Paisa' };

  return {
    title: `${news.metaTitle || news.title} | Mural Paisa`,
    description: news.metaDescription || news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt || undefined,
      images: news.image ? [news.image] : [],
    }
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const news = await prisma.news.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: params.id }
      ]
    }
  });

  if (!news || (news.status !== 'PUBLICO' && process.env.NODE_ENV === 'production')) {
    notFound();
  }

  // --- PROCESSAMENTO SEGURO DE DADOS ---
  let gallery = [];
  try {
    if (news.gallery && news.gallery.trim() !== '') {
      gallery = JSON.parse(news.gallery);
    }
  } catch (e) {
    console.error('Erro ao processar galeria:', e);
    gallery = [];
  }

  const tags = news.tags ? news.tags.split(',').map(t => t.trim()) : [];
  // -------------------------------------

  const isYoutube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
  const getYoutubeEmbed = (url: string) => {
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <main className="bg-white min-h-screen antialiased selection:bg-emerald-100 selection:text-emerald-900 animate-fade">
      {/* Hero Section / Cover */}
      <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={news.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600'} 
            className="w-full h-full object-cover grayscale-[0.1]"
            alt={news.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-6 md:px-12 pb-20 pt-32">
            <Link 
              href="/noticias" 
              className="inline-flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-[0.4em] uppercase mb-10 hover:gap-4 transition-all group"
            >
              <ArrowLeft size={16} /> Voltar para o Mural
            </Link>
            <div className="max-w-5xl">
              <div className="flex flex-wrap gap-5 mb-8 items-center">
                <span className="bg-emerald-600 px-5 py-2 rounded-lg text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                  {news.category}
                </span>
                <span className="text-emerald-100/70 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={14} className="text-emerald-400" /> {new Date(news.publishedAt || news.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] font-headline uppercase italic text-glow drop-shadow-2xl">
                {news.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Sidebar Left - Metadata */}
            <div className="lg:col-span-3 lg:border-r border-slate-100 pr-12 space-y-16 hidden lg:block">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Redação</h4>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 overflow-hidden">
                    {news.authorAvatar ? (
                        <img src={news.authorAvatar} className="w-full h-full object-cover" alt={news.authorName || 'Autor'} />
                    ) : (
                        <User size={28} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-950 uppercase italic leading-none mb-1">{news.authorName || 'Comunicação Paisa'}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Unidade Alagoas</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Engagement</h4>
                <div className="flex flex-col gap-4">
                  <ShareButton />
                </div>
              </div>

              <div className="bg-emerald-950 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                <Quote className="text-emerald-400 mb-6 opacity-40 group-hover:scale-110 transition-transform" size={40} />
                <p className="text-sm italic font-body text-emerald-100/90 leading-relaxed relative z-10">
                  "O compromisso com a transparência é o que nos permite crescer junto com a comunidade e o agronegócio."
                </p>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800/20 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Main Article Body */}
            <div className="lg:col-span-9 max-w-4xl">
              
              {/* Feature Video Section */}
              {news.videoUrl && (
                <div className="mb-20 rounded-[40px] overflow-hidden shadow-2xl bg-slate-900 aspect-video relative group">
                  {isYoutube(news.videoUrl) ? (
                    <iframe 
                      className="w-full h-full"
                      src={getYoutubeEmbed(news.videoUrl)}
                      title="Video feature"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                        controls 
                        className="w-full h-full object-cover"
                        src={news.videoUrl}
                    />
                  )}
                </div>
              )}

              {news.excerpt && (
                <div className="relative mb-20">
                    <p className="text-3xl md:text-5xl font-light text-emerald-950 leading-[1.2] border-l-8 border-emerald-500 pl-12 italic tracking-tight font-headline">
                        {news.excerpt}
                    </p>
                    <div className="absolute -left-4 -top-8 text-8xl font-black text-emerald-500/10 select-none">“</div>
                </div>
              )}

              <div 
                className="prose prose-2xl prose-emerald max-w-none font-body text-slate-800 leading-loose space-y-10 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />

              {/* Gallery Section */}
              {gallery.length > 0 && (
                <div className="mt-24 pt-20 border-t border-slate-100 space-y-12">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 flex items-center gap-4">
                        <ImageIcon size={14} /> Imagens Adicionais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {gallery.map((img: string, i: number) => (
                            <div key={i} className="rounded-[32px] overflow-hidden shadow-xl group cursor-zoom-in">
                                <img src={img} className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt={`Gallery item ${i}`} />
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Tags Section */}
              {tags.length > 0 && (
                <div className="mt-20 pt-12 border-t border-slate-100">
                    <div className="flex flex-wrap gap-3">
                    {tags.map(tag => (
                        <span key={tag} className="px-6 py-2.5 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm">
                        #{tag}
                        </span>
                    ))}
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA / More Intelligence */}
      <section className="py-40 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-emerald-600 font-black text-[10px] tracking-[0.8em] uppercase mb-10 block">End of Report</span>
          <h2 className="text-5xl md:text-8xl font-black text-emerald-950 mb-16 tracking-tighter uppercase italic leading-[0.8] font-headline">Fique por dentro <br/>de cada safra.</h2>
          <Link 
            href="/noticias" 
            className="px-16 py-7 bg-emerald-950 text-white rounded-[24px] font-black text-xs tracking-[0.2em] uppercase hover:bg-emerald-600 transition-all duration-700 shadow-2xl inline-flex items-center gap-4 hover:gap-8 active:scale-95"
          >
            VER TODAS AS NOTÍCIAS <Play size={16} fill="white" />
          </Link>
        </div>
      </section>
    </main>
  );
}
