'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronRight,
  Search,
  Filter,
  FileDown,
  Stethoscope,
  Calendar,
  AlertCircle,
  Clock,
  UserX,
  X,
  UploadCloud,
  CheckCircle2,
  Loader2,
  User as UserIcon,
  Tag,
  Briefcase,
  MapPin,
  FileText,
  Database,
  ExternalLink,
  Eye
} from 'lucide-react';
import { 
  getLeaves, 
  getEmployees, 
  getLeaveTypes, 
  createLeave, 
  createLeaveType,
  updateLeave,
  seedAfastados 
} from '../actions';

export default function GestaoAfastados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [newTypeName, setNewTypeName] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    employeeId: '',
    leaveTypeId: '',
    startDate: '',
    expectedReturn: '',
    observation: '',
    documentUrl: '',
    status: 'ATIVO'
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [leavesData, employeesData, typesData] = await Promise.all([
        getLeaves(),
        getEmployees(),
        getLeaveTypes()
      ]);
      setLeaves(leavesData);
      setEmployees(employeesData);
      setLeaveTypes(typesData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdateLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.leaveTypeId || !formData.startDate) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    try {
      const result = isEditing 
        ? await updateLeave(formData.id, formData)
        : await createLeave(formData);

      if (result.success) {
        setIsModalOpen(false);
        setIsEditing(false);
        resetForm();
        fetchInitialData();
        if (isDetailOpen && selectedLeave?.id === formData.id) {
            // Update the detail view if it's open
            const updated = await getLeaves();
            const current = updated.find(l => l.id === formData.id);
            setSelectedLeave(current);
        }
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
        id: '',
        employeeId: '',
        leaveTypeId: '',
        startDate: '',
        expectedReturn: '',
        observation: '',
        documentUrl: '',
        status: 'ATIVO'
    });
  };

  const handleEdit = (leave: any) => {
    setIsEditing(true);
    setFormData({
        id: leave.id,
        employeeId: leave.employeeId,
        leaveTypeId: leave.leaveTypeId,
        startDate: new Date(leave.startDate).toISOString().split('T')[0],
        expectedReturn: leave.expectedReturn ? new Date(leave.expectedReturn).toISOString().split('T')[0] : '',
        observation: leave.observation || '',
        documentUrl: leave.documentUrl || '',
        status: leave.status
    });
    setIsDetailOpen(false); // Fecha o painel de detalhes para abrir o de edição
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('files', file);
    uploadFormData.append('type', 'certificate');

    try {
      const response = await fetch('/api/upload/employees', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, documentUrl: data.paths[0] });
      } else {
        alert('Erro no upload: ' + data.error);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Erro técnico no upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTypeName) return;
    try {
      const result = await createLeaveType(newTypeName);
      if (result.success) {
        setNewTypeName('');
        setIsTypeModalOpen(false);
        const types = await getLeaveTypes();
        setLeaveTypes(types);
      } else {
        alert("Erro ao salvar tipo: " + result.error);
      }
    } catch (err: any) {
      console.error('Type create error:', err);
      alert("Erro técnico: " + err.message);
    }
  };

  const handleSeed = async () => {
    if (!confirm('Deseja popular o banco com 3 registros de exemplo?')) return;
    setIsLoading(true);
    try {
      const result = await seedAfastados();
      if (result.success) {
        fetchInitialData();
      } else {
        alert(result.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Seed error:', err);
      setIsLoading(false);
    }
  };

  const filteredLeaves = leaves.filter(l => 
    l.employee?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.employee?.registrationNumber?.includes(searchTerm) ||
    l.leaveType?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ATIVO':
        return (
          <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Ativo
          </span>
        );
      case 'CONCLUIDO':
        return (
            <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 bg-blue-100 text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Concluído
            </span>
          );
      default:
        return (
          <span className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 bg-slate-100 text-slate-500">
            {status}
          </span>
        );
    }
  };

  if (isLoading && leaves.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Carregando Ecossistema de Saúde...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade text-on-background">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => window.history.back()}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all hover:border-emerald-200 shadow-sm group"
                title="Voltar"
            >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
            </button>
            <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight flex items-center gap-3">
              <Stethoscope className="text-emerald-600" />
              Gestão de Afastados
            </h1>
          </div>
          <p className="text-slate-500 ml-12 font-medium">Monitoramento em tempo real do ecossistema de capital humano industrial.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeed}
            className="bg-white text-slate-400 px-4 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-emerald-600 transition-all border border-slate-200 shadow-sm"
            title="Seed Data"
          >
            <Database size={16} />
          </button>
          <button 
            onClick={() => setIsTypeModalOpen(true)}
            className="bg-white text-emerald-950 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
          >
            <Tag size={18} />
            Tipos
          </button>
          <button 
            onClick={() => { setIsEditing(false); resetForm(); setIsModalOpen(true); }}
            className="bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Novo Afastamento
          </button>
        </div>
      </header>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <UserX size={80} className="text-emerald-950" />
          </div>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <UserX size={20} />
            </div>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ATIVO</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Afastados</p>
            <p className="text-3xl font-headline font-black text-emerald-950 italic">{leaves.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Calendar size={20} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipos Cadastrados</p>
            <p className="text-3xl font-headline font-black text-emerald-950 italic">{leaveTypes.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Colaboradores Monitorados</p>
            <p className="text-3xl font-headline font-black text-emerald-950 italic">{employees.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Média do Ecossistema</p>
            <p className="text-3xl font-headline font-black text-emerald-950 italic">Constante</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Type Distribution Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-950">Tipos Ativos</h3>
              <FileDown size={16} className="text-slate-300" />
            </div>

            <div className="space-y-3">
              {leaveTypes.slice(0, 5).map((type) => (
                <div key={type.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-950 uppercase italic tracking-tight">{type.name}</p>
                    </div>
                  </div>
                </div>
              ))}
              {leaveTypes.length > 5 && (
                <button 
                    onClick={() => setIsTypeModalOpen(true)}
                    className="w-full py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
                >
                    Ver todos ({leaveTypes.length})
                </button>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] h-48 bg-emerald-950 group">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
              alt="Nature" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-emerald-950/80 to-transparent">
              <h4 className="text-white text-lg font-black font-headline uppercase italic tracking-tight">Eco-Saúde PAISA</h4>
              <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest mt-1">Gestão inteligente de afastamentos.</p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden flex flex-col h-full">
            {/* Filters */}
            <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 items-center bg-slate-50/30">
              <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar colaborador..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/10 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Colaborador</th>
                    <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Motivo</th>
                    <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Início</th>
                    <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredLeaves.map((l) => (
                    <tr 
                        key={l.id} 
                        className="group hover:bg-emerald-50/30 transition-all cursor-pointer"
                        onClick={() => { setSelectedLeave(l); setIsDetailOpen(true); }}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                            {l.employee?.photoUrl ? (
                                <img src={l.employee.photoUrl} alt={l.employee.name} className="w-full h-full object-cover" />
                            ) : (
                                <UserIcon size={18} className="text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-headline font-black text-emerald-950 uppercase italic tracking-tight">{l.employee?.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Matrícula: {l.employee?.registrationNumber || '-'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-[10px] font-black text-emerald-900 uppercase italic tracking-tight">{l.leaveType?.name}</p>
                      </td>
                      <td className="px-6 py-6">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {new Date(l.startDate).toLocaleDateString('pt-BR')}
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        {getStatusBadge(l.status)}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleEdit(l); }}
                                className="p-2 text-slate-300 hover:text-emerald-600 transition-colors"
                                title="Editar"
                            >
                                <Pencil size={18} />
                            </button>
                            <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeaves.length === 0 && !isLoading && (
                    <tr>
                        <td colSpan={5} className="p-20 text-center animate-fade">
                            <UserX size={40} className="mx-auto text-slate-100 mb-4" />
                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Nenhum registro encontrado</p>
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Cadastro / Edição de Afastamento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden border border-emerald-50 animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="bg-emerald-950 p-8 text-white flex justify-between items-center shrink-0">
              <div className="space-y-1">
                <h3 className="text-2xl font-black font-headline uppercase italic tracking-hide">
                    {isEditing ? 'Editar Afastamento' : 'Novo Afastamento'}
                </h3>
                <p className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest">Módulo de Saúde Ocupacional</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleCreateOrUpdateLeave} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Colaborador Ativo</label>
                    <select 
                      required
                      disabled={isEditing}
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase italic focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:opacity-50"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    >
                      <option value="">Selecione o funcionário...</option>
                      {employees.map(e => (
                          <option key={e.id} value={e.id}>{e.name} ({e.registrationNumber})</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Afastamento</label>
                    <select 
                      required
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase italic focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      value={formData.leaveTypeId}
                      onChange={(e) => setFormData({...formData, leaveTypeId: e.target.value})}
                    >
                      <option value="">Selecione a categoria...</option>
                      {leaveTypes.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1 flex items-end">
                      <button 
                          type="button"
                          onClick={() => setIsTypeModalOpen(true)}
                          className="w-full py-4 border border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                      >
                          + Cadastrar Novo Tipo
                      </button>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Início</label>
                    <input 
                      required
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Previsão Retorno</label>
                    <input 
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                      type="date"
                      value={formData.expectedReturn}
                      onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações Médicas / Gerais</label>
                      <textarea 
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none min-h-[100px]"
                          placeholder="Detalhes sobre o motivo ou CID..."
                          value={formData.observation}
                          onChange={(e) => setFormData({...formData, observation: e.target.value})}
                      ></textarea>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Anexo de Atestado / Documentação</label>
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-[24px] p-8 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                        formData.documentUrl 
                          ? 'bg-emerald-50 border-emerald-200' 
                          : 'bg-slate-50/50 border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-200'
                      }`}
                    >
                      {isUploading ? (
                          <Loader2 size={32} className="animate-spin text-emerald-600 mb-2" />
                      ) : formData.documentUrl ? (
                          <>
                              <CheckCircle2 size={32} className="text-emerald-600 mb-2" />
                              <p className="text-xs font-black text-emerald-950 uppercase italic">Documento Anexado</p>
                              <p className="text-[9px] text-emerald-600 font-bold uppercase mt-1">Clique para substituir</p>
                          </>
                      ) : (
                          <>
                              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors mb-3">
                                  <UploadCloud size={24} />
                              </div>
                              <p className="text-xs font-black text-emerald-950 uppercase italic tracking-tight">Clique para anexar arquivo</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">PDF, JPG ou PNG (Máx 5MB)</p>
                          </>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                      <div className="col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status do Afastamento</label>
                          <select 
                              className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase italic focus:ring-2 focus:ring-emerald-500/20 outline-none"
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value})}
                          >
                              <option value="ATIVO">Ativo</option>
                              <option value="CONCLUIDO">Concluído / Retornou</option>
                              <option value="CANCELADO">Cancelado / Erro</option>
                          </select>
                      </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-colors">Cancelar</button>
                  <button type="submit" disabled={isUploading} className="flex-1 py-4 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                    <CheckCircle2 size={16} /> {isEditing ? 'Atualizar Registro' : 'Salvar Registro'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cadastro de Tipo */}
      {isTypeModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md" onClick={() => setIsTypeModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative z-10 p-8 animate-in zoom-in duration-300">
            <h3 className="text-xl font-black font-headline uppercase italic text-emerald-950 mb-6">Cadastrar Tipo</h3>
            <form onSubmit={handleCreateType} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição do Tipo</label>
                    <input 
                        required
                        autoFocus
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
                        placeholder="Ex: Licença Paternidade"
                        value={newTypeName}
                        onChange={(e) => setNewTypeName(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setIsTypeModalOpen(false)} className="flex-1 py-3 text-slate-400 text-[10px] font-black uppercase rounded-xl">Cancelar</button>
                    <button type="submit" className="flex-1 py-3 bg-emerald-950 text-white text-[10px] font-black uppercase rounded-xl hover:bg-black transition-all">Salvar</button>
                </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal/Detail: Acompanhamento de Afastamento */}
      {isDetailOpen && selectedLeave && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end">
          <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)}></div>
          <div className="bg-white h-full w-full max-w-xl relative z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-emerald-50 animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[24px] bg-white shadow-sm overflow-hidden border-2 border-white shrink-0">
                        {selectedLeave.employee?.photoUrl ? (
                            <img src={selectedLeave.employee.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-emerald-200">
                                <UserIcon size={32} />
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-black font-headline uppercase italic text-emerald-950">{selectedLeave.employee?.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedLeave.employee?.position}</p>
                    </div>
                </div>
                <button onClick={() => setIsDetailOpen(false)} className="w-12 h-12 rounded-2xl bg-white text-slate-400 hover:text-emerald-600 shadow-sm transition-all flex items-center justify-center shrink-0">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Informações do Registro</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Motivo do Afastamento</p>
                            <p className="text-sm font-headline font-black text-emerald-900 uppercase">{selectedLeave.leaveType?.name}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Atual</p>
                            <div className="mt-1">{getStatusBadge(selectedLeave.status)}</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Início</p>
                            <p className="text-sm font-bold text-slate-600">{new Date(selectedLeave.startDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Previsão Retorno</p>
                            <p className="text-sm font-bold text-emerald-900">
                                {selectedLeave.expectedReturn ? new Date(selectedLeave.expectedReturn).toLocaleDateString('pt-BR') : 'Não informada'}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acompanhamento / Observações</h4>
                    <div className="p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm italic text-slate-600 text-sm leading-relaxed">
                        {selectedLeave.observation || 'Nenhuma observação cadastrada para este registro.'}
                    </div>
                </section>

                <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dados Corporativos</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl">
                            <Briefcase className="text-slate-300" size={18} />
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase">Setor</p>
                                <p className="text-xs font-bold text-slate-600">{selectedLeave.employee?.sector?.name || 'Não vinculado'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl">
                            <MapPin className="text-slate-300" size={18} />
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase">Unidade</p>
                                <p className="text-xs font-bold text-slate-600">{selectedLeave.employee?.workLocation?.name || 'Sede Central'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anexos de Saúde</h4>
                    {selectedLeave.documentUrl ? (
                         <div className="group relative overflow-hidden rounded-[24px] border border-emerald-100 bg-emerald-50/30 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl text-emerald-600">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-emerald-950 uppercase italic tracking-hide">Documento Anexado</p>
                                    <p className="text-[9px] font-bold text-emerald-600 uppercase">Sincronizado com o sistema</p>
                                </div>
                            </div>
                            <a 
                                href={selectedLeave.documentUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                            >
                                <Eye size={16} />
                                <span className="text-[10px] font-black uppercase">Ver</span>
                            </a>
                         </div>
                    ) : (
                        <div className="p-6 border-2 border-dashed border-slate-100 rounded-[24px] flex flex-col items-center justify-center text-slate-300 bg-slate-50/30">
                            <FileText size={32} className="mb-2" />
                            <p className="text-[10px] font-black uppercase">Nenhum documento anexado</p>
                        </div>
                    )}
                </section>
            </div>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 shrink-0 flex gap-4">
                <button 
                    onClick={() => handleEdit(selectedLeave)}
                    className="flex-1 py-4 bg-emerald-950 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    <Pencil size={14} /> Editar Registro
                </button>
                <button className="flex-1 py-4 border border-red-100 text-red-500 bg-white rounded-2xl text-[10px] font-black uppercase hover:bg-red-50 transition-all shadow-sm">
                    Arquivar Afastamento
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
