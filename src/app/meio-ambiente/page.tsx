'use client';

import React from 'react';

export default function MeioAmbiente() {
  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[870px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Sugarcane fields" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBleUr-rIlHlVgoywj1OnqANcyTF06yqKLBjEHQ49APuWIY4l544Ih_FJiixM_kLYc2S6Q_iTVy7yLQcp0cAftrpgrNCsUxw_ANUXTRyzOEQ8NshuvBuoQCXe9968PSu4Li9D0CEtgGM5ABV7wVft3nsSq7vTm73-AqSg-tG5Na5ToRoDmIXW6ia-n_U7SAN6tJjsWSgVOO14_weu-yZTVcAlqiUdk17Axhi11tDCpIRSlVa3_nGCxBRMUUQlxU0ZZ5UaJqrdmJQHJK"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl bg-[#E1E3E2]/60 backdrop-blur-[20px] p-12 rounded-xl border border-white/10">
            <span className="text-secondary-fixed font-headline font-bold tracking-widest text-sm mb-4 block">ECOSSISTEMA DE PRECISÃO</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter mb-6">
              Compromisso com o Planeta: <span className="text-secondary-fixed">Sustentabilidade que Floresce</span>
            </h1>
            <p className="text-on-primary-fixed-variant text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Integramos a tecnologia industrial de ponta com a preservação ambiental, criando um ciclo vital de regeneração e produtividade consciente.
            </p>
            <a href="#relatorio" className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-lg font-bold hover:bg-on-secondary-container transition-all group">
              CONHECER NOSSAS AÇÕES
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Economia Circular: Bento Grid */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Economia Circular</h2>
            <div className="h-1 w-24 bg-secondary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Input */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between group hover:bg-primary-container transition-colors duration-500">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:text-secondary-fixed">agriculture</span>
                <h3 className="text-2xl font-bold font-headline mb-4 group-hover:text-white">Plantio Inteligente</h3>
                <p className="text-on-surface-variant group-hover:text-on-primary-container">Utilização de biotecnologia e monitoramento via satélite para maximizar a saúde do solo sem esgotar recursos.</p>
              </div>
              <div className="mt-8 text-secondary font-bold font-headline text-sm tracking-widest">ETAPA 01</div>
            </div>
            {/* Column 2: Process (The Heart) */}
            <div className="md:col-span-1 bg-primary-container p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>factory</span>
                <h3 className="text-2xl font-bold font-headline mb-4 text-white">Resíduo Zero</h3>
                <ul className="space-y-4 text-on-primary-container">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary-fixed">bolt</span>
                    <span><strong>Bagaço:</strong> 100% convertido em bioenergia para a usina.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary-fixed">water_drop</span>
                    <span><strong>Vinhaça:</strong> Fertirrigação orgânica rica em potássio.</span>
                  </li>
                </ul>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[200px]">sync</span>
              </div>
            </div>
            {/* Column 3: Output */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between group hover:bg-secondary transition-colors duration-500">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:text-white">energy_savings_leaf</span>
                <h3 className="text-2xl font-bold font-headline mb-4 group-hover:text-white">Renovação Energética</h3>
                <p className="text-on-surface-variant group-hover:text-white/80">O excedente de energia limpa é injetado na rede nacional, abastecendo milhares de residências.</p>
              </div>
              <div className="mt-8 text-secondary font-bold font-headline text-sm tracking-widest group-hover:text-white">ETAPA 03</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gestão Hídrica e Solo: Asymmetric Layout */}
      <section className="py-24 bg-surface-container overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div 
                className="bg-primary-fixed-dim aspect-square overflow-hidden"
                style={{ clipPath: "polygon(0% 15%, 100% 0%, 100% 85%, 0% 100%)" }}
              >
                <img 
                  alt="Irrigation technology" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2L5cX4i9QGHP-RSZwwJ5CYUVxx38dVgKbkiRAnBP_FifYyFLT4WlXspGYM502dEAh_4T42F7gPlFodVvxFdMQsQe0iJdn-_p0UjZ-ORgXeJ3n89xFUfdwa4ukBwLZ5FRuUP0aOcXrzrX8Z_gfVSq45D1u40HANPgPhbNQN2su_Us3r3Yn0ai-UMr-G0h6M06_Z1okcOznI_jrsFTjD_68Nv6o3C3tZ5eleCtFvZmbJ22NG7Lg1dN2x6KAeE-VPMOPryY1SHIRy_vW"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-12 shadow-2xl rounded-lg">
                <div className="text-primary font-headline text-6xl font-bold">95%</div>
                <div className="text-on-surface-variant font-bold tracking-widest text-xs uppercase">Reuso de Água</div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="font-headline text-4xl font-bold text-primary">Gestão Hídrica e Vitalidade do Solo</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Tratamos cada gota de água como um recurso sagrado. Nossos sistemas de circuito fechado garantem que quase a totalidade da água industrial seja reciclada, minimizando a captação de fontes naturais.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-4 border-secondary pl-6 py-2">
                  <h4 className="font-headline font-bold text-primary mb-2">100% Orgânico</h4>
                  <p className="text-sm text-on-surface-variant">Fertilização baseada em subprodutos do processo industrial, eliminando químicos sintéticos.</p>
                </div>
                <div className="border-l-4 border-secondary pl-6 py-2">
                  <h4 className="font-headline font-bold text-primary mb-2">Monitoramento 24/7</h4>
                  <p className="text-sm text-on-surface-variant">Sensores de umidade e nutrientes garantem a aplicação precisa apenas onde é necessário.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preservação da Biodiversidade */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-secondary-fixed font-headline font-bold tracking-widest text-sm mb-4 block uppercase font-label">Patrimônio Natural</span>
              <h2 className="font-headline text-4xl font-bold mb-8">Preservação da Biodiversidade e Monitoramento de Fauna</h2>
              <p className="text-on-primary-container text-lg mb-8 leading-relaxed">
                Mantemos milhares de hectares de mata nativa intocada, servindo como corredores ecológicos para a fauna regional. Nosso programa de monitoramento já identificou centenas de espécies nativas que prosperam em harmonia com nossa operação.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-headline font-bold text-secondary-fixed">4.2k+</span>
                  <span className="text-xs uppercase tracking-widest text-on-primary-container">Hectares Protegidos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-headline font-bold text-secondary-fixed">120</span>
                  <span className="text-xs uppercase tracking-widest text-on-primary-container">Espécies Catalogadas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-headline font-bold text-secondary-fixed">15</span>
                  <span className="text-xs uppercase tracking-widest text-on-primary-container">Corredores Ecológicos</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  alt="Forest detail" 
                  className="w-full h-64 object-cover rounded-lg" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2nidEFEMvn7Jam1jmGWLSTCX-K6neO_sDsnbAE5fylfGBFfaQL3b-WVg3DIKl7i0hs0BNdNnV8XUyFpJTsmRNN0whCKFoCh0ppq08ImrU-Y5iWj42pG-ZQpNOnOLHRTo4mY50Pyio0unKtCEKERApr_i0_ybLuVGa6w8Qa3UzfLeNODB_x6c9nNsboiGCxXWUd6STMwnpktL4F4WM0QOqVUCQMAUzqsRG467U_P0M3752h0Bd35IXGAorgR0qtzQXSOSR0PxloBvI"
                />
                <img 
                  alt="Sugarcane rows" 
                  className="w-full h-48 object-cover rounded-lg" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAahhO1IQLK1aLAfXxADqcsHzkyfLlSLzE09AM6rzpV7czft_xYyBJk3HPeWPikqS1m1OpE4uYzvstSn9rLrA37WsZGVfi3znaxXC4pHC3tNaGp_V9hszYrVzGkESuClQ0LIBJVSlPZIVv_87Ght_qxiaBWUoxXbInX8vyKgfS5bWN4I_NmHu85gXqDuxBiddxGW_TF6Mj_cLFrQdcF7Lk1UFXFHYCnT195e5QQeRZ6OkEDlRcBtKVKMyxMntJV1EpN8CY3Ye2705aq"
                />
              </div>
              <div className="pt-12 space-y-4">
                <img 
                  alt="Wild bird" 
                  className="w-full h-80 object-cover rounded-lg" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3bq6mwAGSh7wi9gRmy74nmaIY58lmPkrL4Y1GCtXJduScKqby9J6JCvtJ7gYOx9tA0Roe6uP0Vsl_jc0rPDksZDmrPPJDGsPf8PzBkD8cQn0_zvyMO_zs81M7O_mAy__WoABtsde3lEXcMLcFRlQDla3lD0oNKmmZa09UkFft8tuSPunHmjU8Xz_AE72cgD5Srj7g40HCzhOi0UUkGUsMabgGJxJxb4Klpu8zzS5i4e9LiNWtYOD7rQ8L3ic477SP-joWjIzCimRY"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificações ESG */}
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-8 text-center">
          <h2 className="font-headline text-3xl font-bold text-primary mb-12">Excelência Certificada</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale hover:grayscale-0 transition-all duration-700 opacity-70">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-secondary">verified</span>
              </div>
              <span className="font-bold text-sm tracking-widest text-primary">BONSUCRO</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-secondary">task_alt</span>
              </div>
              <span className="font-bold text-sm tracking-widest text-primary">ISO 14001</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-secondary">energy_savings_leaf</span>
              </div>
              <span className="font-bold text-sm tracking-widest text-primary">RENOVABIO</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl text-secondary">shield_with_heart</span>
              </div>
              <span className="font-bold text-sm tracking-widest text-primary">ESG GOLD</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" id="relatorio">
        <div className="container mx-auto px-8">
          <div className="bg-primary-container rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <img 
                alt="Landscape" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSTMRbPVSr5nq3cysHxkv2aCEzIKcbiC2bQNJyHJKBAeNQkv-xTrpX8Bq1VHuT6Jr9KoN7PZKpOztk-WhufPKAMbYe1oJx4zIagAxA_WHVF6rti1PwxBfqkm7knGi2_8NasJQ-XVDq2_AopFDHa3aHiyK-ICspEENjijD6guwfmPDtJvceDi6USaaipFiQ-dTNARrYl-4WQsaIPw5mhZdl7sfIoTRJ3KgQXaTuBoiXIcD1RT-ebslB_KHKIfL_C8DcPiHxEz0FgnyV"
              />
            </div>
            <div className="relative z-10 px-12 py-20 text-center max-w-4xl mx-auto">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 uppercase italic tracking-tighter">Transparência em Cada Colheita</h2>
              <p className="text-on-primary-container text-xl mb-12">
                Acompanhe em detalhes nossas métricas, metas e o impacto real gerado por nossas iniciativas ambientais no último ano.
              </p>
              
              <SustainabilityButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SustainabilityButton() {
  const [reportUrl, setReportUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/settings/sustentabilidade')
      .then(res => res.json())
      .then(data => {
        setReportUrl(data.reportUrl);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 text-white/50 text-sm font-bold uppercase tracking-widest">
        <Loader2 className="animate-spin" size={20} />
        Carregando Relatório...
      </div>
    );
  }

  if (!reportUrl) return null;

  return (
    <a 
      href={reportUrl}
      target="_blank"
      className="bg-secondary text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-on-secondary-container transition-all flex items-center gap-4 mx-auto group w-fit"
    >
      Acesse nosso Relatório de Sustentabilidade 2024
      <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
    </a>
  );
}

function Loader2({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
