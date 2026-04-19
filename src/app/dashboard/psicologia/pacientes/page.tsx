import React from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Users, 
  ChevronRight, 
  Filter,
  Brain,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { getPatientProfiles } from './actions';

export default async function PacientesPage() {
  const profiles = await getPatientProfiles();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGULAR': return 'bg-green-100 text-green-700 border-green-200';
      case 'FOLLOW_UP': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'REGULAR': return <CheckCircle2 size={14} />;
      case 'FOLLOW_UP': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-[#0E2F22] tracking-tighter">Gestão de Pacientes</h1>
          <p className="text-[#727974] font-medium">Acompanhamento psicológico e monitoramento de bem-estar.</p>
        </div>
        <Link 
          href="/dashboard/psicologia/pacientes/novo"
          className="flex items-center gap-2 bg-[#0E2F22] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#006C48] transition-all shadow-lg hover:shadow-[#006C48]/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Novo Registro
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f2f4f3] rounded-xl flex items-center justify-center text-[#0E2F22]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Total de Pacientes</p>
            <p className="text-2xl font-headline font-bold text-[#0E2F22]">{profiles.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Aguardando Avaliação</p>
            <p className="text-2xl font-headline font-bold text-[#0E2F22]">
              {profiles.filter(p => p.status === 'AWAITING').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Necessitam Follow-up</p>
            <p className="text-2xl font-headline font-bold text-[#0E2F22]">
              {profiles.filter(p => p.status === 'FOLLOW_UP').length}
            </p>
          </div>
        </div>
      </div>

      {/* List / Table */}
      <div className="bg-white rounded-2xl border border-[#C1C8C2]/20 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#C1C8C2]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727974]" size={16} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou matrícula..." 
              className="w-full pl-10 pr-4 py-2 bg-[#f2f4f3] border-none rounded-lg text-sm focus:ring-1 focus:ring-[#006C48] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#C1C8C2] rounded-lg text-sm font-bold text-[#0E2F22] hover:bg-[#f2f4f3] transition-colors">
            <Filter size={16} />
            Filtros Avançados
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f2f4f3]/50 text-[10px] font-bold text-[#727974] uppercase tracking-widest border-b border-[#C1C8C2]/10">
                <th className="px-8 py-4">Paciente</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Cargo / Unidade</th>
                <th className="px-8 py-4">Nível de Stress</th>
                <th className="px-8 py-4">Última Atualização</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C1C8C2]/10">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-[#f2f4f3]/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#006C48]/10 flex items-center justify-center text-[#006C48] font-bold">
                          {profile.employee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#0E2F22]">{profile.employee.name}</p>
                          <p className="text-[10px] text-[#727974] uppercase tracking-wider">MAT: {profile.employee.registrationNumber || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(profile.status)}`}>
                        {getStatusIcon(profile.status)}
                        {profile.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-medium text-[#0E2F22]">{profile.employee.position}</p>
                      <p className="text-[10px] text-[#727974] uppercase">{profile.employee.workLocation?.name || 'Sem Unidade'}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div 
                            key={level}
                            className={`h-1.5 w-4 rounded-full ${
                              level <= (profile.expectedStressLevel || 0) 
                                ? (profile.expectedStressLevel! > 3 ? 'bg-red-500' : 'bg-[#006C48]') 
                                : 'bg-[#C1C8C2]/20'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-[#0E2F22]">{new Date(profile.updatedAt).toLocaleDateString('pt-BR')}</p>
                    </td>
                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                      <Link 
                        href={`/dashboard/psicologia/pacientes/${profile.id}`}
                        title="Ver Prontuário e Laudo"
                        className="p-2 text-[#727974] hover:text-[#006C48] hover:bg-[#006C48]/5 rounded-lg transition-all inline-flex"
                      >
                        <ClipboardList size={20} />
                      </Link>
                      <Link 
                        href={`/dashboard/psicologia/pacientes/${profile.id}`}
                        className="p-2 text-[#727974] hover:text-[#0E2F22] hover:bg-[#f2f4f3] rounded-lg transition-all inline-flex"
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-40">
                      <Brain size={48} />
                      <p className="font-bold text-[#0E2F22]">Nenhum paciente cadastrado no momento.</p>
                      <Link 
                        href="/dashboard/psicologia/pacientes/novo"
                        className="text-sm text-[#006C48] underline hover:no-underline"
                      >
                        Começar primeiro cadastro
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
