'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Trash2, 
  ExternalLink,
  Download,
  AlertCircle,
  Loader2,
  ChevronDown,
  UserCircle
} from 'lucide-react';
import { getApplications, deleteApplication } from './actions';
import ConfirmModal from '@/components/ConfirmModal';

export default function CandidatosPage() {
  const searchParams = useSearchParams();
  const jobIdFilter = searchParams.get('jobId');
  
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Custom Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<{ id: string, name: string } | null>(null);

  const fetchCandidates = async () => {
    setIsLoading(true);
    const data = await getApplications();
    
    // Filter by jobId if present
    const filtered = jobIdFilter 
      ? data.filter((c: any) => c.jobId === jobIdFilter)
      : data;
      
    setCandidates(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, [jobIdFilter]);

  const handleDelete = async () => {
    if (candidateToDelete) {
      const res = await deleteApplication(candidateToDelete.id);
      if (res.success) fetchCandidates();
      setCandidateToDelete(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2">Banco de Talentos</h2>
          <p className="text-[#414844] font-body text-sm">Visualize e gerencie os currículos recebidos pelo portal.</p>
        </div>
        {jobIdFilter && (
          <div className="bg-[#92f7c3] text-[#00734d] px-4 py-2 rounded-lg font-bold font-headline text-[10px] uppercase tracking-widest border border-[#00734d]/20 flex items-center gap-2">
            <span className="opacity-60 italic text-[8px]">Filtrando por:</span> Vaga Selecionada
            <Link href="/dashboard/candidatos" className="ml-2 hover:text-[#ba1a1a]">✕</Link>
          </div>
        )}
      </section>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#c1c8c2]/50 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#414844] mb-1">Total de Candidatos</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-[#00190f] font-headline">{candidates.length}</span>
            <span className="text-xs text-[#006C48] font-bold mb-1">RECEBIDOS</span>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#414844]/50">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-sm font-headline uppercase font-bold tracking-widest">Sincronizando currículos...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.length === 0 ? (
            <div className="bg-white rounded-xl p-16 border border-[#c1c8c2]/50 text-center">
              <Users className="mx-auto text-[#c1c8c2] mb-4" size={48} />
              <p className="text-[#414844] font-headline font-bold uppercase tracking-widest text-sm">Nenhum currículo recebido ainda.</p>
            </div>
          ) : (
            candidates.map((c) => (
              <div key={c.id} className="bg-white rounded-xl border border-[#c1c8c2]/50 shadow-sm overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#e6e9e8] flex items-center justify-center text-[#0e2f22] overflow-hidden border border-[#c1c8c2]/30">
                      {c.photoUrl ? (
                        <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserCircle size={32} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#00190f] font-headline uppercase tracking-tight">{c.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-[#006C48] uppercase tracking-tighter">
                          {c.job ? `VAGA: ${c.job.title}` : 'BANCO GERAL'}
                        </span>
                        <span className="text-[10px] text-[#414844]/60 font-body uppercase">
                          {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                      className="flex-1 md:flex-none px-4 py-2 border border-[#c1c8c2] rounded-lg text-xs font-bold font-headline uppercase tracking-widest hover:bg-[#f2f4f3] transition-all flex items-center justify-center gap-2"
                    >
                      Ver Detalhes <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === c.id ? 'rotate-180' : ''}`} />
                    </button>
                    <button 
                      onClick={() => {
                        setCandidateToDelete({ id: c.id, name: c.name });
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {expandedId === c.id && (
                  <div className="px-6 pb-8 border-t border-[#c1c8c2]/30 bg-[#f8faf9]/50 animate-slideDown">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
                      {/* Personal Info */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-[#414844] uppercase tracking-[0.2em] mb-4">Informações de Contato</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-xs">
                            <Mail className="text-[#006C48] w-4 h-4" />
                            <span className="font-medium">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <Phone className="text-[#006C48] w-4 h-4" />
                            <span className="font-medium">{c.phone}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <MapPin className="text-[#006C48] w-4 h-4" />
                            <span className="font-medium">{c.address}</span>
                          </div>
                        </div>
                        <div className="pt-4 space-y-2">
                           <p className="text-[10px] font-bold text-[#414844] uppercase tracking-widest">Escolaridade</p>
                           <p className="text-xs font-bold text-[#00190f] uppercase">{c.education}</p>
                        </div>
                      </div>

                      {/* Motivation */}
                      <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-[10px] font-bold text-[#414844] uppercase tracking-[0.2em] mb-4">Motivação / Apresentação</h4>
                        <div className="bg-white p-6 rounded-xl border border-[#c1c8c2]/50 text-sm italic text-[#414844] leading-relaxed relative">
                          <span className="absolute -top-3 -left-2 text-4xl text-[#006C48]/20 font-serif leading-none">“</span>
                          {c.motivation || "Nenhuma motivação informada."}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                          {c.resumeUrl ? (
                            <a 
                              href={c.resumeUrl} 
                              target="_blank"
                              download
                              className="px-6 py-3 bg-[#0e2f22] text-white rounded-lg text-xs font-bold font-headline uppercase tracking-widest hover:bg-[#006C48] transition-all flex items-center gap-2"
                            >
                              <Download size={16} /> BAIXAR CURRÍCULO (PDF)
                            </a>
                          ) : (
                            <button disabled className="px-6 py-3 bg-[#c1c8c2] text-white rounded-lg text-xs font-bold font-headline uppercase tracking-widest cursor-not-allowed flex items-center gap-2">
                              <Download size={16} /> SEM CURRÍCULO ANEXADO
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Apagar Currículo?"
        description={`Você está prestes a remover permanentemente o currículo de ${candidateToDelete?.name}. Esta ação não pode ser desfeita.`}
        confirmText="Excluir Agora"
        cancelText="Manter Registro"
      />
    </div>
  );
}
