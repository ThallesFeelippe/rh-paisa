'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  Loader2,
  CheckCircle,
  Clock,
  Brain,
  Briefcase,
  AlertTriangle,
  Download,
  Printer,
  FileText,
  RotateCcw
} from 'lucide-react';
import { 
  getConsultations, 
  createConsultation, 
  updateConsultation, 
  deleteConsultation, 
  resetMonthlyConsultations 
} from './actions';
import { getCurrentUser } from '../perfil/actions';
import ConfirmModal from '@/components/ConfirmModal';

export default function AtendimentosPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);
  
  const [message, setMessage] = useState({ text: '', type: '' });
  const [user, setUser] = useState<any>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'TODOS' | 'PSICOLOGIA' | 'RH'>('TODOS');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeRegistration: '',
    employeeRole: '',
    type: 'INDIVIDUAL',
    category: 'PSICOLOGIA',
    status: 'AGENDADO',
    date: '',
    observation: ''
  });

  const fetchData = async () => {
    setIsLoading(true);
    const userData = await getCurrentUser();
    setUser(userData);

    try {
      const data = await getConsultations();
      
      // Data Isolation by Role
      if (userData?.role === 'PSICOLOGA') {
        setConsultations(data.filter((c: any) => c.category === 'PSICOLOGIA'));
        setActiveTab('PSICOLOGIA');
      } else if (userData?.role === 'GESTOR_RH') {
        setConsultations(data.filter((c: any) => c.category === 'RH'));
        setActiveTab('RH');
      } else {
        setConsultations(data);
      }
    } catch (error) {
      console.error(error);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (consultation: any = null, viewOnly: boolean = false) => {
    setIsViewOnly(viewOnly);
    
    // Determine default category based on role
    let defaultCategory = 'PSICOLOGIA';
    if (user?.role === 'GESTOR_RH') defaultCategory = 'RH';

    if (consultation) {
      setSelectedConsultation(consultation);
      setFormData({
        employeeName: consultation.employeeName,
        employeeRegistration: consultation.employeeRegistration || '',
        employeeRole: consultation.employeeRole || '',
        type: consultation.type,
        category: consultation.category,
        status: consultation.status,
        date: new Date(consultation.date).toISOString().slice(0, 16),
        observation: consultation.observation || ''
      });
    } else {
      setSelectedConsultation(null);
      setFormData({
        employeeName: '',
        employeeRegistration: '',
        employeeRole: '',
        type: 'INDIVIDUAL',
        category: defaultCategory,
        status: 'AGENDADO',
        date: '',
        observation: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isViewOnly) return;
    
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      let res;
      if (selectedConsultation) {
        res = await updateConsultation(selectedConsultation.id, formData);
      } else {
        res = await createConsultation(formData);
      }

      if (res.success) {
        setIsModalOpen(false);
        setMessage({ 
          text: selectedConsultation ? 'Atendimento atualizado com sucesso!' : 'Atendimento salvo com sucesso!', 
          type: 'success' 
        });
        fetchData();
      } else {
        setMessage({ text: res.error || 'Erro ao processar atendimento.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erro de conexão com o servidor.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    const res = await resetMonthlyConsultations();
    if (res.success) {
      setIsResetModalOpen(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!selectedConsultation) return;
    const res = await deleteConsultation(selectedConsultation.id);
    if (res.success) {
      setIsDeleteModalOpen(false);
      fetchData();
    }
  };

  const filteredConsultations = consultations.filter(item => {
    const tabMatch = activeTab === 'TODOS' || item.category === activeTab;
    const statusMatch = statusFilter === 'TODOS' || item.status === statusFilter;
    return tabMatch && statusMatch;
  });

  const currentMonthConsultations = consultations.filter(c => {
    const d = new Date(c.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const totalAtendimentosMes = currentMonthConsultations.length;
  
  const proximas24h = consultations.filter(c => {
    const d = new Date(c.date);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return d >= now && d <= tomorrow;
  }).length;

  const casosUrgentes = consultations.filter(c => c.status === 'PENDENTE' || c.type === 'URGENCIA').length;

  useEffect(() => {
    setNow(new Date());
  }, []);

  const formatNumber = (num: number) => num.toLocaleString('pt-BR');

  const canReset = ['ADMIN', 'SECRETARIA'].includes(user?.role);
  
  const canEdit = (item: any = null) => {
    if (!user) return false;
    if (user.role === 'ADMIN' || user.role === 'SECRETARIA') return true;
    if (user.role === 'PSICOLOGA' && item?.category === 'PSICOLOGIA') return true;
    if (user.role === 'GESTOR_RH' && item?.category === 'RH') return true;
    // For new entries (item is null)
    if (!item && (user.role === 'PSICOLOGA' || user.role === 'GESTOR_RH')) return true;
    return false;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REALIZADO': return 'bg-[#92f7c3] text-[#00734d]';
      case 'AGENDADO': return 'bg-[#c7ebd7] text-[#2d4d3f]';
      case 'CANCELADO': return 'bg-[#e1e3e2] text-[#414844]';
      case 'PENDENTE': return 'bg-[#ffdad6] text-[#ba1a1a]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-10 print:p-0 print:space-y-4">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div className="space-y-2">
          <p className="text-[#006C48] font-bold tracking-widest text-xs uppercase">USINA PAISA • Gestão Operacional</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase leading-none">Fila de Atendimentos</h2>
          <p className="text-[#414844]/60 text-sm font-medium">Controle mensal técnico e operacional.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={printReport}
            className="bg-[#0e2f22] text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#006C48] transition-all flex items-center gap-2 shadow-lg shadow-[#0e2f22]/10"
          >
            <Download size={14} /> Baixar Relatório (PDF)
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-white border border-[#c1c8c2] text-[#414844] px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#f8faf9] transition-all flex items-center gap-2"
          >
            <Printer size={14} /> Imprimir
          </button>
          {canReset && (
            <button 
              onClick={() => setIsResetModalOpen(true)}
              className="bg-[#ba1a1a]/10 text-[#ba1a1a] px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#ba1a1a] hover:text-white transition-all flex items-center gap-2"
            >
              <RotateCcw size={14} /> Zerar Mês
            </button>
          )}
          {canEdit() && (
            <button 
              onClick={() => openModal()}
              className="bg-[#0e2f22] text-white px-8 py-3 rounded-lg font-bold font-headline text-sm uppercase tracking-widest hover:bg-[#006C48] transition-all flex items-center gap-2 shadow-xl shadow-[#0e2f22]/10"
            >
              <Plus size={18} /> NOVO ATENDIMENTO
            </button>
          )}
        </div>
      </section>

      {/* Header específico para Impressão/PDF */}
      <div className="hidden print:flex flex-col border-b-2 border-[#00190f] pb-6 mb-8" suppressHydrationWarning>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black font-headline uppercase tracking-tighter text-[#00190f]">Relatório de Atendimentos</h1>
            <p className="text-sm font-bold text-[#006C48] uppercase tracking-widest mt-1">USINA PAISA • Medicina do Trabalho & RH</p>
          </div>
          <div className="text-right text-xs font-bold text-[#414844]/60 uppercase">
            <p>Gerado por: {user?.name || 'Sistema'}</p>
            <p>Data: {now.toLocaleDateString('pt-BR')} às {now.toLocaleTimeString('pt-BR')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-[#f8faf9] p-4 border border-[#c1c8c2]/30 rounded-lg">
            <p className="text-[10px] font-black text-[#414844] uppercase tracking-widest mb-1">Total do Mês</p>
            <p className="text-2xl font-black text-[#00190f]">{totalAtendimentosMes}</p>
          </div>
          <div className="bg-[#f8faf9] p-4 border border-[#c1c8c2]/30 rounded-lg">
            <p className="text-[10px] font-black text-[#414844] uppercase tracking-widest mb-1">Filtro Atual</p>
            <p className="text-xl font-bold text-[#00190f]">{activeTab}</p>
          </div>
          <div className="bg-[#f8faf9] p-4 border border-[#c1c8c2]/30 rounded-lg">
            <p className="text-[10px] font-black text-[#414844] uppercase tracking-widest mb-1">Status</p>
            <p className="text-xl font-bold text-[#00190f]">{statusFilter}</p>
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {message.text && (
        <div className="print:hidden">
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-slideUp ${
            message.type === 'success' ? 'bg-[#92f7c3]/20 text-[#00734d]' : 'bg-[#ffdad6]/50 text-[#ba1a1a]'
          }`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <p className="text-xs font-bold uppercase tracking-widest">{message.text}</p>
          </div>
        </div>
      )}

      {/* Metrics (Ocultas na impressão para economizar espaço, o header acima resolve) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
        <div className="bg-white p-6 rounded-xl border border-[#c1c8c2]/30 border-l-4 border-[#006C48] flex flex-col justify-between h-40 shadow-sm relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#92f7c3]/30 rounded-lg text-[#006C48]">
              <Users size={24} />
            </div>
          </div>
          <div>
            <p className="text-[#414844] text-xs font-bold uppercase tracking-wider">Atendimentos no Mês</p>
            <p className="text-4xl font-headline font-black text-[#00190f]">{formatNumber(totalAtendimentosMes)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#c1c8c2]/30 border-l-4 border-[#0e2f22] flex flex-col justify-between h-40 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#eceeed] rounded-lg text-[#0e2f22]">
              <Clock size={24} />
            </div>
            {proximas24h > 0 && <div className="w-2 h-2 bg-[#ba1a1a] rounded-full animate-pulse"></div>}
          </div>
          <div>
            <p className="text-[#414844] text-xs font-bold uppercase tracking-wider">Próximas 24h</p>
            <p className="text-4xl font-headline font-black text-[#00190f]">{formatNumber(proximas24h)}</p>
          </div>
        </div>

        <div className="bg-[#0e2f22] p-6 rounded-xl border-l-4 border-[#ba1a1a] flex flex-col justify-between h-40 relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white">
            <AlertTriangle size={120} />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="p-2 bg-white/10 rounded-lg text-[#ba1a1a]">
              <AlertTriangle size={24} fill="currentColor" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Casos Urgentes</p>
            <p className="text-4xl font-headline font-black text-white">{casosUrgentes.toString().padStart(2, '0')}</p>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-3xl overflow-hidden border border-[#c1c8c2]/40 shadow-sm print:border-none print:shadow-none">
        {/* Filters - ocultos na impressão */}
        <div className="p-6 border-b border-[#c1c8c2]/40 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div className="flex items-center p-1 bg-[#eceeed] rounded-xl w-full md:w-auto overflow-x-auto">
            {(['TODOS', 'PSICOLOGIA', 'RH'] as const)
              .filter(tab => {
                if (user?.role === 'PSICOLOGA') return tab === 'PSICOLOGIA';
                if (user?.role === 'GESTOR_RH') return tab === 'RH';
                return true;
              })
              .map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-[#00190f] shadow-sm' 
                      : 'text-[#414844]/60 hover:text-[#00190f]'
                  }`}
                >
                  {tab}
                </button>
              ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
            {(['TODOS', 'AGENDADO', 'REALIZADO', 'PENDENTE'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  statusFilter === status 
                    ? 'bg-[#006C48] text-white' 
                    : 'bg-[#eceeed] text-[#414844]/60 hover:bg-[#c1c8c2]/30'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center text-[#414844]/50 print:hidden">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest">Acessando banco de dados...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse print:text-[10pt]">
              <thead>
                <tr className="bg-[#f8faf9] border-b border-[#c1c8c2]/30 print:bg-white print:border-b-2 print:border-[#00190f]">
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] print:py-3 border-r border-[#c1c8c2]/10">Colaborador</th>
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] print:py-3 border-r border-[#c1c8c2]/10">Matrícula</th>
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] print:py-3 border-r border-[#c1c8c2]/10">Categoria</th>
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] print:py-3 border-r border-[#c1c8c2]/10">Data/Hora</th>
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] print:py-3">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-[#414844] uppercase tracking-[0.2em] text-right print:hidden">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c1c8c2]/10">
                {filteredConsultations.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f8faf9] transition-colors group print:hover:bg-transparent">
                    <td className="px-6 py-6 print:py-3 border-r border-[#c1c8c2]/10">
                      <div>
                        <p className="font-bold text-[#00190f] text-sm uppercase tracking-tight">{item.employeeName}</p>
                        <p className="text-[10px] text-[#414844]/60 font-medium uppercase">{item.employeeRole}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 print:py-3 border-r border-[#c1c8c2]/10">
                       <p className="text-xs font-bold text-[#00190f]">{item.employeeRegistration || '---'}</p>
                    </td>
                    <td className="px-6 py-6 print:py-3 border-r border-[#c1c8c2]/10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider print:px-0 print:text-black ${
                        item.category === 'PSICOLOGIA' ? 'bg-[#92f7c3]/20 text-[#00734d]' : 'bg-[#cdf139]/20 text-[#3e4c00]'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-6 print:py-3 border-r border-[#c1c8c2]/10">
                      <p className="text-xs font-bold text-[#00190f]">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                      <p className="text-[10px] text-[#414844]/60 font-black">{new Date(item.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}h</p>
                    </td>
                    <td className="px-6 py-6 print:py-3">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest print:border print:px-2 ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right print:hidden">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(item, true)}
                          className="p-2 text-[#414844] hover:bg-[#0e2f22] hover:text-white rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        {canEdit(item) && (
                          <button 
                            onClick={() => openModal(item, false)}
                            className="p-2 text-[#414844] hover:bg-[#0e2f22] hover:text-white rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        {canEdit(item) && (
                          <button 
                            onClick={() => { setSelectedConsultation(item); setIsDeleteModalOpen(true); }}
                            className="p-2 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && filteredConsultations.length === 0 && (
            <div className="py-24 text-center">
              <FileText className="mx-auto mb-4 opacity-10" size={64} />
              <p className="text-xs font-bold uppercase tracking-widest text-[#414844]/40">Nenhum registro encontrado para emissão.</p>
            </div>
          )}
        </div>
      </section>

      {/* Rodapé de autenticidade (Visual em tela, Formal em Impressão) */}
      <div className="hidden print:block mt-12 pt-8 border-t border-dashed border-[#c1c8c2]" suppressHydrationWarning>
        <div className="grid grid-cols-2 gap-12">
          <div className="text-center pt-8 border-t border-[#00190f]">
            <p className="text-xs font-bold uppercase tracking-widest">Assinatura Responsável</p>
            <p className="text-[10px] text-[#414844]/60 mt-1">{user?.role || 'Setor Técnico'}</p>
          </div>
          <div className="text-center pt-8 border-t border-[#00190f]">
            <p className="text-xs font-bold uppercase tracking-widest">Data de Emissão</p>
            <p className="text-[10px] text-[#414844]/60 mt-1">{now.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-center text-[8px] text-[#414844]/30 mt-16 uppercase tracking-[0.4em]">Documento Gerado Eletronicamente via RH PAISA CRM</p>
      </div>

      <section className="bg-[#0e2f22] rounded-3xl p-10 relative overflow-hidden group shadow-2xl print:hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full overflow-hidden opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1596491295304-48616fa9c808?q=80&w=2000&auto=format&fit=crop" 
            alt="Nature" 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
          />
        </div>
        <div className="max-w-2xl relative z-10">
          <h3 className="text-3xl font-headline font-black text-[#c7ebd7] mb-6 uppercase tracking-tight italic leading-none">Excelência em Atendimento</h3>
          <p className="text-white/70 leading-relaxed font-medium">
             Acompanhe o histórico de cada colaborador com precisão técnica. Utilize o botão **Baixar Relatório** para gerar o PDF oficial e arquivar digitalmente.
          </p>
        </div>
      </section>

      {/* Modais omitidos aqui por brevidade, mas devem permanecer iguais no arquivo */}
      {/* (Modal Novo/Edit/View Atendimento, Confirm Reset Modal, Confirm Delete Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#00190f]/90 backdrop-blur-xl print:hidden">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp border border-white/20">
            <div className="p-8 bg-[#00190f] text-white flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006C48] via-[#92f7c3] to-[#006C48]"></div>
              <div>
                <h3 className="text-2xl font-black font-headline uppercase tracking-tighter leading-none italic">
                  {isViewOnly ? 'Visualizar Registro' : selectedConsultation ? 'Editar Atendimento' : 'Novo Atendimento'}
                </h3>
                <p className="text-[#ABCFBB]/50 text-[10px] font-bold uppercase tracking-widest mt-2">Medicina e RH • Usina Paisa</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar font-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Nome do Colaborador</label>
                  <input 
                    required
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    placeholder="Nome completo"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Matrícula</label>
                  <input 
                    required
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    placeholder="Ex: 00123"
                    value={formData.employeeRegistration}
                    onChange={(e) => setFormData({ ...formData, employeeRegistration: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Cargo / Setor</label>
                  <input 
                    required
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    placeholder="Ex: Operacional"
                    value={formData.employeeRole}
                    onChange={(e) => setFormData({ ...formData, employeeRole: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Categoria</label>
                  <select 
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {(user?.role === 'ADMIN' || user?.role === 'SECRETARIA') && (
                      <>
                        <option value="PSICOLOGIA">PSICOLOGIA</option>
                        <option value="RH">RH (GESTÃO DE PESSOAS)</option>
                      </>
                    )}
                    {user?.role === 'PSICOLOGA' && <option value="PSICOLOGIA">PSICOLOGIA</option>}
                    {user?.role === 'GESTOR_RH' && <option value="RH">RH (GESTÃO DE PESSOAS)</option>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Data e Hora</label>
                  <input 
                    type="datetime-local"
                    required
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Status</label>
                  <select 
                    disabled={isViewOnly}
                    className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm font-bold disabled:opacity-50"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="AGENDADO">AGENDADO</option>
                    <option value="REALIZADO">REALIZADO</option>
                    <option value="PENDENTE">PENDENTE (URGENTE)</option>
                    <option value="CANCELADO">CANCELADO</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#414844]">Observações Confidenciais</label>
                <textarea 
                  disabled={isViewOnly}
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-xl text-sm min-h-[120px] font-medium disabled:opacity-50"
                  placeholder="Relato detalhado preservando o sigilo..."
                  value={formData.observation}
                  onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                />
              </div>

              {!isViewOnly && (
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#006C48] text-white py-5 rounded-2xl font-headline font-black uppercase tracking-[0.3em] italic text-sm hover:bg-[#00190f] transition-all disabled:opacity-50 shadow-2xl shadow-[#006C48]/20"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'CONFIRMAR OPERAÇÃO'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {isResetModalOpen && (
        <ConfirmModal 
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleReset}
          title="Zerar Fila do Mês?"
          description="Esta ação arquivará e removerá permanentemente todos os atendimentos visíveis. Esta operação não pode ser desfeita."
          confirmText="Confirmar Limpeza"
          cancelText="Manter Dados"
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Remover Registro?"
          description={`Você está excluindo permanentemente o atendimento de ${selectedConsultation?.employeeName}.`}
          confirmText="Confirmar Exclusão"
          cancelText="Manter Registro"
        />
      )}
    </div>
  );
}
