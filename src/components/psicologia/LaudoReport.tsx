'use client';

import React from 'react';
import { Printer, X, FileText, Calendar, User, Stethoscope } from 'lucide-react';

interface LaudoReportProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  evolutions: any[];
}

export default function LaudoReport({ isOpen, onClose, profile, evolutions }: LaudoReportProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col print:shadow-none print:max-h-none print:rounded-none animate-scale-in">
        
        {/* Modal Header - Hidden on Print */}
        <div className="bg-[#0E2F22] p-6 text-white flex justify-between items-center shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <FileText className="text-[#cdf139]" size={24} />
            <h3 className="text-xl font-headline font-bold uppercase tracking-tight">Relatório Psicológico</h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-[#cdf139] text-[#0E2F22] font-bold text-xs rounded-lg hover:bg-white transition-all flex items-center gap-2"
            >
              <Printer size={16} />
              Imprimir
            </button>
            <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-y-auto p-10 font-body print:p-0 print:overflow-visible custom-scrollbar">
          
          {/* Letterhead */}
          <div className="flex justify-between items-start border-b-2 border-[#0E2F22] pb-8 mb-10">
            <div>
              <h1 className="text-3xl font-black text-[#0E2F22] tracking-tighter uppercase leading-none mb-2">Usina Paisa</h1>
              <p className="text-[10px] font-bold text-[#727974] uppercase tracking-[0.3em]">Departamento de Saúde Mental e Bem-Estar</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#0E2F22]">LAUDO DE EVOLUÇÃO CLÍNICA</p>
              <p className="text-[10px] text-[#727974]">Data de Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#0E2F22]">
                <User size={18} className="text-[#006C48]" />
                <span className="text-sm font-bold uppercase tracking-tight">Dados do Paciente</span>
              </div>
              <div className="space-y-1 pl-7">
                <p className="text-xs"><span className="font-bold">Nome:</span> {profile.employee.name}</p>
                <p className="text-xs"><span className="font-bold">Matrícula:</span> {profile.employee.registrationNumber || 'N/A'}</p>
                <p className="text-xs"><span className="font-bold">CPF:</span> {profile.employee.cpf}</p>
                <p className="text-xs"><span className="font-bold">Setor:</span> {profile.employee.sector?.name || 'Geral'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#0E2F22]">
                <Stethoscope size={18} className="text-[#006C48]" />
                <span className="text-sm font-bold uppercase tracking-tight">Status Atual</span>
              </div>
              <div className="space-y-1 pl-7">
                <p className="text-xs"><span className="font-bold">Condição:</span> {profile.status === 'REGULAR' ? 'Apto (Regular)' : profile.status === 'FOLLOW_UP' ? 'Em Acompanhamento' : 'Aguardando Avaliação'}</p>
                <p className="text-xs"><span className="font-bold">Nível Stress Ocupacional:</span> {profile.expectedStressLevel || 1} / 5</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-[10px] font-black text-[#006C48] uppercase tracking-widest border-b border-[#C1C8C2]/30 pb-2 mb-4">Anamnese & Observações Iniciais</h4>
              <p className="text-xs leading-relaxed text-[#414844] whitespace-pre-wrap">{profile.initialObservations || 'Sem observações registradas.'}</p>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#006C48] uppercase tracking-widest border-b border-[#C1C8C2]/30 pb-2 mb-4">Evoluções Cronológicas</h4>
              <div className="space-y-6">
                {evolutions.length > 0 ? (
                  evolutions.map((evo, idx) => (
                    <div key={idx} className="border-l-2 border-[#0E2F22]/20 pl-6 py-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-bold text-[#0E2F22] uppercase">{new Date(evo.createdAt).toLocaleDateString('pt-BR')} - {new Date(evo.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[9px] font-bold text-[#727974] uppercase">Resp: {evo.authorName}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#414844]">{evo.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs italic text-[#727974]">Nenhuma evolução registrada no período.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer for Signature */}
          <div className="mt-20 pt-10 border-t border-[#C1C8C2] flex justify-center">
            <div className="text-center">
              <div className="w-64 border-b border-[#0E2F22] mb-4"></div>
              <p className="text-[10px] font-bold text-[#0E2F22] uppercase tracking-widest">Assinatura do Profissional Responsável</p>
              <p className="text-[9px] text-[#727974] mt-1">CRP: XX/XXXXX</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
