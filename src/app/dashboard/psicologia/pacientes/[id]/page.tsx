import React from 'react';
import { getPatientProfile, addEvolution } from '../actions';
import { 
  BadgeInfo, 
  Stethoscope, 
  BrainCircuit, 
  Factory, 
  History,
  MessageSquarePlus,
  User,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import EvolutionList from '@/components/psicologia/EvolutionList';

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  const profile = await getPatientProfile(params.id);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h2 className="text-2xl font-bold text-[#0E2F22]">Paciente não encontrado.</h2>
        <Link href="/dashboard/psicologia/pacientes" className="text-[#006C48] font-bold hover:underline flex items-center gap-2">
          <ChevronLeft size={16} />
          Voltar para a lista
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'REGULAR': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold border border-green-200 uppercase tracking-widest">Regular</span>;
      case 'FOLLOW_UP': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold border border-red-200 uppercase tracking-widest">Follow-up</span>;
      default: return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold border border-amber-200 uppercase tracking-widest">Aguardando</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard/psicologia/pacientes"
            className="p-3 bg-white border border-[#C1C8C2]/20 rounded-xl text-[#727974] hover:text-[#0E2F22] hover:bg-[#f2f4f3] transition-all"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-headline font-bold text-[#0E2F22] tracking-tighter">{profile.employee.name}</h1>
              {getStatusBadge(profile.status)}
            </div>
            <p className="text-[#727974] font-medium uppercase text-[10px] tracking-[0.2em]">Registro Detalhado do Paciente</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link 
            href={`/dashboard/psicologia/pacientes/editar/${profile.id}`}
            className="px-6 py-3 bg-white border border-[#C1C8C2] text-[#0E2F22] font-bold text-sm rounded-lg hover:bg-[#eceeed] transition-colors"
          >
            Editar Registro
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-[#f2f4f3] rounded-lg flex items-center justify-center text-[#006C48]">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Matrícula</p>
                <p className="font-bold text-[#0E2F22]">{profile.employee.registrationNumber || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-[#f2f4f3] rounded-lg flex items-center justify-center text-[#006C48]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Unidade / Setor</p>
                <p className="font-bold text-[#0E2F22] truncate max-w-[150px]">{profile.employee.workLocation?.name || 'Geral'}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#C1C8C2]/20 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 bg-[#f2f4f3] rounded-lg flex items-center justify-center text-[#006C48]">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#727974] uppercase tracking-widest">Data Nasc.</p>
                <p className="font-bold text-[#0E2F22]">
                  {profile.employee.birthDate ? new Date(profile.employee.birthDate).toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-6">
            <section className="bg-white p-8 rounded-2xl border border-[#C1C8C2]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope className="text-[#006C48]" size={24} />
                <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Histórico de Saúde</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-[#727974] uppercase tracking-widest mb-2">Doenças Pré-existentes</h4>
                  <p className="text-[#0E2F22] font-medium bg-[#f2f4f3]/50 p-4 rounded-xl min-h-[80px]">
                    {profile.preExistingConditions || 'Nenhuma informada.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#727974] uppercase tracking-widest mb-2">Medicamentos em Uso</h4>
                  <p className="text-[#0E2F22] font-medium bg-[#f2f4f3]/50 p-4 rounded-xl min-h-[80px]">
                    {profile.medications || 'Nenhum informado.'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-[10px] font-bold text-[#727974] uppercase tracking-widest mb-2">Alergias</h4>
                  <p className="text-[#0E2F22] font-medium bg-[#f2f4f3]/50 p-4 rounded-xl">
                    {profile.allergies || 'Nenhuma informada.'}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-[#C1C8C2]/20 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-[#006C48]" size={24} />
                <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Baseline & Observações</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#cdf139]/10 rounded-xl border border-[#cdf139]/20">
                  <ShieldCheck className="text-[#006C48]" />
                  <div>
                    <p className="text-sm font-bold text-[#0E2F22]">Histórico de Saúde Mental</p>
                    <p className="text-xs text-[#727974]">{profile.mentalHealthHistory ? 'Paciente possui histórico prévio de acompanhamento.' : 'Não possui histórico prévio relatado.'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#727974] uppercase tracking-widest mb-2">Observações Comportamentais</h4>
                  <p className="text-[#0E2F22] font-medium bg-[#f2f4f3]/50 p-6 rounded-xl leading-relaxed">
                    {profile.initialObservations || 'Sem observações iniciais registradas.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#727974] uppercase tracking-widest mb-4">Testes Psicométricos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'BFP', status: profile.bfpTestStatus },
                      { label: 'PALOGRÁFICO', status: profile.paloTestStatus },
                      { label: 'STRESS', status: profile.stressScaleStatus }
                    ].map((test, idx) => (
                      <div key={idx} className="bg-[#f2f4f3] p-4 rounded-xl border border-[#C1C8C2]/10 flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-[#727974] uppercase">{test.label}</span>
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${test.status === 'REALIZADO' ? 'text-green-600' : 'text-amber-600'}`}>
                          {test.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Evolutions & Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Occupational Context Card */}
          <section className="bg-[#0E2F22] p-8 rounded-2xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="text-[#cdf139]" size={24} />
              <h3 className="text-xl font-headline font-bold">Contexto Ocupacional</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-[#ABCFBB] uppercase tracking-widest mb-4">Nível de Stress Esperado</p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level} 
                      className={`h-2 flex-1 rounded-full ${level <= (profile.expectedStressLevel || 1) ? 'bg-[#cdf139]' : 'bg-white/10'}`} 
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#ABCFBB] uppercase tracking-widest mb-2">Requisitos Psicológicos</p>
                <p className="text-sm font-medium leading-relaxed italic text-white/80">
                  {profile.psychologicalRequirements || 'Não especificados.'}
                </p>
              </div>
            </div>
          </section>

          {/* Evolutions Section */}
          <section className="bg-white p-8 rounded-2xl border border-[#C1C8C2]/20 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-3">
                <History className="text-[#006C48]" size={24} />
                <h3 className="text-xl font-headline font-bold text-[#0E2F22]">Evoluções</h3>
              </div>
            </div>
            
            <EvolutionList profileId={profile.id} evolutions={profile.evolutions} />
          </section>

        </div>
      </div>
    </div>
  );
}
