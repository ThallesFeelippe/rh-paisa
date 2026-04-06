'use client';

import React from 'react';
import { ArrowRight, Search, Timer, PlayCircle, Play, Shield, Share2, Rss, Globe } from 'lucide-react';
import Link from 'next/link';

export default function NoticiasPage() {
  return (
    <div className="bg-surface text-on-surface selection:bg-secondary selection:text-white font-body animate-fade">
      <main className="pt-24 md:pt-32">
        
        {/* Hero / Featured Section */}
        <section className="px-4 md:px-12 mb-24">
          <div className="relative w-full h-[700px] md:h-[820px] rounded-[32px] overflow-hidden group shadow-2xl">
            <img 
              alt="Modern AgTech Hero" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChpEUY__cNnI02kNsCAGINDdlV_p5a27rCkO4qbz0j6VEIs_mntaMrBAJJ-cNvfYuqAWzMOQRa0tMgotJzMCdyvh5f8tKoQ7hwBoCzh74N6_rFoTOJCr9VKCEnhwadGuWhLt5r4flD4WItfiJNhi05GHRFHVCchCRsEKI7rNHOtmOysjGZ1GC8C5HfUVytvvi5LfRxumQuFijX-rULDqMM3MAPCNSeYnojdk5XlV9wH0SFxW0jGYuy0fkiRDVY6ia4RqI0XPDt4hPG"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00190F] via-[#00190F]/30 to-transparent"></div>
            <div className="absolute bottom-12 left-0 w-full px-6 md:px-16">
              <div className="bg-[#0e2f22]/40 backdrop-blur-md p-8 md:p-12 rounded-[24px] max-w-4xl border border-white/10">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 bg-secondary text-white text-[11px] font-bold tracking-[0.2em] uppercase rounded-md shadow-lg">Premium Editorial</span>
                  <span className="text-[#ABCFBB] text-sm font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">auto_awesome</span> IA & AgTech • 6 min de leitura
                  </span>
                </div>
                <h1 className="text-white text-5xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tighter text-glow">
                  A Revolução <br />Silenciosa Autônoma
                </h1>
                <p className="text-[#ABCFBB]/90 text-xl md:text-2xl mb-10 font-medium max-w-2xl leading-relaxed">
                  Como a Usina Paisa está liderando a descarbonização global através de inteligência de frotas robóticas.
                </p>
                <button className="bg-white text-[#00190F] px-12 py-5 rounded-full hover:bg-secondary hover:text-white transition-all duration-500 flex items-center gap-4 font-bold group shadow-2xl">
                  Ver Reportagem Completa 
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trending & Search */}
        <section className="px-8 md:px-12 mb-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start justify-between border-b border-outline-variant/10 pb-16">
            {/* Trending Topics */}
            <div className="flex-1">
              <h4 className="text-[10px] font-bold text-outline uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span> Tópicos em Alta
              </h4>
              <div className="flex flex-wrap gap-4">
                {['#NetZero2030', '#Biotecnologia', '#ESG_Finance', '#AgTech4.0'].map(tag => (
                  <Link key={tag} href="#" className="px-6 py-2.5 rounded-full border border-outline-variant/20 bg-surface-container-low text-sm font-bold hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            {/* Search & Filters */}
            <div className="w-full lg:w-[450px] space-y-6">
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl text-sm py-5 px-14 focus:ring-1 focus:ring-secondary/40 transition-all placeholder:text-outline font-medium text-on-surface" 
                  placeholder="O que você deseja pesquisar hoje?" 
                  type="text"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-outline" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                <button className="whitespace-nowrap px-6 py-2 rounded-xl bg-primary-container text-white text-xs font-bold shadow-lg">Recentes</button>
                {['Mais Lidas', 'Opinião', 'Podcasts'].map(cat => (
                  <button key={cat} className="whitespace-nowrap px-6 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-bold transition-all">{cat}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric News Grid */}
        <section className="px-8 md:px-12 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Large Featured Card */}
            <div className="md:col-span-12 lg:col-span-8 group hover:-translate-y-2 transition-all duration-500">
              <div className="relative aspect-[16/9] md:aspect-[21/10] rounded-[32px] overflow-hidden mb-10 shadow-xl">
                <img 
                  alt="Social Education" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6N6l_hV12nfa1usfX3okxUh7d4NdNBOXRooUyQhMSTda3m0INNAi93rFcoZlwKpAXTyaOq6s38k5F9g07xovFEigW74P0aynU-RzzrbPh8agmmwEYMegdUStVl2y6E0nkrcYQGCYZzCBWFPN8AGMaDPTWoHLrP76LcVkEEwzdHjbPU4J0rqTOhE90ypsWsUh2OPSfQ9GKwQYIV30oIehFTF_xwlGrJynpCDkhjRy8tr_d0Cb8wwVLtBe_LQFoDlhvMJf6gRIUFvr-"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-[0.2em] shadow-2xl">Biotecnologia</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-bold text-outline uppercase tracking-[0.15em] mb-6">
                <span className="text-secondary font-black">12 Out 2024</span>
                <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                <span className="flex items-center gap-1.5 font-black"><Timer size={12} className="text-secondary" /> 4 MIN READ</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.05] tracking-tighter group-hover:text-secondary transition-colors duration-500">
                Educação 4.0: Usina Paisa expande laboratórios de biotecnologia local
              </h3>
              <p className="text-on-surface-variant text-xl leading-relaxed max-w-3xl mb-8 font-medium">
                A iniciativa visa capacitar talentos regionais para a manutenção industrial de precisão e genética do solo, consolidando um ecossistema de inovação rural sem precedentes.
              </p>
              <Link href="#" className="inline-flex items-center gap-3 text-primary font-black hover:gap-5 transition-all text-sm uppercase tracking-widest border-b-2 border-secondary pb-1.5">
                Acessar Estudo de Caso <span className="material-symbols-outlined text-base">north_east</span>
              </Link>
            </div>

            {/* Side Sidebar News */}
            <div className="md:col-span-12 lg:col-span-4 space-y-16 pt-12 lg:pt-0">
              {[
                {
                  title: 'Cogeração experimental atinge pico de eficiência recorde',
                  cat: 'Energia Limpa',
                  read: '3 min read',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3NhDipo1b8Y0OQOcHB9NM9iLPN3Whue3RwKfh6L9yyyuDQKJqYKEjqijkQm7glyi-Ld1GEtBeXhrb--9_E-eansN6TKGWdzEOVeUko5MpDYLHjad_IUvxb2E8Ns4sb7tlu27kzaGy_3SAssSBlqEqHfySHvjBNUyw8u1kXHAUMPywg7qNEjJamwRKq8S_lyhmPbdHIJ39pz44gEVJU1I-2REckeIpR0nKmOjM8fD1SxdsVPlqvJlt7SAuzINwJUh05c54lrKydJD'
                },
                {
                  title: 'Saúde Mental: Palestras trazem bem-estar para o campo',
                  cat: 'Pessoas',
                  read: '5 min read',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8B_l4fjqUhgwuWvauBhImuJY5llh17poFKjbC8iEFL1WS8OrqwXL8PLqHcDxWg8hmQDAs9s1U_tCNKnF7y8zPaFQQ1SQCdNMw0gnPpCNwqYlpR9mnKBdjE70BDGveMsvHBsoLvt73Ntkz9hFEGhQMFONjARob7WwvR8KvfNMDYga_PajcjGrpCWBQisIoxeR7jIl6WMLNMn1HA8f3mN3N6iBKOJQUf_1lpCmQr_mw8I2W2bl3DSvnENg6rPQjSMtwRQ27SCDJ98aH'
                }
              ].map((news, i) => (
                <div key={i} className="group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-l border-outline-variant/20 pl-8">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <img alt={news.cat} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={news.img} />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
                    <span>{news.cat}</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                    <span className="text-outline">{news.read}</span>
                  </div>
                  <h4 className="text-2xl font-bold leading-tight group-hover:text-secondary transition-colors duration-500 tracking-tight">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Highlights Section */}
        <section className="bg-[#050B08] py-32 px-8 md:px-12 mb-32 overflow-hidden relative">
          <div className="absolute -top-64 -right-64 w-[600px] h-[600px] bg-secondary/10 blur-[160px] rounded-full"></div>
          <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-primary-container/20 blur-[160px] rounded-full"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 px-4">
              <div className="max-w-2xl">
                <span className="text-secondary font-bold text-xs tracking-[0.4em] uppercase mb-6 block">Cinema Series</span>
                <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter leading-none italic uppercase">Destaques <br /> <span className="text-emerald-500 italic">Imersivos</span></h2>
              </div>
              <button className="text-white flex items-center gap-4 font-bold text-sm tracking-widest uppercase hover:text-secondary transition-all group px-4">
                Explorar Videoteca <PlayCircle size={20} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div className="relative group aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    alt="Video Highlight" 
                    className="w-full h-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAisMeYxqqPGqxRb7FshTfIgYOCb1RbLNDvuOLD9zsujAP21Vp24xo_XbrX6bixapQuoLKb-bsF9kE3ZpC_gyqLsA2klba6b-AKL7cvjrGSwNZBurPnshKgWXb3nfAcAt9PeVNdvWGt_NZaPeN--HODlMPYgTAjchRJop8NFWS80PbQ5_DRbEk77XqLCmQGRSAr3LpnWmqXiMJq_1dWLQXfvAks2FGfZ8Ixibn_qLHbi6pgpLximGCwnUF39IVh4uGTNF5gnWuowcCz"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary group-hover:border-secondary transition-all duration-700 shadow-2xl">
                      <Play size={40} className="text-white fill-white ml-2" />
                    </button>
                  </div>
                  <div className="absolute bottom-10 left-10">
                    <p className="text-secondary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">Minidocumentário Especial</p>
                    <h4 className="text-white text-3xl font-bold tracking-tight italic uppercase">O Ciclo da Cana: Transformação Tecnológica</h4>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                {[
                  { title: 'Irrigação Digital: O Futuro da Água', time: '02:45 MIN', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy-GXX4LNXMlNhbNDJtlwwkbyZlq9JZW9yzbJt2D_0cDgSyREPDRFyfvTHq5IHhNrakiAUpLlZMGKK2whIRXMR3Z_9XnrIeaiqaEPRnS60K2e_Zb-AK0C9-fM7S77KADgDUR5hmmH0lGYeEY_r9neDsVMWvZrlYY2INW0SuWMzoo3AlOMKYi1r16nnOe7YFbVKpfcuNnbeWIMIKEXp_cgGs-RFHD_2O_FSS3J_HF3lBZLfrUwsErWGPRVbk4EMJJzR3oAMRWpw3Nvt' },
                  { title: 'Economia Verde: Créditos de Carbono', time: '05:12 MIN', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmhqmAzGW8nTOd3lH8mObIWzQZxEjgR6WrM5eOBkuUjffT_FXaHAfaX8FmBI7AqX6SHqVSLzEArhA2j-VJ6JJ3hxr7TC5ZIJ2Sv4ltXee_2MmZtzMrSKKtdmYKjn2pOfxjMX5QqOQY3roW-_Feri2CnBdmUAQiIqb8X48ubgFuj_gGTq2k_LyiO0QX4TeisD_xvOPlqL8o4421HO85UcTpIhsx6fxUfGm8q9gNgCpPWtR8n7_rbqIS3Co0UU-xa2slWAx7UD0rdjHr' }
                ].map((vid, i) => (
                  <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/5 p-8 rounded-3xl flex gap-6 hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer group hover:-translate-y-1">
                    <div className="w-32 aspect-square rounded-2xl bg-black overflow-hidden flex-shrink-0 relative">
                      <img alt={vid.title} className="w-full h-full object-cover opacity-60" src={vid.img} />
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Play size={16} fill="white" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h5 className="text-white text-lg font-bold leading-tight group-hover:text-emerald-400 transition-colors">{vid.title}</h5>
                      <p className="text-white/40 text-[10px] mt-3 uppercase font-black tracking-widest flex items-center gap-2">
                        <Timer size={12} /> {vid.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* More News Grid (Secondary) */}
        <section className="px-8 md:px-12 mb-32">
          <h2 className="text-4xl font-bold mb-16 tracking-tighter flex flex-wrap items-center gap-6 italic uppercase text-primary">
            Análises e Perspectivas <span className="h-px flex-grow bg-outline-variant/20"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                cat: 'Governança ESG',
                title: 'Eficiência Hídrica: Lavagem Industrial atinge reuso de 95%',
                desc: 'Investimentos em circuito fechado consolidam liderança socioambiental da Paisa.',
                date: '08 OUT 2024',
                read: '2 MIN READ',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy-GXX4LNXMlNhbNDJtlwwkbyZlq9JZW9yzbJt2D_0cDgSyREPDRFyfvTHq5IHhNrakiAUpLlZMGKK2whIRXMR3Z_9XnrIeaiqaEPRnS60K2e_Zb-AK0C9-fM7S77KADgDUR5hmmH0lGYeEY_r9neDsVMWvZrlYY2INW0SuWMzoo3AlOMKYi1r16nnOe7YFbVKpfcuNnbeWIMIKEXp_cgGs-RFHD_2O_FSS3J_HF3lBZLfrUwsErWGPRVbk4EMJJzR3oAMRWpw3Nvt'
              },
              {
                cat: 'Mercado Global',
                title: 'Exportações de Biocombustível sobem 15% para a Europa',
                desc: 'Resultados trimestrais refletem a alta demanda por energia limpa rastreada.',
                date: '05 OUT 2024',
                read: '4 MIN READ',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmhqmAzGW8nTOd3lH8mObIWzQZxEjgR6WrM5eOBkuUjffT_FXaHAfaX8FmBI7AqX6SHqVSLzEArhA2j-VJ6JJ3hxr7TC5ZIJ2Sv4ltXee_2MmZtzMrSKKtdmYKjn2pOfxjMX5QqOQY3roW-_Feri2CnBdmUAQiIqb8X48ubgFuj_gGTq2k_LyiO0QX4TeisD_xvOPlqL8o4421HO85UcTpIhsx6fxUfGm8q9gNgCpPWtR8n7_rbqIS3Co0UU-xa2slWAx7UD0rdjHr'
              },
              {
                cat: 'Bio-Regeneração',
                title: 'Corredores Verdes: 5.000 hectares reflorestados',
                desc: 'Projeto inédito conecta matas nativas preservadas, criando refúgios de biodiversidade.',
                date: '01 OUT 2024',
                read: '6 MIN READ',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAisMeYxqqPGqxRb7FshTfIgYOCb1RbLNDvuOLD9zsujAP21Vp24xo_XbrX6bixapQuoLKb-bsF9kE3ZpC_gyqLsA2klba6b-AKL7cvjrGSwNZBurPnshKgWXb3nfAcAt9PeVNdvWGt_NZaPeN--HODlMPYgTAjchRJop8NFWS80PbQ5_DRbEk77XqLCmQGRSAr3LpnWmqXiMJq_1dWLQXfvAks2FGfZ8Ixibn_qLHbi6pgpLximGCwnUF39IVh4uGTNF5gnWuowcCz'
              }
            ].map((news, i) => (
              <div key={i} className="group hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-8 shadow-lg">
                  <img alt={news.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={news.img} />
                  <span className="absolute top-5 left-5 bg-white/95 backdrop-blur text-secondary text-[9px] font-black px-4 py-1 rounded-md tracking-[0.15em] uppercase shadow-xl">{news.cat}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-outline mb-4">
                  <span className="text-secondary font-black">{news.date}</span>
                  <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                  <span>{news.read}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-secondary transition-colors duration-500">{news.title}</h3>
                <p className="text-on-surface-variant line-clamp-2 mb-8 text-base font-medium">{news.desc}</p>
                <Link href="#" className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
                  Detalhes Técnicos <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-24 flex justify-center">
            <button className="px-16 py-6 border border-primary/20 text-primary font-black uppercase tracking-[0.3em] hover:bg-primary-container hover:text-white transition-all duration-500 rounded-full text-[11px] shadow-sm hover:shadow-xl">
              Carregar mais conteúdo
            </button>
          </div>
        </section>

        {/* Premium Newsletter */}
        <section className="px-4 md:px-12 mb-32">
          <div className="bg-[#0e2f22] rounded-[48px] overflow-hidden flex flex-col lg:flex-row relative shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#006C48]/20 to-transparent pointer-events-none"></div>
            <div className="lg:w-3/5 p-12 md:p-24 relative z-10">
              <span className="text-secondary font-bold text-[10px] tracking-[0.5em] uppercase mb-10 block">Intelligence Report</span>
              <h2 className="text-white text-5xl md:text-7xl font-bold mb-10 leading-[0.9] tracking-tighter italic uppercase">O amanhã da <br />energia em foco.</h2>
              <p className="text-[#ABCFBB]/80 text-xl md:text-2xl mb-16 max-w-lg font-medium leading-relaxed">Nossa curadoria semanal exclusiva sobre inovação, biotecnologia e economia verde.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl group" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-grow relative">
                  <input 
                    className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 px-8 py-6 rounded-2xl focus:ring-1 focus:ring-secondary focus:bg-white/[0.08] transition-all outline-none text-lg font-medium" 
                    placeholder="E-mail corporativo" 
                    type="email"
                  />
                </div>
                <button className="bg-secondary text-white px-12 py-6 font-bold rounded-2xl hover:bg-white hover:text-[#0e2f22] transition-all duration-500 whitespace-nowrap text-lg shadow-2xl active:scale-95" type="submit">Inscrever-se</button>
              </form>
              <div className="flex items-center gap-3 mt-10 text-white/20 text-[9px] font-black uppercase tracking-[0.25em]">
                <Shield size={14} className="text-secondary" /> 
                Privacidade Garantida • Cancele a qualquer momento
              </div>
            </div>
            <div className="lg:w-2/5 relative min-h-[500px] hidden lg:block overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0e2f22] via-[#0e2f22]/20 to-transparent z-10"></div>
              <img 
                alt="Newsletter Visual" 
                className="w-full h-full object-cover scale-110 opacity-60 transition-transform duration-1000 hover:scale-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPQthlWu9adSBlJ_k1Z6_8gHKv-PM5KobZpuTWT8qxzcg5DEmm3KASyxoITADlWA_OzVpt5VIUNkKsQNI8IELegGl_5MXGjaQuLhNBr-BbJG3daWBy_zqWB0VlmYq5ulSxyCcFINn-5fLyB7SkB7rqb8PM2YIbe2EXiN1AAKVheEO6AYZGIZznRhCNKsddcHsWrUo8bRhlAdTOfszrbqXfCfjICFLn7bOBMx23_h5_KhhA7ouUehZEezr45ytNWNuPJkEu5PTJFnpf"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
