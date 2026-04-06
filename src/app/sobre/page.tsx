'use client';

import React from 'react';
import { ArrowRight, Leaf, Settings, Users, Download, Info, Home, Factory, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="relative h-[870px] w-full overflow-hidden flex items-center px-8 md:px-16">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale brightness-50" 
            alt="Máquinas agrícolas em campo de cana" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6jK_3Dol2eCCKyocfVDSlYRORHHHJcm0BwlIQ-jI6U2L9eFgKkdNT7zpqPW1-JYWe3dp_dlmj463-x4gYzWcWbv6-YzBI_TO_xaIhZr1RViumkeBssO7Hh6d-BLa2SwfuaZllTdKgH27pmxfoeSTKYPvT-xAAGA_I5LELGZO-04k9HeplydmWesW4VM0phooGqmf0-luOG1oJ6QpJP2QIne2qzHTEwtYDKA3X0NkMl4dba9w1hSlEXBq8w3RhBHXnR5cKxfUbUrKa" 
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto w-full lg:ml-0">
          <div className="bg-white/60 backdrop-blur-md p-10 md:p-16 border-l-4 border-emerald-600">
            <span className="text-emerald-700 font-bold tracking-widest uppercase text-sm block mb-4">Sobre Nós</span>
            <h1 className="text-emerald-950 font-headline text-5xl md:text-7xl font-black leading-none mb-6 tracking-tighter uppercase italic">
              O Organicismo <br/>Industrial.
            </h1>
            <p className="text-slate-800 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              Na USINA PAISA, transformamos a força bruta da colheita na precisão da energia renovável. Somos a síntese entre o ciclo biológico da terra e o rigor matemático da indústria.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#0e2f22] text-white px-8 py-4 font-bold text-sm uppercase transition-all hover:bg-emerald-700 flex items-center gap-2">
                Conheça o Manifesto
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* History Section (Timeline) */}
      <section className="py-24 px-8 md:px-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-emerald-950 font-headline text-4xl font-black mb-4 uppercase italic">Evolução do Ecossistema</h2>
            <div className="h-1 w-24 bg-emerald-600"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-slate-200 -z-0"></div>
            
            {/* Year 1994 */}
            <div className="space-y-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#0e2f22] flex items-center justify-center text-emerald-100 font-headline font-black text-xl border-4 border-slate-50">1994</div>
              <h3 className="text-2xl font-headline font-bold text-emerald-950 italic">As Raízes</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Fundação como uma unidade agrícola familiar, focada na pureza do cultivo e no respeito ao solo da região central.</p>
              <img 
                className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" 
                alt="Histórico agrícola" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH2W39uNeFnrtIEBAvfTApdFslD2rzDZRRn11yUCaflIqgAIqxB1-ccniOT8RFJz5s-L1iPIgawSSzQhHlgeC5LnR12qhh43rcWH87oDHTZz1EBdgHFDkGzBv7kCAOtmepP5CpJrOF8W-IwdvOCfauPpCHwICAWXgdgECZVgfVeTE7nSL6Le4ab5lg5WOqD9zn_AIyfzco04qtax5_D7-WIYVq5eIFr24iAYH9A0cMjAzD9O-xpW886aP1kgkxMAWqsMn0CiKLmotu" 
              />
            </div>

            {/* Year 2012 */}
            <div className="space-y-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white font-headline font-black text-xl border-4 border-slate-50">2012</div>
              <h3 className="text-2xl font-headline font-bold text-emerald-950 italic">A Transição</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Implementação da primeira fase de automação. Início da transição para o modelo de biorrefinaria de alta precisão.</p>
              <img 
                className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" 
                alt="Expansão industrial" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIGhJ1OG-QyM6oFZqwn1gSzSFK5Y8PNK5-HnaC3rs2ZqFuYuTcKcTSojE753S19psblbYD9YDZyfgOFzzDnL6sEaV9FuDyzjdaxk1g42xHbYIsLwIMOrJzmcHQ_TEWpEpGnp8XO9Qndapqc9xPev2vwfp4LkIXQSNctethIBtkRiFJlLE_yzm791Zomgt0Qi9ydwtZ2mm1rj8q9yTUCQOqBz39UC4BaqJqqU3ElNdwUoKnEXP3h1U72aFuJR9coDM5pVA8bwOH3fd9" 
              />
            </div>

            {/* Year 2024 */}
            <div className="space-y-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-100 font-headline font-black text-xl border-4 border-slate-50">2024</div>
              <h3 className="text-2xl font-headline font-bold text-emerald-950 italic">Ecossistema PAISA</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Referência global em agricultura regenerativa e IA industrial, operando com resíduo zero e impacto positivo.</p>
              <img 
                className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" 
                alt="Tecnologia atual" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAmtSfr_ksc4hCvMJ-A2ndhmqxYM3X8xo1sdkZzYzmx4kg1gp2rPO2GBidH_n3GJbNX0m0cn9mhamM_lUUw4IGHAxp_TwfQUOcoHlh80EPC7dHSApRAxV5owR7Ig6YSaGYlV7-dAeVovrlP9PlHl7iJjnKYhek_DzMZmZiXuxXf8UexxS8UdcArTlNWLrFegbsFYjn3xZAV29O4bOS3-h1UIYAh-7HNH4NN4W1jvpfJcwLKknTKrdyR7jOBZx2ny3gJzgFu67fp_NW" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-32 px-8 md:px-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -z-10"></div>
            <img 
              className="w-full aspect-[4/5] object-cover rounded-lg shadow-2xl skew-x-[-2deg]" 
              alt="Natureza e Precisão" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJjh-Pvu1OGFqs5-0C-a6pNJIQWKGoX95QTK6CcfzRnlqWyb_rI7BdxgkYKl6Oqazfr4u8FYZpL5Qj2v-fRJ63lDQ_98mMXX-VV_RkPMcKhM9sJZtqQ42ZZYsvsvkRz7SKR-Q6KQQMajKivx-adv7G9S02xsK49CGZmv4kfMGkSgES5_o6qvp-bffX7EaBndTvzuHTZoHXxDbAZU8bSUy7IMGMVIcHk_yJFWimlhb9punFGMubRFTGO9ZWPEbLL3xV_ozMl6gpc9u1" 
            />
          </div>
          <div className="w-full md:w-1/2 space-y-12">
            <div className="space-y-4">
              <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">Nossa Filosofia</span>
              <h2 className="text-emerald-950 font-headline text-4xl md:text-5xl font-black leading-tight uppercase italic">Precisão que <span className="text-emerald-600">floresce.</span></h2>
              <p className="text-slate-600 text-lg">Acreditamos que a tecnologia não deve domar a natureza, mas sim amplificar seu potencial através da compreensão profunda.</p>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {[
                { icon: Leaf, title: 'Regeneração Ativa', desc: 'Não buscamos apenas reduzir danos, mas regenerar ativamente o bioma onde operamos.' },
                { icon: Settings, title: 'Rigor Analítico', desc: 'Cada gota de etanol e cada quilowatt é rastreado por dados de precisão milimétrica.' },
                { icon: Users, title: 'Capital Humano', desc: 'Tecnologia é ferramenta; pessoas são o motor criativo da USINA PAISA.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xl text-emerald-950 uppercase italic">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 px-8 md:px-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-emerald-950 font-headline text-5xl font-black uppercase italic">Liderança <span className="text-emerald-600">Estratégica</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Mentes brilhantes unidas pelo propósito de redefinir o setor energético brasileiro.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ricardo Alencastro', role: 'CEO & Fundador', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtctpdsSyMi5d26qhlkSMI6arwXvF5swwXUsUP7-r-5K7JX--v1Y0KzSzuMOa__liGzn0n52SKWOaD3_l3IKbJ-C1mQEE0yU0UvF6ibwePvTgj3SjvOrj3L-LhiuuFUBwHsLGHrr0378g3kWhRDE0iV7es4nE65ggJMVPGf3vSeH2wNam0KxlIfS_uJRiaQo38x22a-zy-kDJJqOioDCsjL-3fmcvpJmgGldzbLpnTCq3Jt7XU7LzGWm5CLct-H619F0ZmX2n4WayX' },
              { name: 'Dra. Beatriz Mendes', role: 'Diretora de Sustentabilidade', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjITpQqlp38Fx5ypo-o2cJrn-QzyLEKjT0cVSwTvG6mRx1fgqIHvuNcLJ_QpCRZ_t9sd_Pm2YNTCYwE11ORS3ZkxA0sNr004hn86I_KlvJxzWPvdGyLeU61DnfYDAKaRAXn4dNuEbNe7GhxUn7uZEqyPv8Nh1kYYh2VcYeZ4emkfTYaE0Ok1TyopsyPjonpfzvBM2-N7J3lZ9HrT6FYQaQkL9PsieykCToXaX29q9WN0gRLwLkh2hTaaZexNacUkjawd4SaMRou9xO' },
              { name: 'Eng. Marcus Viana', role: 'Diretor de Operações', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm5-itvhf-dNMB0xGFCwsrxwowLX425q8JJ4XHZGzRhDUaKRuSR4w-HuS1jwrX1XshnzoUiCvLsoFSwZY9qfNaVqOfrwc3XeP_npZvCpeiBhWh0UySige8fDvy-F1iUrQZS_aZBYKfxJwYqZlGdyy-Twrar18yKmRpijGHtrpeiwXdxMU5V0dV9NF9kiq5nHi7pwUNhH5r1wGhjO-67KdyJoc-TRCwCEac0oBbPm7qiDSQWgx348c5zf5VP93bsvOx5BhSbjbmpZdL' },
              { name: 'Helena Costa', role: 'Diretora de Tecnologia', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw-pmsuhoxdvZBll5T7iH8_-J0YYZETCCCp43pVEyT1qIXvhutKmjtcsqtUzF36L93XglDUKSVQhfElJlYOaw7MtrLdaIGEWCC7NNoaIaIgz1E_iBphbr94gIu9QXdgwek7PD-CGUTGkBqbnfpkwWt0ceNSSBh36T_CTUqVJCnUwbd7NM2-CK30QGtt1Tin4Kq6aTLRflkgLy14mH56V7MWR38RLr_bnMr6fLDOLMwFAF82_NTe6tmKsa4-3H4gJerH3gS9KLKM7oJ' },
            ].map((leader, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all">
                <img 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  alt={leader.name} 
                  src={leader.img} 
                />
                <div className="p-6">
                  <h4 className="font-headline font-bold text-lg text-emerald-950 uppercase italic">{leader.name}</h4>
                  <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 md:px-16 bg-[#0e2f22] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
            Pronto para o próximo <br/><span className="text-emerald-400">ciclo de crescimento?</span>
          </h2>
          <p className="text-emerald-100/60 text-lg md:text-xl max-w-2xl mx-auto">
            Explore nossos relatórios de impacto ou junte-se ao time que está construindo o futuro da energia renovável no Brasil.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="w-full md:w-auto bg-emerald-600 text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
              Relatório ESG 2024
              <Download size={20} />
            </button>
            <button className="w-full md:w-auto border border-white/20 px-10 py-5 font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
              Trabalhe Conosco
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-around items-center h-16 z-50 border-t border-slate-100 shadow-2xl">
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-400">
          <Home size={20} />
          <span className="text-[9px] font-bold uppercase">Início</span>
        </Link>
        <Link href="/sobre" className="flex flex-col items-center gap-1 text-emerald-600">
          <Info size={20} />
          <span className="text-[9px] font-bold uppercase">Sobre</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Factory size={20} />
          <span className="text-[9px] font-bold uppercase">Usina</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Mail size={20} />
          <span className="text-[9px] font-bold uppercase">Contato</span>
        </button>
      </nav>
    </div>
  );
}
