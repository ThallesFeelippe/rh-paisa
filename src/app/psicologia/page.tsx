'use client';

import React from 'react';

export default function Psicologia() {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-secondary/30">
      {/* Floating Quick Contact Button */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 z-[60] bg-secondary text-on-secondary w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      >
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
        <span className="absolute right-full mr-4 bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Falar com RH
        </span>
      </a>

      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Empowerment and support" 
            className="w-full h-full object-cover brightness-50 scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPV6hnBHxaqfd1CBHmjAxMuhG_6pgAWjjjr-X6d5jOAoj2h3-3RCz92RwZ1Kzd4L7LrNN-l1O3xCv1PAskZgD4q7rtA0CYPk0aa7QHqNAcpHNtTshOyZAPFCE3_P0ggfg5OAfBZevYmB-O1D_efneID-bhQtdKFf01akRzbRkN1VNPFPpWsaPol0-7yTLsGkRG0mf45JF8gI4vR2nUG1W3widzfCIPOS8Bp9zzRWsQYHoc7m5bPrW2L72hPE0Bou0MmxTzBIpyYvDN"
          />
        </div>
        <div className="relative z-10 container mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 bg-[#E1E3E2]/60 backdrop-blur-[20px] p-10 md:p-14 rounded-2xl border border-white/20 shadow-2xl">
            <span className="inline-block px-4 py-1.5 bg-secondary text-on-secondary text-[10px] font-bold tracking-widest uppercase rounded-full mb-6 font-label">
              Foco no Colaborador
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary tracking-tighter leading-[0.9] mb-8">
              Saúde Mental e Bem-Estar: <br/>
              <span className="text-secondary-fixed-dim">Nossa Prioridade</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Na USINA PAISA, acreditamos que a excelência industrial nasce do equilíbrio humano. Oferecemos um ecossistema de suporte dedicado à sua mente e coração.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-primary-container text-white px-10 py-5 rounded-lg font-headline font-bold hover:bg-secondary transition-all duration-500 shadow-xl hover:-translate-y-1">
                Conhecer Programas
              </button>
              <button className="flex items-center gap-3 text-primary px-8 py-5 font-headline font-bold hover:bg-white/10 transition-all rounded-lg group">
                Ver Vídeo Institucional
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">play_circle</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Apoio Psicológico Section */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tight mb-8">Apoio Psicológico</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                Nossa rede de especialistas está disponível para acolher, orientar e fortalecer cada integrante da nossa equipe através de programas contínuos.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low hover:bg-secondary-container transition-all cursor-default border border-outline-variant/5">
                  <span className="material-symbols-outlined text-secondary text-3xl">verified_user</span>
                  <span className="font-bold text-sm uppercase tracking-widest text-primary">100% Confidencial</span>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low hover:bg-secondary-container transition-all cursor-default border border-outline-variant/5">
                  <span className="material-symbols-outlined text-secondary text-3xl">schedule</span>
                  <span className="font-bold text-sm uppercase tracking-widest text-primary">Atendimento 24/7</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary-container text-white flex items-center justify-center rounded-xl mb-8 group-hover:bg-secondary transition-colors shadow-lg">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="text-2xl font-bold font-headline text-primary mb-4">Sessões Individuais</h3>
                <p className="text-on-surface-variant leading-relaxed">Acompanhamento terapêutico personalizado com psicólogos clínicos focados no ambiente corporativo e pessoal.</p>
              </div>
              <div className="group p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary-container text-white flex items-center justify-center rounded-xl mb-8 group-hover:bg-secondary transition-colors shadow-lg">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h3 className="text-2xl font-bold font-headline text-primary mb-4">Círculos de Diálogo</h3>
                <p className="text-on-surface-variant leading-relaxed">Momentos de troca segura em grupo para discutir desafios comuns e fortalecer os laços de comunidade.</p>
              </div>
              <div className="group p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary-container text-white flex items-center justify-center rounded-xl mb-8 group-hover:bg-secondary transition-colors shadow-lg">
                  <span className="material-symbols-outlined text-3xl">self_improvement</span>
                </div>
                <h3 className="text-2xl font-bold font-headline text-primary mb-4">Gestão de Stress</h3>
                <p className="text-on-surface-variant leading-relaxed">Workshops práticos sobre mindfulness e técnicas de relaxamento aplicadas ao dia a dia operacional.</p>
              </div>
              <div className="group p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary-container text-white flex items-center justify-center rounded-xl mb-8 group-hover:bg-secondary transition-colors shadow-lg">
                  <span className="material-symbols-outlined text-3xl">family_restroom</span>
                </div>
                <h3 className="text-2xl font-bold font-headline text-primary mb-4">Apoio à Família</h3>
                <p className="text-on-surface-variant leading-relaxed">Extensão de orientações psicológicas para familiares imediatos, garantindo suporte sistêmico.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendário de Cuidado Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4">Cronograma Anual</span>
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tight">Calendário de Cuidado</h2>
            <div className="w-24 h-1.5 bg-secondary mt-8 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-2xl border-l-[10px] border-primary shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">calendar_today</span>
                <span className="font-bold text-primary tracking-widest uppercase text-sm">Janeiro</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Janeiro Branco</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Foco na saúde mental e emocional. Momento de planejar um ano com mais equilíbrio.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border-l-[10px] border-green-500 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">event_note</span>
                <span className="font-bold text-primary tracking-widest uppercase text-sm">Abril</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Abril Verde</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Conscientização sobre segurança e saúde no trabalho em todo o ecossistema industrial.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border-l-[10px] border-yellow-400 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">volunteer_activism</span>
                <span className="font-bold text-primary tracking-widest uppercase text-sm">Setembro</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Setembro Amarelo</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Campanha de prevenção ao suicídio e valorização da vida através da escuta ativa.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl border-l-[10px] border-pink-500 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">medical_services</span>
                <span className="font-bold text-primary tracking-widest uppercase text-sm">Out/Nov</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Prevenção Integral</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Cuidado com a saúde física que impacta diretamente no bem-estar psicológico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rede Credenciada Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-8 tracking-tight">Rede Credenciada</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                Além do nosso suporte interno, mantemos parcerias com as melhores instituições e plataformas do Brasil para garantir que você tenha acesso ao melhor tratamento, onde quer que esteja.
              </p>
              <button className="border-2 border-primary text-primary px-10 py-4 font-bold rounded-lg hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/30">
                Ver Lista Completa
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: 'local_hospital', label: 'Clínicas Especializadas' },
                { icon: 'devices', label: 'Plataformas Online' },
                { icon: 'home_health', label: 'Apoio Domiciliar' },
                { icon: 'medication', label: 'Farmácias Parceiras' }
              ].map((item, idx) => (
                <div key={idx} className="h-40 bg-surface-container flex items-center justify-center rounded-2xl border border-outline-variant/10 group hover:border-secondary transition-all shadow-sm hover:shadow-xl">
                  <div className="text-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    <span className="material-symbols-outlined text-5xl block mb-4 text-primary group-hover:text-secondary">{item.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Canal de Denúncia Section */}
      <section className="py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[500px]">security</span>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-8 text-secondary-fixed-dim">
                  <span className="material-symbols-outlined text-5xl">lock</span>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-white tracking-tight">Canal de Denúncia Anônima</h2>
                </div>
                <p className="text-primary-fixed-dim text-lg leading-relaxed mb-10">
                  Sua voz é fundamental para mantermos a integridade e o respeito. Este espaço é <strong className="text-white">totalmente independente, seguro e confidencial</strong> para reportar má conduta, assédio ou preocupações éticas.
                </p>
                <ul className="space-y-4 text-white/80">
                  {['Garantia de não-retaliação', 'Protocolo criptografado', 'Análise por comitê independente'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-2xl">check_circle</span>
                      <span className="font-bold tracking-tight text-sm uppercase">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-surface p-10 rounded-2xl shadow-2xl">
                  <h3 className="text-primary font-bold mb-8 uppercase tracking-widest text-[10px] border-b border-outline-variant pb-4">Acessar Canal Seguro</h3>
                  <div className="space-y-4">
                    <button className="w-full p-6 border border-outline-variant/20 rounded-xl flex justify-between items-center group hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="font-bold text-lg font-headline">Relatar Incidente</span>
                      <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <button className="w-full p-6 border border-outline-variant/20 rounded-xl flex justify-between items-center group hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="font-bold text-lg font-headline">Acompanhar Denúncia</span>
                      <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <div className="mt-10 pt-6 text-center border-t border-outline-variant/10">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-[0.2em]">Telefone Externo: 0800-PAISA-SEC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biblioteca de Bem-Estar Section */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 tracking-tight">Biblioteca de Bem-Estar</h2>
              <p className="text-on-surface-variant text-lg">Conteúdo selecionado para você acessar no seu tempo.</p>
            </div>
            <a href="#" className="text-secondary font-bold flex items-center gap-3 hover:translate-x-2 transition-all p-2 rounded-lg hover:bg-secondary/5">
              Ver todos os recursos <span className="material-symbols-outlined">trending_flat</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Meditações Guiadas', 
                desc: 'Séries de áudio para redução de ansiedade e foco, narradas por especialistas.', 
                tag: 'Áudio • 15 min',
                icon: 'play_circle',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdqrh19Pb1vNSmwNBTf5xQbXa683JvsSNW5uIzZcBp0OCQ4_spjje4d5uzkXHOYjGp7M9xsMpywiC_4JncF3_nQqvI49IkGsw-6HTzg3lcatLcFDDRmIZ-Awm3NQ5zr7WiVTjOahRr9YcgJyTNEItrG75_QYcUe3g8plBsBfgdu8gY2NCgY55niR3fZkCY9SpwcQkYJFInSep3D3PHtpAQQxvXqMITi11m0ZbC55BPdFssrx3JivXX_YDUQlsDsJ2vOr5nPCSfdBlk'
              },
              { 
                title: 'Manual de Higiene do Sono', 
                desc: 'Dicas práticas para transformar suas noites de sono e acordar com mais energia.', 
                tag: 'PDF • 12 Págs',
                icon: 'description',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmmd-RdoCnMm-BD3-qoz3-Pi88BBIbYGd8KBXwsC9moJIrk65BcPFp8aipL9ZG8QekyvG0U37p_0NmOQGnDPDpsgxi6_EihjsS6JSU6ebcc-wCsczPspUu2CVZmrj_bHhR5BlHMU03tFMc35UzfHPO4teKc3zvQLvd3dvxCzIObjqil5EoVeJ71wsgI2zHUsoiffk4eygtk5TagrWa4Rja5JJ7oXiuaVn68qoEG7GrktRkbYNuXTYJ0MIxDlCMi_rUiaR9S4GYiRz3'
              },
              { 
                title: 'Gestão de Ansiedade', 
                desc: 'E-book completo com ferramentas cognitivas para lidar com pressões diárias.', 
                tag: 'E-book • Completo',
                icon: 'menu_book',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNQWkZjt3iLUZsDMLD81xCQ20Yp6Mtz97jwALXlxGlZ1UbeyLi8G6sWalakwOHe9ycu_7QdhchjsrFtp14F8lJS-YdXisKka2jkkydZqzPrhO7l5G5ojD_llITFv9ylKDhTEu44i2GCDiHI8hF5K_qph-9VFNvHZi8PFIuSEHOpScWAOEFsjEMcOq8A1Vk_XUbNJ5iQoX6b3HC5XHfhV9KB2HOnUiyKEKvcGJ7Y9ebzqJkFQ4e0W7XoRA97HO3pDdkTh5mkZxtSyai'
              }
            ].map((resource, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-2xl mb-8 relative shadow-lg">
                  <img src={resource.img} alt={resource.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="material-symbols-outlined text-white text-[80px]">{resource.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-headline text-primary mb-3">{resource.title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">{resource.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary py-2 px-4 bg-secondary/5 rounded-full">{resource.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-surface-container-low">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6 tracking-tight">Dúvidas Frequentes</h2>
            <p className="text-on-surface-variant text-lg">Tudo o que você precisa saber sobre o nosso suporte psicológico.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'É realmente confidencial?', a: 'Sim, 100%. O sigilo profissional é garantido pelo Código de Ética do Psicólogo. Nenhuma informação pessoal ou conteúdo das sessões é compartilhado com a empresa ou gestores.' },
              { q: 'Como faço para agendar uma sessão?', a: 'Você pode agendar diretamente pelo portal interno do colaborador ou através do WhatsApp dedicado da nossa equipe de psicologia. O processo é simples e rápido.' },
              { q: 'Tem custo para o colaborador?', a: 'Não. O programa de apoio psicológico é um benefício integralmente subsidiado pela USINA PAISA para todos os funcionários e seus dependentes diretos.' },
              { q: 'E se eu precisar de atendimento emergencial?', a: 'Possuímos um canal de emergência 24/7 disponível por telefone. Em casos de crise aguda, nossa equipe está pronta para o primeiro acolhimento e encaminhamento imediato.' }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl border border-outline-variant/10 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <summary className="flex justify-between items-center p-8 cursor-pointer select-none">
                  <span className="font-bold text-lg font-headline text-primary">{faq.q}</span>
                  <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-8 pb-8 text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid: Dicas Section */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4 tracking-tight">Dicas de Bem-Estar</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl">Pequenas mudanças diárias que transformam sua saúde mental e física a longo prazo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto lg:h-[700px]">
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl group shadow-xl">
              <img 
                alt="Equilíbrio Vida-Trabalho" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteWCQxVYr0ognC84Q60UnySb7s0d7uPSTpzcmChYnq-drRpLGvNvpLFE2-MlLweJEn53CduRPUOSQcswX38ZJbpK3R7AtdhoJbM09oYnKgBkkG4u7hsKf_OMHpNbq9Y4brbm2RFFpsAdDMyBovkV-m3UBUwmDxLjogxHeqo4QPMeNuSGltuYmH3s2trwwd2pgPqKvv6QQakSMW5u5ZbITLpLizBSVZIf265Zyw-VjdEoeGDy-6b321DLIldfBtRQpVzm4soDE3KXg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-bold font-headline text-white mb-4">Equilíbrio Vida-Trabalho</h3>
                <p className="text-white/80 text-lg leading-relaxed">Aprenda a desconectar digitalmente após o expediente para reconectar com quem você ama.</p>
              </div>
            </div>
            <div className="md:col-span-2 bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 flex flex-col justify-center hover:bg-secondary-container transition-all group shadow-sm hover:shadow-xl group">
              <div className="flex items-center gap-6 mb-6">
                <span className="material-symbols-outlined text-secondary text-5xl group-hover:rotate-12 transition-transform">air</span>
                <h3 className="text-2xl font-bold font-headline text-primary">Técnica 4-7-8</h3>
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">Inspire por 4 segundos, segure por 7 e expire por 8. Uma ferramenta poderosa contra a ansiedade imediata.</p>
            </div>
            <div className="bg-primary text-white p-10 rounded-3xl flex flex-col justify-center items-center text-center group transition-all duration-500 hover:bg-secondary shadow-lg">
              <span className="material-symbols-outlined text-5xl mb-6 text-secondary group-hover:text-white transition-colors">local_drink</span>
              <h3 className="text-xl font-bold font-headline mb-2">Hidratação Vital</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">2L/Dia Mínimo</p>
            </div>
            <div className="bg-surface-container-highest p-10 rounded-3xl flex flex-col justify-center items-center text-center group border border-outline-variant/20 hover:border-secondary transition-all shadow-sm">
              <span className="material-symbols-outlined text-5xl mb-6 text-primary group-hover:scale-110 transition-transform">bedtime</span>
              <h3 className="text-xl font-bold font-headline text-primary mb-2">Higiene do Sono</h3>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em]">7-9 Horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-surface-container-high">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-8 tracking-tight">Ainda tem alguma dúvida?</h2>
          <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Nossa equipe de Recursos Humanos e Psicologia está sempre aberta para ouvir e ajudar você.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:psicologia@usinapaisa.com.br" className="flex items-center gap-4 bg-primary-container text-white px-10 py-5 rounded-xl font-bold hover:bg-secondary transition-all shadow-xl hover:-translate-y-1 group">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">mail</span>
              Enviar E-mail
            </a>
            <a href="tel:0800123456" className="flex items-center gap-4 border-2 border-primary-container text-primary-container px-10 py-5 rounded-xl font-bold hover:bg-primary-container hover:text-white transition-all shadow-xl group hover:-translate-y-1">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">call</span>
              Ligar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
