'use client';

import React from 'react';

export default function AcoesSociaisPage() {
  return (
    <main className="bg-[#f8faf9] text-[#191c1c] antialiased font-body">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[750px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover scale-105" 
            alt="Comunidade interagindo em ambiente sustentável" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiBDy_q4mMAlHTfeSVpKAC2_fakd5m7lKHZeC-kbD9I5Z1C2-sAyCSlpafXKuCRpVlA-gT48lMO008DZBcnLDd9u1JnyGWi1W-Cd8wgEa-8YfPRIXGh_AD23oVHk78Wmok4xtHXaZ28jVXmlPiGlJgDp5kRNhxJ7guHOQf9K6g4PPayxKCWZfiD4UMNTr2qHkOxyseJAgAEbAZioRg_TmaInzt2hIrQQLNjvlBdctdd9qppjfIN3imgn1j2j8aPYHwGVxAO6zSImpQ" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e2f22]/80 via-[#0e2f22]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="max-w-4xl backdrop-blur-md bg-white/10 p-12 md:p-20 rounded-2xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <span className="inline-block px-4 py-1 rounded-full bg-[#006c48]/20 text-[#92f7c3] font-bold text-xs uppercase tracking-widest mb-6">Impacto Social</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] mb-8 font-headline">
              Cultivando <br/><span className="text-[#92f7c3]">o Amanhã</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-xl font-light">
              Mais do que produzir energia, cultivamos o desenvolvimento humano e a prosperidade compartilhada em cada região onde atuamos.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projetos" className="bg-[#006c48] text-white px-10 py-5 font-bold text-sm tracking-widest uppercase hover:bg-[#005235] transition-all duration-300 rounded-lg flex items-center gap-3">
                CONHEÇA OS PROJETOS <span className="material-symbols-outlined">expand_more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares Sociais (Bento Grid) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto" id="projetos">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#006c48] font-bold uppercase tracking-widest text-xs mb-4 block">Estratégia ESG</span>
            <h2 className="text-5xl md:text-6xl font-bold text-[#00190f] tracking-tighter leading-none font-headline">Nossos Pilares Sociais</h2>
          </div>
          <p className="text-[#414844] text-lg max-w-md md:text-right">Ações integradas que visam o fortalecimento da cidadania e a melhoria da qualidade de vida local.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Educação do Futuro */}
          <div className="md:col-span-7 group bg-white border border-[#c1c8c2]/30 rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden relative transition-all duration-500 hover:border-[#006c48] hover:shadow-2xl hover:-translate-y-1 min-h-[450px]">
            <div className="z-10 relative">
              <div className="w-16 h-16 bg-[#f2f4f3] rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#92f7c3] transition-colors duration-500">
                <span className="material-symbols-outlined text-[#006c48] text-4xl">school</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-[#00190f] mb-6 tracking-tight font-headline">Educação do Futuro</h3>
              <p className="text-[#414844] text-lg md:text-xl leading-relaxed max-w-md">Foco em escolas locais, centros de treinamento técnico e capacitação de jovens aprendizes para o mercado agroindustrial.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3 z-10">
              <span className="bg-[#e1e3e2] px-5 py-2.5 rounded-full text-xs font-bold text-[#00190f] tracking-wider uppercase">Centro Técnico</span>
              <span className="bg-[#e1e3e2] px-5 py-2.5 rounded-full text-xs font-bold text-[#00190f] tracking-wider uppercase">E-Learning</span>
              <span className="bg-[#e1e3e2] px-5 py-2.5 rounded-full text-xs font-bold text-[#00190f] tracking-wider uppercase">Bolsas</span>
            </div>
            <div className="absolute -right-16 -bottom-16 text-[#eceeed] opacity-20 group-hover:scale-110 group-hover:text-[#006c48] transition-all duration-1000 pointer-events-none">
              <span className="material-symbols-outlined text-[400px]">auto_stories</span>
            </div>
          </div>

          {/* Saúde e Bem-Estar */}
          <div className="md:col-span-5 group bg-[#0e2f22] rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 min-h-[450px]">
            <div className="z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10">
                <span className="material-symbols-outlined text-[#75daa8] text-4xl">health_and_safety</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-headline">Saúde e <br/>Bem-Estar</h3>
              <p className="text-[#769886] text-lg md:text-xl leading-relaxed">Programas de clínicas móveis e suporte preventivo especializado para colaboradores e suas famílias.</p>
            </div>
            <a className="z-10 mt-10 flex items-center gap-3 text-[#92f7c3] font-bold text-sm tracking-widest uppercase group/link" href="#">
              VER PROGRAMAS <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
            </a>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#006c48]/20 rounded-full blur-3xl group-hover:bg-[#006c48]/30 transition-colors"></div>
          </div>

          {/* Cultura e Esporte */}
          <div className="md:col-span-12 group bg-[#f2f4f3] rounded-3xl p-10 flex flex-col lg:flex-row gap-16 items-center transition-all duration-500 hover:shadow-xl border border-transparent hover:border-[#c1c8c2]/50">
            <div className="flex-1">
              <div className="w-16 h-16 bg-[#e1e3e2] rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-[#006c48] text-4xl">sports_soccer</span>
              </div>
              <h3 className="text-4xl font-bold text-[#00190f] mb-6 tracking-tight font-headline">Cultura e Esporte na Usina</h3>
              <p className="text-[#414844] text-xl leading-relaxed">Fomento às artes locais, eventos culturais regionais e incentivo a práticas esportivas como ferramenta de inclusão social e disciplina.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-full">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c1c8c2]/20 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-sm font-bold text-[#00190f] tracking-widest uppercase">Torneios Comunitários</span>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#c1c8c2]/20 flex flex-col items-center justify-center text-center group-hover:scale-105 transition-transform duration-500 delay-75">
                <span className="text-sm font-bold text-[#00190f] tracking-widest uppercase">Oficinas de Arte</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto em Números */}
      <section className="py-24 bg-gradient-to-br from-[#0e2f22] to-[#00190f] text-white relative overflow-hidden">
        {/* Sugarcane Leaves Animation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <style>{`
            @keyframes sway {
              0%, 100% { transform: rotate(-2deg) skewX(1deg); }
              50% { transform: rotate(3deg) skewX(-2deg); }
            }
            .leaf-sway {
              animation: sway 8s ease-in-out infinite;
              transform-origin: bottom center;
            }
          `}</style>
          
          {/* Leaf 1 */}
          <svg className="absolute -left-20 -bottom-20 w-[400px] h-auto text-[#92f7c3] leaf-sway" viewBox="0 0 200 600" opacity="0.6">
            <path d="M50,600 C30,400 80,200 150,0 C120,200 100,400 50,600 Z" fill="currentColor" />
          </svg>
          
          {/* Leaf 2 */}
          <svg className="absolute left-1/4 -top-20 w-[300px] h-auto text-[#92f7c3] leaf-sway" style={{ animationDelay: '-2s' }} viewBox="0 0 200 600" opacity="0.4">
            <path d="M50,600 C30,400 80,200 150,0 C120,200 100,400 50,600 Z" fill="currentColor" transform="rotate(180 100 300)" />
          </svg>

          {/* Leaf 3 */}
          <svg className="absolute right-0 bottom-0 w-[500px] h-auto text-[#92f7c3] leaf-sway" style={{ animationDelay: '-5s' }} viewBox="0 0 200 600" opacity="0.5">
            <path d="M50,600 C30,400 80,200 150,0 C120,200 100,400 50,600 Z" fill="currentColor" />
          </svg>

          {/* Leaf 4 */}
          <svg className="absolute -right-20 -top-40 w-[450px] h-auto text-[#92f7c3] leaf-sway" style={{ animationDelay: '-1s' }} viewBox="0 0 200 600" opacity="0.3">
            <path d="M50,600 C30,400 80,200 150,0 C120,200 100,400 50,600 Z" fill="currentColor" transform="rotate(160 100 300)" />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#92f7c3]/5 rounded-full blur-[120px] -mr-32"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center">
            <div className="flex flex-col items-center group">
              <span className="text-7xl md:text-9xl font-bold font-headline mb-4 text-white group-hover:scale-110 transition-transform duration-500 block leading-none tracking-tighter">15k<span className="text-[#92f7c3]">+</span></span>
              <p className="text-[#92f7c3]/80 text-sm font-body tracking-[0.3em] uppercase mb-8">Pessoas Beneficiadas</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#92f7c3] to-transparent rounded-full"></div>
            </div>
            <div className="flex flex-col items-center group">
              <span className="text-7xl md:text-9xl font-bold font-headline mb-4 text-white group-hover:scale-110 transition-transform duration-500 block leading-none tracking-tighter">42</span>
              <p className="text-[#92f7c3]/80 text-sm font-body tracking-[0.3em] uppercase mb-8">Projetos Ativos</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#92f7c3] to-transparent rounded-full"></div>
            </div>
            <div className="flex flex-col items-center group">
              <span className="text-7xl md:text-9xl font-bold font-headline mb-4 text-white group-hover:scale-110 transition-transform duration-500 block leading-none tracking-tighter">120k</span>
              <p className="text-[#92f7c3]/80 text-sm font-body tracking-[0.3em] uppercase mb-8">Horas de Treinamento</p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#92f7c3] to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Projetos */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-[#00190f] tracking-tighter mb-4 font-headline">Galeria de Projetos Recentes</h2>
            <p className="text-[#414844] text-xl">Momentos que definem nosso compromisso com o próximo e com o futuro da nossa região.</p>
          </div>
          <button className="hidden md:flex items-center gap-3 text-[#006c48] font-bold text-sm tracking-widest uppercase hover:gap-5 transition-all">
            VER TODOS <span className="material-symbols-outlined">east</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              date: 'Dezembro 2023',
              title: 'Natal Solidário',
              desc: 'Distribuição de cestas e brinquedos para mais de 500 famílias da zona rural e urbana da nossa região.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1xji4ufcVTjuZIGGQRkX3BWTx-6al1whw5EixiFbOvhTpZY7op_ANRtF9eeikiIaohNBE0LsRQCluLoOx4h3Vlc0pZirHjByTXBtVnT2j-j7sugHvGHP-1d13nylIi49Ykt4D3PBPDTY9HEUlZVj4Ss8oiYVkKDWrZjfwpV7-UbCUH6SWBzCLB1bwStwlqRKC0eIlTu7NcGbQdK39YhjOEeU3ni2eRKnjMfu_fvX-oak3F1ff2LHuoWuBQHkxfPc5G9n5KU7-RDfW'
            },
            {
              date: 'Outubro 2023',
              title: 'Dia de Campo',
              desc: 'Alunos de escolas públicas visitam nossas instalações para aprender sobre sustentabilidade e tecnologia de ponta.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiqRBp3WkZPOQEp2Eat0j1fzcL1dzpNyjfAKeojEFdEgyiSB82Ohc7ABjHglcTv6em6oDqNnIscx2EIx04lLzzwAKTJyEgv6_-O3Zl-tDKrkGFTNZsqi7oQUBF4aFgHegH5_9eByffoGz9DoVGLiajRD_o5QV7xT-VpRJoF8Jm1laE8HP_2xmPYVViRNOdes_UkkrTFPKCDGTLOakSwwgUrIlslAWmlZNXF6Umg7VlqdbAnwL5drBKzqfi-wK5oAsf2skc753t6uCy'
            },
            {
              date: 'Junho 2023',
              title: 'Copa Usina Paisa',
              desc: 'Competição esportiva regional envolvendo times de 12 comunidades diferentes do entorno da usina.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD1Ts31Bx4Lmshep7ftkQUnLlUMwdudMeNrLNiFE53HBl2lN_YJ-2yPqY2g6Uf3nZaAQd6GNtOkZo8xdZXxF0gKrmVjJQNDoKDqHFmo_zMw_AmzPzWrKxP95vxCtU2RbvntKRwyQWjz6-vpz4jj5oAglCleP-jWRzqb5Ue5c-pp5lQT_tZtf5ifPi2zrsuLChwdjYT0jRz1FXutFw4XEdsjguJarheSCxL93DxnhYKSHH_INbdhHSjKgL7rd5PLIMMJdl8cboRxoKt'
            }
          ].map((proj, idx) => (
            <div key={idx} className="group flex flex-col bg-white border border-[#c1c8c2]/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="h-80 overflow-hidden relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={proj.img} alt={proj.title} />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold text-[#00190f] tracking-widest uppercase">{proj.date}</span>
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h4 className="text-2xl font-bold text-[#00190f] mb-4 tracking-tight group-hover:text-[#006c48] transition-colors font-headline">{proj.title}</h4>
                <p className="text-[#414844] leading-relaxed mb-8 text-lg">{proj.desc}</p>
                <div className="mt-auto">
                  <button className="inline-flex items-center gap-2 text-[#00190f] font-bold text-xs tracking-widest uppercase hover:gap-4 transition-all">
                    Ler Reportagem <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vozes da Comunidade */}
      <section className="py-32 bg-[#f2f4f3] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#006c48] font-bold uppercase tracking-widest text-xs mb-4 block">Testemunhos</span>
            <h2 className="text-5xl md:text-6xl font-bold text-[#00190f] tracking-tighter leading-none mb-6 font-headline">Vozes da Comunidade</h2>
            <div className="w-24 h-1 bg-[#006c48] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva',
                role: 'Penedo, AL',
                text: '"Graças ao Centro Técnico da Paisa, hoje tenho uma profissão e consigo sustentar minha família com dignidade. Foi a oportunidade que mudou minha vida."',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_TfNf6_U3P2W8x2M_N1k8_Z_X4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y'
              },
              {
                name: 'José Santos',
                role: 'Pai de Aluno',
                text: '"O projeto de esporte trouxe alegria e disciplina para as nossas crianças. É emocionante ver meu filho evoluindo no futebol e na escola ao mesmo tempo."',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2_SgOg7_V4Q3X9L2N_O1j9_A_W3_X_Y3_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y'
              },
              {
                name: 'Ana Oliveira',
                role: 'Comunidade Rural',
                text: '"As clínicas móveis são essenciais para nós que moramos mais longe. O atendimento é humanizado e faz toda a diferença na saúde da nossa comunidade."',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuE3_RnP8_T5R2W7x1M_P2k0_B_V2_W_X2_Y3_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y_Z4_Y'
              }
            ].map((test, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl border border-[#c1c8c2]/30 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="mb-8">
                  <span className="material-symbols-outlined text-[#75daa8] text-5xl opacity-40">format_quote</span>
                </div>
                <p className="text-[#414844] text-lg leading-relaxed mb-10 flex-grow italic">
                  {test.text}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-[#c1c8c2]/10">
                  <img alt={test.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#006c48]/20" src={test.img} />
                  <div>
                    <h5 className="font-headline font-bold text-[#00190f]">{test.name}</h5>
                    <p className="text-xs text-[#414844] uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 md:px-12 text-center overflow-hidden relative border-t border-[#c1c8c2]/30">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold text-[#00190f] mb-8 tracking-tighter leading-none font-headline">Quer fazer parte dessa transformação?</h2>
          <p className="text-2xl text-[#414844] mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            Seja como voluntário, parceiro técnico ou fornecedor engajado, sua colaboração pode amplificar nosso impacto social.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-[#006c48] text-white px-12 py-6 text-sm font-bold tracking-widest uppercase hover:bg-[#00190f] transition-all duration-500 shadow-2xl rounded-xl">
              QUERO SER VOLUNTÁRIO
            </button>
            <button className="bg-white border-2 border-[#0e2f22] text-[#0e2f22] px-12 py-6 text-sm font-bold tracking-widest uppercase hover:bg-[#eceeed] transition-all duration-500 rounded-xl">
              SEJA UM PARCEIRO
            </button>
          </div>
        </div>
        {/* Decorative organic shapes */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#92f7c3]/30 rounded-full blur-[120px]"></div>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#abcfbb]/30 rounded-full blur-[120px]"></div>
      </section>
    </main>
  );
}
