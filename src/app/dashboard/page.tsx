'use client';

import React from 'react';
import { 
  Plus, 
  Download, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Newspaper, 
  Leaf, 
  Edit2, 
  Trash2, 
  Check, 
  ArrowUpRight 
} from 'lucide-react';

export default function DashboardOverview() {
  const kpis = [
    { 
      name: 'Vagas Abertas', 
      value: '42', 
      increment: '+12%', 
      icon: Briefcase, 
      color: 'bg-[#c7ebd7]', 
      textColor: 'text-[#006C48]',
      badgeColor: 'bg-[#92f7c3]' 
    },
    { 
      name: 'Novos Candidatos', 
      value: '158', 
      increment: 'ATIVO', 
      icon: Users, 
      color: 'bg-[#b2d414]', 
      textColor: 'text-[#121700]',
      badgeColor: 'bg-[#cdf139]' 
    },
    { 
      name: 'Notícias Publicadas', 
      value: '12', 
      increment: '---', 
      icon: Newspaper, 
      color: 'bg-[#92f7c3]', 
      textColor: 'text-[#00734d]',
      badgeColor: 'bg-[#cdf139]/20' 
    }
  ];

  const recentAssets = [
    { title: 'Engenheiro de Processos Jr.', status: 'Público', date: '12 Out, 2023', statusColor: 'bg-[#92f7c3] text-[#00734d]' },
    { title: 'Relatório de Sustentabilidade 2023', status: 'Rascunho', date: '10 Out, 2023', statusColor: 'bg-[#b2d414] text-[#121700]' },
    { title: 'Técnico em Automação Industrial', status: 'Público', date: '08 Out, 2023', statusColor: 'bg-[#92f7c3] text-[#00734d]' },
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2">Visão Geral da Usina</h2>
          <p className="text-[#414844] font-body">Monitoramento em tempo real do ecossistema produtivo e sustentável da Unidade Paisa.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#e1e3e2] px-4 py-2 rounded-lg text-xs font-bold font-headline hover:bg-[#e6e9e8] transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" /> EXPORTAR DADOS
          </button>
          <button className="bg-[#0e2f22] text-white px-6 py-2 rounded text-xs font-bold font-headline hover:bg-[#006C48] transition-all duration-300 shadow-xl shadow-[#0e2f22]/10">
            NOVA ATUALIZAÇÃO
          </button>
        </div>
      </section>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="bg-white p-6 rounded-xl border border-[#c1c8c2]/50 group hover:shadow-2xl hover:shadow-[#0e2f22]/5 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center ${kpi.textColor}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold font-headline ${kpi.textColor} ${kpi.badgeColor} px-2 py-1 rounded-full uppercase`}>
                {kpi.increment}
              </span>
            </div>
            <p className="text-[#414844] text-xs font-bold uppercase tracking-widest font-headline">{kpi.name}</p>
            <h3 className="text-4xl font-bold text-[#00190f] font-headline mt-1">{kpi.value}</h3>
          </div>
        ))}
        
        {/* CO2 Metric (The primary color card) */}
        <div className="bg-[#0e2f22] p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#006C48] flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[#ABCFBB]/70 text-xs font-bold uppercase tracking-widest font-headline">CO2 Reduzido</p>
            <h3 className="text-4xl font-bold text-white font-headline mt-1">842.5 <span className="text-sm font-normal">t</span></h3>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#006C48]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Management Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl p-8 border border-[#c1c8c2]/50 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h4 className="text-xl font-bold font-headline text-[#00190f] uppercase">Gerenciamento de Ativos</h4>
                <p className="text-xs text-[#414844]">Vagas e Publicações recentes no ecossistema.</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs font-bold font-headline py-2 px-4 rounded border border-[#c1c8c2] hover:bg-[#eceeed] transition-colors">VAGAS</button>
                <button className="text-xs font-bold font-headline py-2 px-4 rounded bg-[#e6e9e8] text-[#00190f]">NOTÍCIAS</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#e6e9e8]/50 font-headline text-[10px] tracking-widest uppercase text-[#414844]">
                    <th className="px-4 py-4 rounded-l-lg">Título do Ativo</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Data</th>
                    <th className="px-4 py-4 rounded-r-lg text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-body">
                  {recentAssets.map((asset) => (
                    <tr key={asset.title} className="hover:bg-[#f2f4f3] transition-colors group">
                      <td className="px-4 py-5 font-bold text-[#00190f]">{asset.title}</td>
                      <td className="px-4 py-5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${asset.statusColor}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-[#414844]">{asset.date}</td>
                      <td className="px-4 py-5 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:text-[#006C48] transition-colors"><Edit2 size={16} /></button>
                        <button className="p-1 hover:text-[#ba1a1a] transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Impact Chart (Simulated) */}
          <div className="bg-white rounded-xl p-8 border border-[#c1c8c2]/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h4 className="text-xl font-bold font-headline text-[#00190f] uppercase">Evolução Sustentável</h4>
              <div className="flex items-center gap-4 text-[10px] font-bold font-headline">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#006C48] rounded-sm"></span> PRODUÇÃO</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#b2d414] rounded-sm"></span> EMISSÕES</div>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 px-2">
              {[40, 60, 55, 75, 85, 65, 90].map((height, i) => (
                <div key={i} className="flex-1 bg-[#e6e9e8] rounded-t-sm h-full group relative">
                  <div 
                    className="absolute bottom-0 w-full bg-[#006C48] rounded-t-sm transition-all group-hover:brightness-110"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 font-headline text-[10px] text-[#414844] px-2 font-bold">
              {['JAN','FEV','MAR','ABR','MAI','JUN','JUL'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-[#e6e9e8] rounded-xl p-8 h-full">
            <h4 className="text-xl font-bold font-headline text-[#00190f] uppercase mb-8">Atividade do Sistema</h4>
            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#c1c8c2]/30">
              <ActivityItem 
                icon={<Plus size={12} />} 
                title="Novo currículo recebido" 
                desc="Para: Engenheiro de Processos" 
                time="HÁ 12 MINUTOS" 
                color="bg-[#006C48]" 
              />
              <ActivityItem 
                icon={<Newspaper size={12} />} 
                title="Notícia Publicada" 
                desc="Impacto da Moagem Sustentável nas Metas 2024." 
                time="HÁ 2 HORAS" 
                color="bg-[#0e2f22]" 
              />
              <ActivityItem 
                icon={<Edit2 size={12} />} 
                title="Atualização de Perfil" 
                desc="Gestor de RH atualizou as permissões de acesso." 
                time="ONTEM, 14:30" 
                color="bg-[#121700]" 
              />
              <ActivityItem 
                icon={<Leaf size={12} />} 
                title="Meta Atingida" 
                desc="Redução de CO2 mensal superou a meta em 5%." 
                time="ONTEM, 09:15" 
                color="bg-[#006C48]" 
              />
            </div>

            {/* Highlight Card */}
            <div className="mt-12 p-6 bg-white/40 rounded-xl border border-white/50 relative overflow-hidden">
              <h5 className="text-xs font-bold font-headline text-[#00190f] mb-2 uppercase">PRECISION ECOSYSTEM</h5>
              <p className="text-xs text-[#414844] leading-relaxed">Sistema operando em 98.4% de eficiência energética. Nenhuma anomalia detectada.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1 bg-[#e6e9e8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006C48] w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Editorial Photo */}
      <section className="relative h-64 rounded-xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
          alt="Bioenergy Plantation"
          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2f22]/90 to-transparent flex items-center px-12">
          <div className="max-w-md">
            <span className="inline-block px-3 py-1 bg-[#006C48] text-white text-[10px] font-bold font-headline uppercase mb-4">Relatório de Sustentabilidade</span>
            <h3 className="text-3xl font-extrabold text-white font-headline uppercase leading-tight mb-4">Compromisso com o Futuro da Agroindústria</h3>
            <p className="text-[#ABCFBB] text-sm font-body">Veja como a Usina Paisa está liderando a transição para práticas 100% carbono neutro.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActivityItem({ icon, title, desc, time, color }: { icon: any, title: string, desc: string, time: string, color: string }) {
  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${color} flex items-center justify-center text-white ring-4 ring-[#e6e9e8]`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-[#00190f] font-headline">{title}</p>
        <p className="text-xs text-[#414844] font-body mb-1">{desc}</p>
        <span className={`text-[10px] uppercase font-headline font-bold ${time.includes('MINUTOS') ? 'text-[#006C48]' : 'text-[#414844]'}`}>{time}</span>
      </div>
    </div>
  );
}
