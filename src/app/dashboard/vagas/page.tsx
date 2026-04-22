'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  MoreHorizontal,
  Loader2,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { createJob, deleteJob, getJobs, updateJobStatus } from './actions';
import Link from 'next/link';
import ConfirmModal from '@/components/ConfirmModal';

export default function VagasPage() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vagaToDelete, setVagaToDelete] = useState<{ id: string, title: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    area: 'Administrativo',
    location: 'Ribeirão Preto/SP',
    type: 'CLT - Presencial',
    description: '',
    requirements: '',
    benefits: '',
    status: 'PUBLICO'
  });

  const fetchVagas = async () => {
    setIsLoading(true);
    const data = await getJobs();
    setVagas(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await createJob(data);
      if (res.success) {
        setMessage({ text: 'Vaga cadastrada com sucesso!', type: 'success' });
        setIsModalOpen(false);
        setFormData({
          title: '',
          area: 'Administrativo',
          location: 'Ribeirão Preto/SP',
          type: 'CLT - Presencial',
          description: '',
          requirements: '',
          benefits: '',
          status: 'PUBLICO'
        });
        fetchVagas();
      } else {
        setMessage({ text: 'Erro ao cadastrar vaga.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erro no servidor.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (vagaToDelete) {
      const res = await deleteJob(vagaToDelete.id);
      if (res.success) fetchVagas();
      setVagaToDelete(null);
    }
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'PUBLICO' ? 'ENCERRADA' : 'PUBLICO';
    const res = await updateJobStatus(id, nextStatus);
    if (res.success) fetchVagas();
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2">Quadro de Vagas</h2>
          <p className="text-[#414844] font-body text-sm">Gerencie as oportunidades e publicações de carreira no ecossistema.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0e2f22] text-white px-6 py-3 rounded-lg font-bold font-headline text-xs uppercase tracking-widest hover:bg-[#006C48] transition-all flex items-center gap-2 shadow-xl shadow-[#0e2f22]/10"
        >
          <Plus size={18} /> NOVA VAGA
        </button>
      </section>

      {/* Messages */}
      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 animate-shake border-2 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
        }`}>
          {message.type === 'success' ? <CheckCircle className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
          <p className="font-bold text-xs uppercase tracking-widest">{message.text}</p>
        </div>
      )}

      {/* Grid List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#414844]/50">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p className="text-sm font-headline uppercase font-bold tracking-widest font-headline">Sincronizando banco de dados...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {vagas.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-[#c1c8c2]/50 text-center">
              <Briefcase className="mx-auto text-[#c1c8c2] mb-4" size={48} />
              <p className="text-[#414844] font-headline font-bold uppercase tracking-widest text-sm">Nenhuma vaga cadastrada.</p>
            </div>
          ) : (
            vagas.map((vaga) => (
              <div key={vaga.id} className="bg-white p-8 rounded-xl border border-[#c1c8c2]/50 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden border-l-8 border-[#006C48]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-[#92f7c3]/30 text-[#00734d] text-[10px] font-extrabold uppercase rounded-full">
                        {vaga.area}
                      </span>
                      <span className="text-[#414844]/60 text-[10px] font-bold font-headline uppercase">
                        {new Date(vaga.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#00190f] font-headline uppercase leading-tight mb-2 group-hover:text-[#006C48] transition-colors">
                      {vaga.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs font-body text-[#414844]">
                      <div className="flex items-center gap-1 opacity-70">
                        <span className="font-bold uppercase tracking-tighter">Local:</span> {vaga.location}
                      </div>
                      <div className="flex items-center gap-1 opacity-70">
                        <span className="font-bold uppercase tracking-tighter">Tipo:</span> {vaga.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleStatusUpdate(vaga.id, vaga.status)}
                      className={`px-4 py-2 rounded font-headline text-[10px] font-bold uppercase tracking-widest transition-all ${
                        vaga.status === 'PUBLICO' 
                          ? 'bg-[#92f7c3] text-[#00734d] border border-[#00734d]/20' 
                          : 'bg-[#e1e3e2] text-[#414844] border border-[#c1c8c2]'
                      }`}
                    >
                      {vaga.status === 'PUBLICO' ? 'ATIVA (VISÍVEL)' : 'ENCERRADA'}
                    </button>
                    <Link 
                      href={`/dashboard/candidatos?jobId=${vaga.id}`}
                      className="px-4 py-2 bg-[#0e2f22] text-white rounded font-headline text-[10px] font-bold uppercase tracking-widest hover:bg-[#006C48] transition-all flex items-center gap-1"
                    >
                      CANDIDATOS
                    </Link>
                    <button 
                      onClick={() => {
                        setVagaToDelete({ id: vaga.id, title: vaga.title });
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-3 hover:text-white hover:bg-[#ba1a1a] text-[#ba1a1a] border border-[#ffdad6] rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal Nova Vaga */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00190f]/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="p-8 bg-[#0e2f22] text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold font-headline italic uppercase tracking-tighter leading-none">Cadastrar Nova Oportunidade</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="hover:rotate-90 transition-transform p-1"
              >
                <Plus className="rotate-45" size={32} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Mensagem de Erro interna ao Modal */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-shake border-2 ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {message.type === 'success' ? <CheckCircle className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
                  <p className="font-bold text-[10px] uppercase tracking-widest">{message.text}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Título do Cargo</label>
                  <input 
                    required
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm"
                    placeholder="Ex: Operador de Maquinário Jr."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Área de Atuação</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  >
                    <option>Urbano</option>
                    <option>Rural</option>
                    <option>Operador</option>
                    <option>Trabalhador Agrícola</option>
                    <option>Operacional</option>
                    <option>Administrativo</option>
                    <option>Engenharia</option>
                    <option>Tecnologia</option>
                    <option>Sustentabilidade (ESG)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Localidade</label>
                  <input 
                    required
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm"
                    placeholder="Ex: Ribeirão Preto / Unidade Campo"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Tipo de Contrato</label>
                  <input 
                    required
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm"
                    placeholder="Ex: CLT - Presencial"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Descrição das Atividades</label>
                  <textarea 
                    required
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm min-h-[120px]"
                    placeholder="Quais serão as responsabilidades do cargo?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Requisitos Técnicos</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm min-h-[80px]"
                    placeholder="Cursos, experiência, certificações..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-[#0e2f22] text-white py-5 rounded-lg font-headline font-bold uppercase tracking-[0.2em] italic text-sm hover:bg-[#006C48] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'PUBLICAR VAGA NO PORTAL'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Vaga?"
        description={`Você está prestes a remover permanentemente a vaga: ${vagaToDelete?.title}. Todos os candidatos vinculados a esta vaga também poderão ser afetados.`}
        confirmText="Confirmar Exclusão"
        cancelText="Manter Publicação"
      />
    </div>
  );
}
