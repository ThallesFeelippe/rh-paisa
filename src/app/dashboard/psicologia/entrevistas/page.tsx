'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText as FileTextIcon, 
  Plus as PlusIcon, 
  Search as SearchIcon, 
  Trash2 as Trash2Icon, 
  Calendar as CalendarIcon, 
  User as UserIcon, 
  ChevronRight as ChevronRightIcon, 
  AlertCircle as AlertCircleIcon, 
  CheckCircle as CheckCircleIcon, 
  Loader2 as Loader2Icon, 
  Clock as ClockIcon, 
  Briefcase as BriefcaseIcon, 
  UserCheck as UserCheckIcon, 
  UserX as UserXIcon, 
  FileSearch as FileSearchIcon, 
  Download as DownloadIcon,
  ClipboardList as ClipboardListIcon
} from 'lucide-react';
import { getInterviews, createInterview, deleteInterview, getEmployees } from './actions';

export default function PsychologicalInterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    type: 'ATIVO',
    category: 'ACOMPANHAMENTO',
    date: new Date().toISOString().split('T')[0],
    content: '',
    conclusion: '',
    status: 'ABERTO'
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const [interviewsData, employeesData] = await Promise.all([
        getInterviews(),
        getEmployees()
      ]);
      setInterviews(interviewsData || []);
      setEmployees(employeesData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownloadPDF = async (interview: any) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(14, 47, 34); // emerald-950
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('LAUDO PSICOLÓGICO', 105, 25, { align: 'center' });
      
      // Content
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`Funcionário: ${interview.employeeName}`, 20, 60);
      doc.text(`Matrícula: ${interview.employee?.registrationNumber || 'N/A'}`, 20, 70);
      doc.text(`Tipo: ${interview.type}`, 20, 80);
      doc.text(`Categoria: ${interview.category}`, 20, 90);
      doc.text(`Data: ${new Date(interview.date).toLocaleDateString('pt-BR')}`, 20, 100);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 110, 190, 110);
      
      doc.setFontSize(14);
      doc.text('Relato / Observações:', 20, 125);
      doc.setFontSize(11);
      const contentLines = doc.splitTextToSize(interview.content, 170);
      doc.text(contentLines, 20, 135);
      
      const nextY = 135 + (contentLines.length * 6) + 15;
      
      doc.setFontSize(14);
      doc.text('Conclusão:', 20, nextY);
      doc.setFontSize(11);
      const conclusionLines = doc.splitTextToSize(interview.conclusion || 'Sem conclusão registrada.', 170);
      doc.text(conclusionLines, 20, nextY + 10);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Gerado pelo Ecossistema RH Paisa', 105, 285, { align: 'center' });
      
      doc.save(`Entrevista_${interview.employeeName.replace(/ /g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF Error:', err);
      alert('Erro ao gerar PDF.');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const res = await createInterview(data);
      if (res.success) {
        setMessage({ text: 'Entrevista registrada com sucesso!', type: 'success' });
        setTimeout(() => {
            setIsModalOpen(false);
            setFormData({
                employeeName: '',
                employeeId: '',
                type: 'ATIVO',
                category: 'ACOMPANHAMENTO',
                date: new Date().toISOString().split('T')[0],
                content: '',
                conclusion: '',
                status: 'ABERTO'
            });
            fetchData();
        }, 1500);
      } else {
        setMessage({ text: res.message || 'Erro ao registrar entrevista.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erro de comunicação com o servidor.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este registro permanentemente?')) return;

    try {
      const res = await deleteInterview(id);
      if (res.success) {
        fetchData();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert('Erro ao excluir.');
    }
  };

  const filteredInterviews = interviews.filter(i => 
    i.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.employee?.registrationNumber?.includes(searchTerm)
  );

  const getStatusStyle = (type: string) => {
    switch(type) {
      case 'ATIVO': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'INATIVO': return 'bg-red-50 text-red-700 border-red-100';
      case 'CONTRATO': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'ATIVO': return <UserCheckIcon size={14} />;
      case 'INATIVO': return <UserXIcon size={14} />;
      case 'CONTRATO': return <BriefcaseIcon size={14} />;
      default: return <FileTextIcon size={14} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-emerald-950 tracking-tighter uppercase italic font-headline mb-2">
            Entrevistas de Funcionários
          </h1>
          <p className="text-slate-400 text-sm font-medium">Gestão de avaliações e acompanhamentos psicológicos.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-950 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all flex items-center justify-center gap-3 active:scale-95 group"
        >
          <PlusIcon size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          Nova Entrevista
        </button>
      </header>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-[32px] shadow-2xl shadow-emerald-950/5 border border-slate-50 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input 
            type="text"
            placeholder="Pesquisar por nome ou matrícula..."
            className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table/List */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-emerald-950/5 border border-slate-50 overflow-hidden">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <Loader2Icon className="animate-spin text-emerald-600 w-10 h-10" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Carregando registros...</p>
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-6 opacity-40 italic">
            <FileSearchIcon size={64} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-400">Nenhuma entrevista encontrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-10 py-6">Funcionário / Candidato</th>
                  <th className="px-10 py-6 text-center">Tipo</th>
                  <th className="px-10 py-6">Categoria</th>
                  <th className="px-10 py-6">Data</th>
                  <th className="px-10 py-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                          <UserIcon size={24} />
                        </div>
                        <div>
                          <p className="font-black text-emerald-950 uppercase italic text-sm">{interview.employeeName}</p>
                          <p className="text-[10px] text-slate-400 font-bold tracking-tight">
                            {interview.employee?.registrationNumber || 'Sem matrícula'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border italic ${getStatusStyle(interview.type)}`}>
                        {getIcon(interview.type)}
                        {interview.type}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{interview.category}</p>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2 text-slate-400">
                        <CalendarIcon size={14} />
                        <span className="text-xs font-medium">
                          {new Date(interview.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleDownloadPDF(interview)}
                            className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                            title="Baixar PDF"
                        >
                            <DownloadIcon size={20} />
                        </button>
                        <button 
                            onClick={() => handleDelete(interview.id)}
                            className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                            title="Excluir"
                        >
                            <Trash2Icon size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for New Interview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-md animate-fade">
          <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh] animate-scale">
            {/* Modal Header */}
            <div className="p-10 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 uppercase italic font-headline">Novo Registro de Entrevista</h2>
                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">Preencha os detalhes da avaliação psicológica</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-12 h-12 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all"
              >
                <ChevronRightIcon className="rotate-90" size={24} />
              </button>
            </div>

            {/* Modal Body & Form */}
            <form onSubmit={handleCreate} className="flex-1 overflow-y-auto flex flex-col max-h-full">
              <div className="p-10 space-y-10 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Employee Selection */}
                    <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Funcionário / Candidato</label>
                    <div className="relative group">
                        <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                        <input 
                        type="text"
                        list="employees-list"
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        placeholder="Nome completo..."
                        value={formData.employeeName}
                        onChange={e => {
                            const selected = employees.find(emp => emp.name === e.target.value);
                            setFormData({ 
                            ...formData, 
                            employeeName: e.target.value,
                            employeeId: selected ? selected.id : ''
                            });
                        }}
                        required
                        />
                        <datalist id="employees-list">
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.name}>{emp.registrationNumber || ''}</option>
                        ))}
                        </datalist>
                    </div>
                    </div>

                    {/* Type Selection */}
                    <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Situação</label>
                    <div className="flex gap-4">
                        {['ATIVO', 'INATIVO', 'CONTRATO'].map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, type })}
                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border italic ${
                            formData.type === type 
                                ? 'bg-emerald-950 text-white border-emerald-950 shadow-lg shadow-emerald-950/20' 
                                : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                            }`}
                        >
                            {type}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Categoria</label>
                    <select 
                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all appearance-none cursor-pointer"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="ADMISSÃO">ADMISSÃO</option>
                        <option value="ACOMPANHAMENTO">ACOMPANHAMENTO</option>
                        <option value="DESLIGAMENTO">DESLIGAMENTO</option>
                        <option value="PROMOÇÃO">PROMOÇÃO</option>
                    </select>
                    </div>

                    {/* Date Selection */}
                    <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Data da Entrevista</label>
                    <div className="relative group">
                        <CalendarIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                        <input 
                        type="date"
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-emerald-950 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                        />
                    </div>
                    </div>
                </div>

                {/* Content / Observations */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Relato da Entrevista / Observações</label>
                    <textarea 
                    className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all min-h-[200px] resize-none"
                    placeholder="Descreva o que foi conversado e pontos relevantes..."
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    required
                    />
                </div>

                {/* Conclusion */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block ml-2">Conclusão / Parecer Psicológico</label>
                    <textarea 
                    className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all min-h-[120px] resize-none border-dashed"
                    placeholder="Considerações finais..."
                    value={formData.conclusion}
                    onChange={e => setFormData({ ...formData, conclusion: e.target.value })}
                    />
                </div>

                {message.text && (
                    <div className={`p-6 rounded-3xl flex items-center gap-4 text-sm font-bold animate-fade ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {message.type === 'success' ? <CheckCircleIcon size={20} /> : <AlertCircleIcon size={20} />}
                    {message.text}
                    </div>
                )}
              </div>

              {/* Modal Footer (Inside Form) */}
              <div className="p-10 border-t border-slate-100 flex justify-end gap-4 bg-slate-50/30">
                <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white transition-all"
                >
                    Cancelar
                </button>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-950 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95 group"
                >
                    {isSubmitting ? <Loader2Icon className="animate-spin w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                    {isSubmitting ? 'SALVANDO...' : 'SALVAR REGISTRO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
