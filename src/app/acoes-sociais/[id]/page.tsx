import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Quote
} from 'lucide-react';
import ShareButton from '@/components/ShareButton';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: { id: params.id }
  });

  if (!project) {
    notFound();
  }

  const images = JSON.parse(project.images || '[]');

  return (
    <main className="bg-[#f8faf9] min-h-screen antialiased">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={images[0] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600'} 
            className="w-full h-full object-cover"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f22] via-[#0e2f22]/40 to-transparent"></div>
        </div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="container mx-auto px-6 md:px-12 pb-16">
            <Link 
              href="/acoes-sociais" 
              className="inline-flex items-center gap-2 text-[#92f7c3] font-bold text-xs tracking-widest uppercase mb-8 hover:gap-4 transition-all group"
            >
              <ArrowLeft size={16} /> Voltar para Projetos
            </Link>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-[#006c48]/30 backdrop-blur-md border border-[#92f7c3]/30 px-4 py-1.5 rounded-full text-[#92f7c3] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> {project.location}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} /> {project.date}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] font-headline uppercase italic">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-xl prose-slate max-w-none">
                <div className="flex items-start gap-6 mb-12">
                  <div className="w-1 bg-[#006c48] h-32 rounded-full hidden md:block"></div>
                  <p className="text-2xl md:text-3xl font-light text-[#00190f] leading-relaxed font-body">
                    {project.description}
                  </p>
                </div>
                
                {/* Visual quote or impact highlight */}
                {(project.impactTitle || project.impactDescription) && (
                  <div className="my-16 bg-[#0e2f22] rounded-[40px] p-12 text-white relative overflow-hidden group">
                    <Quote className="absolute -top-6 -left-6 text-[#92f7c3] opacity-20 w-48 h-48 -rotate-12 transition-transform group-hover:rotate-0 duration-1000" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-headline font-bold mb-6 text-[#92f7c3]">{project.impactTitle || 'Impacto Gerado'}</h3>
                      <p className="text-xl text-[#abcfbb] leading-relaxed">
                        {project.impactDescription || 'Comprometidos com o desenvolvimento sustentável e o fortalecimento das comunidades.'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-8 text-[#414844] text-lg leading-relaxed">
                  <p>
                    O acompanhamento contínuo destas ações permite que a Usina Paisa ajuste suas estratégias de impacto social de acordo com as necessidades reais de cada localidade. Nossa equipe técnica trabalha em conjunto com lideranças comunitárias para garantir que os benefícios cheguem a quem mais precisa.
                  </p>
                  <p>
                    Além do suporte material, focamos na capacitação e no empoderamento dos beneficiários, permitindo que os projetos se tornem sustentáveis a longo prazo. A transparência em cada etapa do processo é pilar fundamental de nossa governança ESG.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar / Stats */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-white rounded-3xl p-8 border border-[#c1c8c2]/30 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#006c48] mb-8 pb-4 border-b border-[#c1c8c2]/10">Ficha Técnica</h4>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#414844]/60 block mb-1">Status</label>
                    <span className="text-sm font-bold text-[#00190f] flex items-center gap-2">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> {project.status || 'Em Andamento'}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#414844]/60 block mb-1">Pilar ESG</label>
                    <span className="text-sm font-bold text-[#00190f]">{project.category || 'Social'}</span>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#414844]/60 block mb-1">Unidade Responsável</label>
                    <span className="text-sm font-bold text-[#00190f]">{project.responsible || 'RH Paisa'}</span>
                  </div>
                </div>
                
                <div className="mt-10 pt-10 border-t border-[#c1c8c2]/10">
                  <ShareButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[#0e2f22] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-[#92f7c3] font-bold uppercase tracking-widest text-[10px] mb-4 block">Galeria Visual</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter font-headline uppercase italic">Registros de Campo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img: string, idx: number) => (
              <div 
                key={idx} 
                className={`group rounded-3xl overflow-hidden relative cursor-zoom-in transition-all duration-700 hover:scale-[1.02] ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${project.title} - Foto ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
            
            {images.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-[#92f7c3]/20 rounded-3xl">
                <p className="text-[#abcfbb] font-bold uppercase tracking-widest text-xs">Sem registros fotográficos extras para este projeto.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-6 md:px-12 text-center overflow-hidden relative border-t border-[#c1c8c2]/30 bg-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-[#00190f] mb-8 tracking-tighter leading-none font-headline uppercase italic">Quer fazer parte dessa transformação?</h2>
          <p className="text-xl md:text-2xl text-[#414844] mb-16 max-w-2xl mx-auto leading-relaxed font-light font-body">
            Seja como voluntário em <span className="font-bold text-[#006c48]">{project.title}</span> ou como um parceiro técnico, sua colaboração amplifica nosso impacto.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`https://wa.me/5582991234567?text=Olá!%20Quero%20ser%20voluntário%20no%20projeto%20${encodeURIComponent(project.title)}`}
              target="_blank"
              className="bg-[#006c48] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-[#00190f] transition-all duration-500 shadow-2xl rounded-xl inline-block"
            >
              QUERO SER VOLUNTÁRIO
            </a>
            <a 
              href={`https://wa.me/5582991234567?text=Olá!%20Tenho%20interesse%20em%20ser%20um%20parceiro%20técnico%20no%20projeto%20${encodeURIComponent(project.title)}`}
              target="_blank"
              className="bg-white border-2 border-[#0e2f22] text-[#0e2f22] px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-[#eceeed] transition-all duration-500 rounded-xl inline-block"
            >
              SEJA UM PARCEIRO
            </a>
          </div>
        </div>
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#92f7c3]/20 rounded-full blur-[100px]"></div>
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-[#abcfbb]/20 rounded-full blur-[100px]"></div>
      </section>

      {/* Final CTA - Explore More */}
      <section className="py-24 px-6 bg-[#f8faf9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-[#00190f] mb-8 tracking-tighter uppercase italic">Explore outros projetos</h2>
          <div className="flex justify-center">
            <Link 
              href="/acoes-sociais" 
              className="bg-[#006c48] text-white px-12 py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#00190f] transition-all duration-500 shadow-2xl"
            >
              VER TODA A GALERIA
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
