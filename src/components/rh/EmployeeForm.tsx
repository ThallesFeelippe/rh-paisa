'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Image as ImageIcon, 
  User, 
  FileText,
  Loader2,
  Upload,
  Send,
  GraduationCap,
  Calendar,
  CreditCard,
  Briefcase,
  MapPin,
  Trash2,
  CheckCircle2,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';
import { getSectors, getWorkLocations } from '@/app/dashboard/rh/actions';

interface EmployeeFormProps {
  initialData?: any;
  isApprentice?: boolean;
  isReadOnly?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

type TabType = 'IDENTIDADE' | 'CONTRATO' | 'EDUCACAO' | 'CARREIRA' | 'DOCUMENTOS';

export default function EmployeeForm({ initialData, isApprentice = false, isReadOnly = false, onSuccess, onCancel }: EmployeeFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('IDENTIDADE');
  const [sectors, setSectors] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    cpf: initialData?.cpf || '',
    rg: initialData?.rg || '',
    registrationNumber: initialData?.registrationNumber || '',
    birthDate: initialData?.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '',
    sectorId: initialData?.sectorId || '',
    workLocationId: initialData?.workLocationId || '',
    position: initialData?.position || (isApprentice ? 'Jovem Aprendiz' : ''),
    salary: initialData?.salary || 0,
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    contractEnd: initialData?.contractEnd ? new Date(initialData.contractEnd).toISOString().split('T')[0] : '',
    isApprentice: initialData?.isApprentice ?? isApprentice,
    
    // RH Specific
    educationLevel: initialData?.educationLevel || 'Médio',
    educationDetail: initialData?.educationDetail || '',
    careerPlan: initialData?.careerPlan || '',
    
    // Apprentice Specific
    observationApprentice: initialData?.observationApprentice || '',
    grades: initialData?.grades || '',
    description: initialData?.description || '',
    
    photoUrl: initialData?.photoUrl || '',
  });

  const [documents, setDocuments] = useState<any[]>(initialData?.documents || []);
  const [courses, setCourses] = useState<any[]>(initialData?.courses || []);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadResources() {
      const [s, l] = await Promise.all([getSectors(), getWorkLocations()]);
      setSectors(s);
      setLocations(l);
    }
    loadResources();
  }, []);

  const [uploadingCourseIdx, setUploadingCourseIdx] = useState<number | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'document' | 'certificate', courseIdx?: number) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const data = new FormData();
    data.append('files', files[0]);
    data.append('type', type === 'photo' ? 'photos' : type === 'certificate' ? 'certificates' : 'docs');

    try {
      const res = await fetch('/api/upload/employees', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      
      if (result.success) {
        const path = result.paths[0];
        if (type === 'photo') {
          setFormData(prev => ({ ...prev, photoUrl: path }));
        } else if (type === 'document') {
          setDocuments(prev => [...prev, { name: files[0].name, url: path }]);
        } else if (type === 'certificate' && courseIdx !== undefined) {
          updateCourse(courseIdx, 'certificateUrl', path);
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Falha no upload do arquivo.');
    } finally {
      setIsUploading(false);
      setUploadingCourseIdx(null);
      e.target.value = '';
    }
  };

  const handleCreateCourse = () => {
    setCourses([...courses, { name: '', institution: '', completionDate: '', certificateUrl: '' }]);
  };

  const updateCourse = (index: number, field: string, value: any) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { createEmployee, updateEmployee } = await import('@/app/dashboard/rh/actions');
      const payload = {
        ...formData,
        documents,
        courses
      };

      const result = initialData 
        ? await updateEmployee(initialData.id, payload)
        : await createEmployee(payload);

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError('Erro ao salvar no servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: TabType, label: string, icon: any }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
        activeTab === id 
        ? 'border-emerald-600 text-emerald-950 bg-emerald-50/30' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row h-[85vh] animate-fade">
      {/* Sidebar Nav */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Briefcase size={18} />
            </div>
            <span className="font-headline font-black text-emerald-950 uppercase tracking-tighter text-sm italic italic">RH Paisa</span>
        </div>

        <div className="flex flex-col gap-1">
            <TabButton id="IDENTIDADE" label="Dados Pessoais" icon={User} />
            <TabButton id="CONTRATO" label="Trabalho" icon={Briefcase} />
            {(isApprentice || formData.isApprentice) && <TabButton id="IDENTIDADE" label="Educação" icon={BookOpen} />} 
            <TabButton id="EDUCACAO" label="Certificados" icon={Award} />
            <TabButton id="CARREIRA" label="Plano de Carreira" icon={GraduationCap} />
            <TabButton id="DOCUMENTOS" label="Documentos" icon={FileText} />
        </div>

        <div className="mt-auto pt-8 border-t border-slate-200">
            <div className={`p-4 rounded-2xl flex items-center gap-3 ${isApprentice ? 'bg-amber-100/50' : 'bg-emerald-100/50'}`}>
                <CheckCircle2 size={20} className={isApprentice ? 'text-amber-600' : 'text-emerald-600'} />
                <div>
                    <p className="text-[9px] font-black text-slate-900 uppercase">Perfil</p>
                    <p className={`text-[10px] font-bold uppercase ${isApprentice ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {isApprentice ? 'Jovem Aprendiz' : 'Funcionário CLT'}
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col relative overflow-hidden">
        {/* Header with Back button */}
        <div className="absolute top-6 right-8 z-50">
            <button 
                type="button"
                onClick={onCancel}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-all bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-100 shadow-sm"
            >
                <ChevronRight className="rotate-180" size={14} />
                Voltar
            </button>
        </div>

        {error && (
            <div className="mx-8 mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
                <X className="w-5 h-5 flex-shrink-0 cursor-pointer" onClick={() => setError(null)} />
                <p className="font-medium">{error}</p>
            </div>
        )}

        <fieldset disabled={isReadOnly} className="flex-grow overflow-y-auto p-12 custom-scrollbar">
            {activeTab === 'IDENTIDADE' && (
                <div className="space-y-10 animate-fade-up">
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div 
                            onClick={() => photoInputRef.current?.click()}
                            className="w-32 h-32 rounded-[40px] bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden relative group"
                        >
                            {formData.photoUrl ? (
                                <img src={formData.photoUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center italic">
                                    <ImageIcon className="mx-auto text-slate-300" size={32} />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 block">Foto 3x4</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-emerald-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Upload size={24} className="text-white" />
                            </div>
                        </div>
                        <input type="file" ref={photoInputRef} className="hidden" onChange={e => handleFileUpload(e, 'photo')} accept="image/*" />

                        <div className="flex-grow space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome Completo</label>
                                <input 
                                    required 
                                    className="w-full px-0 py-2 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 transition-all outline-none text-2xl font-black text-emerald-950 placeholder:text-slate-200 uppercase italic font-headline" 
                                    placeholder="NOME DO COLABORADOR" 
                                    value={formData.name} 
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">CPF</label>
                                    <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" placeholder="000.000.000-00" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">RG</label>
                                    <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" placeholder="00.000.000-0" value={formData.rg} onChange={e => setFormData({ ...formData, rg: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data de Nascimento</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Matrícula</label>
                            <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" placeholder="Ex: 2024001" value={formData.registrationNumber} onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })} />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Observação Interna</label>
                        <textarea 
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-600 italic" 
                            placeholder="Alguma observação importante sobre o colaborador..." 
                            value={formData.observationApprentice} 
                            onChange={e => setFormData({ ...formData, observationApprentice: e.target.value })} 
                        />
                    </div>
                </div>
            )}

            {activeTab === 'CONTRATO' && (
                <div className="space-y-10 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Setor (Área Pai)</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950"
                                value={locations.find(l => l.id === formData.workLocationId)?.parentId || locations.find(l => l.id === formData.workLocationId)?.id || ''}
                                onChange={e => {
                                    // When sector changes, we clear or update the unit
                                    const locId = e.target.value;
                                    setFormData({ ...formData, workLocationId: locId });
                                }}
                            >
                                <option value="">Selecionar Setor</option>
                                {locations.filter(l => l.parentId === null).map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unidade / Subárea</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950"
                                value={formData.workLocationId}
                                onChange={e => setFormData({ ...formData, workLocationId: e.target.value })}
                                disabled={!locations.find(l => l.id === formData.workLocationId)?.parentId && !locations.filter(l => l.parentId === formData.workLocationId).length}
                            >
                                <option value="">Selecionar Unidade</option>
                                {locations
                                    .filter(l => {
                                        const currentParent = locations.find(loc => loc.id === formData.workLocationId)?.parentId || formData.workLocationId;
                                        return l.parentId === currentParent;
                                    })
                                    .map(l => (
                                        <option key={l.id} value={l.id}>{l.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-slate-100">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cargo</label>
                            <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data de Admissão</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fim do Contrato</label>
                            <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" value={formData.contractEnd} onChange={e => setFormData({ ...formData, contractEnd: e.target.value })} />
                        </div>
                    </div>

                    {isApprentice && (
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notas / Avaliação Escolar</label>
                            <input className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" placeholder="Média ou Comportamento" value={formData.grades} onChange={e => setFormData({ ...formData, grades: e.target.value })} />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'EDUCACAO' && (
                <div className="space-y-10 animate-fade-up">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-headline font-black text-emerald-950 uppercase italic tracking-tight">Cursos e Certificações</h3>
                        <button 
                            type="button" 
                            onClick={handleCreateCourse}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2"
                        >
                            <Plus size={14} /> Adicionar Curso
                        </button>
                    </div>

                    <div className="space-y-6">
                        {courses.map((course, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4 relative group">
                                <button type="button" onClick={() => removeCourse(idx)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Nome do Curso</label>
                                        <input className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold" value={course.name} onChange={e => updateCourse(idx, 'name', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Instituição</label>
                                        <input className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold" value={course.institution} onChange={e => updateCourse(idx, 'institution', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Data de Conclusão</label>
                                        <input type="date" className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold" value={course.completionDate?.split('T')[0]} onChange={e => updateCourse(idx, 'completionDate', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">PDF ou URL do Certificado</label>
                                        <div className="flex gap-2">
                                            <input 
                                                className="flex-grow bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold" 
                                                placeholder="https://... ou arquivo pdf"
                                                value={course.certificateUrl} 
                                                onChange={e => updateCourse(idx, 'certificateUrl', e.target.value)} 
                                            />
                                            <button 
                                                type="button" 
                                                disabled={isUploading}
                                                onClick={() => {
                                                    setUploadingCourseIdx(idx);
                                                    certInputRef.current?.click();
                                                }}
                                                className="p-3 bg-slate-200 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                                            >
                                                {isUploading && uploadingCourseIdx === idx ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload size={14}/>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <input 
                        type="file" 
                        ref={certInputRef} 
                        className="hidden" 
                        onChange={e => handleFileUpload(e, 'certificate', uploadingCourseIdx ?? undefined)} 
                        accept=".pdf,image/*"
                    />
                </div>
            )}

            {activeTab === 'CARREIRA' && (
                <div className="space-y-10 animate-fade-up">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Escolaridade Base</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <select 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950"
                                value={formData.educationLevel}
                                onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                            >
                                <option value="Ensino Fundamental">Ensino Fundamental</option>
                                <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                                <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                                <option value="Ensino Técnico">Ensino Técnico</option>
                                <option value="Superior Incompleto">Superior Incompleto</option>
                                <option value="Superior Completo">Superior Completo</option>
                                <option value="Pós-Graduação">Pós-Graduação</option>
                            </select>
                            <input 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950"
                                placeholder="Detalhes (Ex: 5º Período de Engenharia)"
                                value={formData.educationDetail}
                                onChange={e => setFormData({ ...formData, educationDetail: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plano de Carreira e Desenvolvimento</label>
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1"><GraduationCap size={12}/> Metas e Próximos Passos</span>
                        </div>
                        <textarea 
                            rows={10} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 focus:ring-2 focus:ring-emerald-500/10 outline-none text-md leading-relaxed text-slate-700 font-body placeholder:italic" 
                            placeholder="Descreva aqui o planejamento de evolução para este colaborador..." 
                            value={formData.careerPlan} 
                            onChange={e => setFormData({ ...formData, careerPlan: e.target.value })} 
                        />
                    </div>
                </div>
            )}

            {activeTab === 'DOCUMENTOS' && (
                <div className="space-y-10 animate-fade-up">
                    <div 
                        onClick={() => docInputRef.current?.click()}
                        className="w-full h-40 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all group shadow-sm"
                    >
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"><Upload className="text-emerald-600" /></div>
                        <div className="text-center">
                            <p className="text-xs font-black text-emerald-950 uppercase tracking-widest">Anexar Documentos</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">PDF, PNG OU JPG (RG, CPF, Carteira de Trabalho...)</p>
                        </div>
                    </div>
                    <input type="file" ref={docInputRef} className="hidden" onChange={e => handleFileUpload(e, 'document')} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {documents.map((doc, idx) => (
                            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between group hover:shadow-md transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-emerald-600"><FileText size={16}/></div>
                                    <div className="max-w-[200px] truncate">
                                        <p className="text-xs font-black text-emerald-950 uppercase truncate italic">{doc.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Documento Digitalizado</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href={doc.url} target="_blank" className="p-2 text-slate-300 hover:text-emerald-500"><ChevronRight size={18}/></a>
                                    <button type="button" className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </fieldset>

        {/* Footer Actions */}
        <div className="p-10 border-t border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
            <button 
                type="button"
                onClick={onCancel}
                className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all flex items-center gap-2"
            >
                <X size={14} /> {isReadOnly ? 'FECHAR' : 'DESCARTAR'}
            </button>
            {!isReadOnly && (
                <div className="flex gap-4">
                    <button 
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="bg-emerald-950 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95 group"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        {initialData ? 'SALVAR ATUALIZAÇÃO' : 'FINALIZAR CADASTRO'}
                    </button>
                </div>
            )}
        </div>
      </div>
    </form>
  );
}
