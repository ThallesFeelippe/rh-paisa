'use client';

import React from 'react';

export default function JovemAprendiz() {
  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero Section */}
      <header className="relative min-h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Young professionals in tech lab" 
            className="w-full h-full object-cover grayscale-[0.2]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-vULxP7Oiz1Y6Nn5t0KtKSM6eLR0GpLyLNOhDuGntSn2uuCZVYfegyUVtrwJMGzhyZFYAjgvnafF4IJrt0nYWdL5EO7xSJih_qXf1I3z0uj8FdMLmBPtpqNnGJM3UHogVjcAgewkTEmi_jWOCcHnQ_3Yl8Ymu0LnrvQV74ONMyJxLe1je0e6zu1ZJh9jN30_8kFPgqxtK2tMe2fMN_Jl3uKzJU-qPDlFWDn31eNKbmyac3qw9TQsNMxtKy-nrW2CmUFBOSil3Vzz"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-2xl bg-[#E1E3E2]/60 backdrop-blur-[16px] p-10 md:p-12 rounded-xl border border-white/10 shadow-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block font-label">Futuro e Inovação</span>
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-primary leading-tight mb-6 tracking-tighter">
              Seu Futuro Começa Aqui
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl mb-8 leading-relaxed">
              Transforme sua curiosidade em carreira. Unimos a força do campo com a precisão da tecnologia para formar os líderes do amanhã.
            </p>
            <div className="flex gap-4">
              <a 
                href="#vagas" 
                className="bg-primary-container text-on-primary px-8 py-4 rounded-lg font-bold hover:bg-secondary transition-all flex items-center gap-3 group"
              >
                Ver Vagas Abertas
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sobre o Programa */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-8 tracking-tight">O Compromisso com sua Evolução</h2>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
                <p>Na USINA PAISA, acreditamos que a renovação é a chave para a sustentabilidade. Nosso Programa Jovem Aprendiz não é apenas uma vaga de emprego; é um ecossistema de aprendizado técnico e humano.</p>
                <p>Aqui, você terá contato direto com tecnologias de ponta na indústria sucroenergética, sendo mentorado por profissionais que são referência no mercado nacional.</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div 
                className="bg-primary-fixed-dim aspect-[4/3] w-full relative overflow-hidden"
                style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)' }}
              >
                <img 
                  alt="Student learning" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD0n-xgXla53bnnj1ksVfLDhnk6KwAnDoKydytQpgoCz1qxDQSOx-kFdTRJMJgGksHH6k7cftOZkQc2ahC_1XcgbdrY2uTazU9sGxfW6ZRC2ZPaPlFwmlw97RhzP6fH_23TrJONoculD4Qe0hKllMTc8JB2Too8StnsSZZJ47TQYiBh4-FnXQUTUiy2du6Uk9URMFbLo7fBrquRb2wP9oU0tytHQ_m13H5vLVPGMgYmVwv879i8dl8Q_ymndCYhYapJlP3g194kZd_"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-8 shadow-2xl max-w-xs border-l-4 border-secondary rounded-r-lg">
                <p className="text-secondary font-bold text-4xl font-headline mb-1">100%</p>
                <p className="text-on-surface-variant font-bold text-sm tracking-tight">Foco em desenvolvimento técnico e prático.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos e Benefícios (Bento Grid Style) */}
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-headline text-primary tracking-tight">O que você precisa & O que oferecemos</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Requisito 1 */}
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div>
                <span className="material-symbols-outlined text-secondary text-5xl mb-6 group-hover:scale-110 transition-transform block">calendar_today</span>
                <h3 className="text-2xl font-bold font-headline text-primary mb-4">Idade Permitida</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">Jovens talentos entre 18 e 24 anos incompletos que buscam a primeira oportunidade profissional.</p>
              </div>
              <div className="mt-8 text-xs font-bold tracking-widest text-secondary-fixed-dim uppercase">REQUISITO 01</div>
            </div>
            {/* Requisito 2 */}
            <div className="md:col-span-2 bg-primary-container text-on-primary p-10 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-secondary-fixed text-5xl mb-6 group-hover:rotate-12 transition-transform block">school</span>
                <h3 className="text-2xl font-bold font-headline mb-4">Escolaridade</h3>
                <p className="text-on-primary-container text-lg leading-relaxed">Ensino Médio completo ou cursando. Valorizamos o compromisso com os estudos e a vontade de aprender.</p>
              </div>
              <div className="mt-8 text-xs font-bold tracking-widest text-secondary uppercase relative z-10">REQUISITO 02</div>
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[150px]">workspace_premium</span>
              </div>
            </div>
            
            {/* Benefício 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/5 shadow-sm hover:border-secondary/30 transition-all group">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:translate-x-1 transition-transform block">schedule</span>
              <h4 className="font-bold font-headline text-primary text-xl mb-3">Carga Horária</h4>
              <p className="text-on-surface-variant leading-relaxed">4 a 6 horas diárias, respeitando sua jornada de estudos.</p>
            </div>
            {/* Benefício 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/5 shadow-sm hover:border-secondary/30 transition-all group">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:translate-x-1 transition-transform block">directions_bus</span>
              <h4 className="font-bold font-headline text-primary text-xl mb-3">Vale-Transporte</h4>
              <p className="text-on-surface-variant leading-relaxed">Auxílio para o seu deslocamento diário até a usina.</p>
            </div>
            {/* Benefício 3 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/5 shadow-sm hover:border-secondary/30 transition-all group">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:translate-x-1 transition-transform block">engineering</span>
              <h4 className="font-bold font-headline text-primary text-xl mb-3">Curso Técnico</h4>
              <p className="text-on-surface-variant leading-relaxed">Qualificação profissional gratuita em instituições parceiras.</p>
            </div>
            {/* Benefício 4 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/5 shadow-sm hover:border-secondary/30 transition-all group">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:translate-x-1 transition-transform block">payments</span>
              <h4 className="font-bold font-headline text-primary text-xl mb-3">Bolsa Auxílio</h4>
              <p className="text-on-surface-variant leading-relaxed">Remuneração compatível com o mercado para o seu desenvolvimento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banco de Talentos */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row bg-primary-container rounded-3xl overflow-hidden shadow-2xl">
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-bold font-headline text-white mb-6 tracking-tight">Não encontrou a vaga certa hoje?</h2>
              <p className="text-on-primary-container text-lg mb-10 leading-relaxed">
                Seu talento é valioso para nós. Cadastre seu currículo em nosso Banco de Talentos e seja o primeiro a ser avisado quando novas oportunidades surgirem.
              </p>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-secondary font-bold uppercase tracking-widest pl-1">Nome Completo</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-secondary transition-all outline-none placeholder:text-white/20" 
                    placeholder="Seu nome"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-secondary font-bold uppercase tracking-widest pl-1">E-mail</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-secondary transition-all outline-none placeholder:text-white/20" 
                    placeholder="exemplo@email.com"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-secondary font-bold uppercase tracking-widest pl-1">Telefone</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-secondary transition-all outline-none placeholder:text-white/20" 
                    placeholder="(00) 00000-0000"
                    type="tel"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-secondary font-bold uppercase tracking-widest pl-1">Área de Interesse</label>
                  <select className="bg-white/10 border border-white/10 rounded-xl p-4 text-white focus:border-secondary transition-all outline-none">
                    <option className="bg-primary-container">Manutenção Industrial</option>
                    <option className="bg-primary-container">Administrativo</option>
                    <option className="bg-primary-container">Operações Agrícolas</option>
                    <option className="bg-primary-container">Tecnologia da Informação</option>
                  </select>
                </div>
                <div className="md:col-span-2 pt-6">
                  <button className="w-full bg-secondary-fixed text-on-secondary-fixed py-5 font-bold rounded-xl hover:bg-secondary transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                    Cadastrar no Banco de Talentos
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/2 relative hidden lg:block">
              <img 
                alt="Young person working on computer" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsSndKMTXj2OhA-Aj43rnybZgviLgs8SDcoaXd5vCAn7OFvVrR1nIYKOiFNlsZlbQ2TMv-kz_K2qEFPbwJNMYp5Z7l7GZVlPJ-pMvvv0upHJ5Bbux4JmrhvBonvq8Qsseo6gdq2rVRAlaN7RUJNDUowVY9jlsbhFxifJKO3WMcLGLN9NgxYN5as-irGsH5TJp584ZIgsXGF1b4Pqm7S58AAhFzuZy14L_6s_VDGv5uK7zCZjm2PpyVYm_egd0iRSUUtTl7K-X8VxDM"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-primary-container/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center bg-surface-container-low border-t border-outline-variant/5" id="vagas">
        <div className="container mx-auto px-8 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-8 tracking-tighter">Pronto para dar o primeiro passo?</h2>
          <p className="text-on-surface-variant mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
            Nossa equipe está pronta para receber você. Clique abaixo para conferir as vagas disponíveis e iniciar sua história na USINA PAISA.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-4 bg-primary text-on-primary px-12 py-6 rounded-2xl font-bold text-xl hover:bg-secondary transition-all shadow-xl hover:-translate-y-1 group"
          >
            Ver Vagas Disponíveis
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">work</span>
          </a>
        </div>
      </section>
    </div>
  );
}
