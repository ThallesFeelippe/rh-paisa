'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Download, 
  Users, 
  Briefcase, 
  Newspaper, 
  Leaf, 
  Edit2, 
  Trash2, 
  Loader2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { getDashboardStats } from './home-actions';
import { getCurrentUser } from './perfil/actions';
import Link from 'next/link';

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState<'VAGAS' | 'NOTÍCIAS'>('VAGAS');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    stats: { jobs: number; candidates: number; news: number };
    recentJobs: any[];
    recentNews: any[];
  }>({
    stats: { jobs: 0, candidates: 0, news: 0 },
    recentJobs: [],
    recentNews: [],
  });

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const result = await getDashboardStats();
        setData(result);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const kpis = [
    { 
      name: 'Vagas Abertas', 
      value: data.stats.jobs.toString(), 
      increment: 'ATIVO', 
      icon: Briefcase, 
      color: 'bg-emerald-100', 
      textColor: 'text-emerald-700',
      badgeColor: 'bg-emerald-200',
      link: '/dashboard/vagas',
      roles: ['ADMIN', 'GESTOR_RH']
    },
    { 
      name: 'Novos Candidatos', 
      value: data.stats.candidates.toString(), 
      increment: 'TOTAL', 
      icon: Users, 
      color: 'bg-lime-100', 
      textColor: 'text-lime-900',
      badgeColor: 'bg-lime-200',
      link: '/dashboard/candidatos',
      roles: ['ADMIN', 'GESTOR_RH']
    },
    { 
      name: 'Notícias Publicadas', 
      value: data.stats.news.toString(), 
      increment: 'MURAL', 
      icon: Newspaper, 
      color: 'bg-teal-100', 
      textColor: 'text-teal-700',
      badgeColor: 'bg-teal-200',
      link: '/dashboard/noticias',
      roles: ['ADMIN', 'GESTOR_RH', 'SECRETARIA']
    }
  ];

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    async function loadUser() {
      const u = await getCurrentUser();
      setUser(u);
    }
    loadUser();
  }, []);

  const filteredKpis = kpis.filter(kpi => !user || kpi.roles.includes(user.role));

  const currentItems = activeTab === 'VAGAS' ? data.recentJobs : data.recentNews;

  return (
    <div className="space-y-12 animate-fade">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tighter text-emerald-950 font-headline uppercase mb-2 italic">Visão Geral da Usina</h2>
          <p className="text-slate-500 font-body">Monitoramento em tempo real do ecossistema produtivo e sustentável da Unidade Paisa.</p>
        </div>
        <div className="flex gap-4">
          {(user?.role === 'ADMIN' || user?.role === 'GESTOR_RH') && (
            <>
              <button className="bg-slate-100 px-4 py-2 rounded-lg text-xs font-bold font-headline hover:bg-slate-200 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" /> EXPORTAR DADOS
              </button>
              <Link href="/dashboard/vagas" className="bg-emerald-950 text-white px-6 py-2 rounded text-xs font-bold font-headline hover:bg-emerald-800 transition-all duration-300 shadow-xl shadow-emerald-950/10 flex items-center gap-2">
                <Plus size={14} /> NOVA VAGA
              </Link>
            </>
          )}
        </div>
      </section>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredKpis.map((kpi) => (
          <Link href={kpi.link} key={kpi.name} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-900/5 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center ${kpi.textColor}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold font-headline ${kpi.textColor} ${kpi.badgeColor} px-2 py-1 rounded-full uppercase`}>
                {kpi.increment}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest font-headline">{kpi.name}</p>
            <h3 className="text-4xl font-bold text-emerald-950 font-headline mt-1">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : kpi.value}
            </h3>
          </Link>
        ))}
        
        {/* CO2 Metric */}
        <div className="bg-emerald-950 p-6 rounded-2xl relative overflow-hidden group border border-emerald-900">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <p className="text-emerald-200/50 text-xs font-bold uppercase tracking-widest font-headline">CO2 Reduzido</p>
            <h3 className="text-4xl font-bold text-white font-headline mt-1">842.5 <span className="text-sm font-normal">t</span></h3>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-700/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-on-background">
        {/* Management Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h4 className="text-xl font-bold font-headline text-emerald-950 uppercase italic">Gerenciamento de Ativos</h4>
                <p className="text-xs text-slate-500">Últimas atualizações no sistema.</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab('VAGAS')}
                  className={`text-[10px] font-bold font-headline py-2 px-4 rounded-md transition-all ${
                    activeTab === 'VAGAS' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  VAGAS
                </button>
                <button 
                  onClick={() => setActiveTab('NOTÍCIAS')}
                  className={`text-[10px] font-bold font-headline py-2 px-4 rounded-md transition-all ${
                    activeTab === 'NOTÍCIAS' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  NOTÍCIAS
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto min-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full pt-20">
                  <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 font-headline text-[10px] tracking-widest uppercase text-slate-400 border-b border-slate-100">
                      <th className="px-4 py-4 rounded-l-lg">Título</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Data</th>
                      <th className="px-4 py-4 rounded-r-lg text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-body">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors group border-b border-slate-50 last:border-0 text-emerald-950">
                        <td className="px-4 py-5 font-bold">{item.title}</td>
                        <td className="px-4 py-5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            item.status === 'PUBLICO' || item.status === 'Concluído' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-slate-500">
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-5 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={activeTab === 'VAGAS' ? '/dashboard/vagas' : '/dashboard/noticias'}
                            className="inline-block p-1 hover:text-emerald-600 transition-colors"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <a 
                            href={activeTab === 'VAGAS' ? '/vagas' : `/noticias/${item.id}`} 
                            target="_blank"
                            className="inline-block p-1 hover:text-emerald-600 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {currentItems.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-slate-400 italic">
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Impact Chart (Simulated) */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <h4 className="text-xl font-bold font-headline text-emerald-950 uppercase italic tracking-tight">Evolução Sustentável</h4>
              <div className="flex items-center gap-4 text-[10px] font-bold font-headline">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-700 rounded-sm"></span> PRODUÇÃO</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-lime-400 rounded-sm"></span> EMISSÕES</div>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[40, 60, 55, 75, 85, 65, 90].map((height, i) => (
                <div key={i} className="flex-1 bg-slate-50 rounded-t-lg h-full group relative">
                  <div 
                    className="absolute bottom-0 w-full bg-emerald-700 rounded-t-lg transition-all group-hover:bg-emerald-600"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 font-headline text-[10px] text-slate-400 px-2 font-bold uppercase tracking-widest">
              {['JAN','FEV','MAR','ABR','MAI','JUN','JUL'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-100">
            <h4 className="text-xl font-bold font-headline text-emerald-950 uppercase mb-8 italic">Atividade do Sistema</h4>
            <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              <ActivityItem 
                icon={<Plus size={12} />} 
                title="Novo currículo recebido" 
                desc="Aguardando análise da Psicologia." 
                time="HÁ 12 MINUTOS" 
                color="bg-emerald-700" 
              />
              <ActivityItem 
                icon={<Newspaper size={12} />} 
                title="Notícia Publicada" 
                desc="Relatório de Safra 2024 disponível." 
                time="HÁ 2 HORAS" 
                color="bg-emerald-900" 
              />
              <ActivityItem 
                icon={<Edit2 size={12} />} 
                title="Atualização de Vaga" 
                desc="Engenheiro de Processos movido para Público." 
                time="ONTEM, 14:30" 
                color="bg-lime-700" 
              />
            </div>

            {/* Highlight Card */}
            <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-100 relative overflow-hidden shadow-sm">
              <h5 className="text-[10px] font-black font-headline text-emerald-950 mb-2 uppercase tracking-widest">PRECISION ECOSYSTEM</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold">Sistema operando em 98.4% de eficiência energética. Nenhuma anomalia detectada.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Photo Section */}
      <section className="relative h-72 rounded-3xl overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
          alt="Bioenergy Plantation"
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/40 to-transparent flex items-center px-12">
          <div className="max-w-md">
            <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold font-headline uppercase mb-4 tracking-widest rounded-md shadow-lg">Relatório de Sustentabilidade</span>
            <h3 className="text-3xl font-black text-white font-headline uppercase leading-tight mb-4 italic tracking-tighter">Compromisso com o Futuro da Agroindústria</h3>
            <p className="text-emerald-100/70 text-sm font-body leading-relaxed">A Usina Paisa lidera a transição para práticas 100% carbono neutro, integrando tecnologia e respeito ao meio ambiente em cada safra.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActivityItem({ icon, title, desc, time, color }: { icon: any, title: string, desc: string, time: string, color: string }) {
  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${color} flex items-center justify-center text-white ring-4 ring-slate-50`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-emerald-950 font-headline uppercase italic">{title}</p>
        <p className="text-xs text-slate-400 font-body mb-1">{desc}</p>
        <span className={`text-[10px] uppercase font-headline font-bold ${time.includes('MINUTOS') ? 'text-emerald-600' : 'text-slate-300'}`}>{time}</span>
      </div>
    </div>
  );
}

