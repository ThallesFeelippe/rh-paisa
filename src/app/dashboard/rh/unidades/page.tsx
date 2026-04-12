'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Loader2, 
  ChevronRight,
  ChevronDown,
  Building2,
  Users,
  Map as MapIcon,
  Home,
  Briefcase,
  Layers,
  Info,
  Pencil,
  X
} from 'lucide-react';
import { getWorkLocations, createWorkLocation, deleteWorkLocation, updateWorkLocation, getEmployee } from '../actions';
import EmployeeForm from '@/components/rh/EmployeeForm';

type CategoryType = 'RURAL' | 'URBANA' | 'ADMINISTRATIVA';

interface WorkLocationExtended {
  id: string;
  name: string;
  category: string | null;
  parentId: string | null;
  children?: WorkLocationExtended[];
  employees?: { id: string, name: string, position: string }[];
}

export default function UnidadesRH() {
  const [locations, setLocations] = useState<WorkLocationExtended[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ADMINISTRATIVA');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<CategoryType>('ADMINISTRATIVA');

  // Profile Modal State
  const [profileEmployee, setProfileEmployee] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const openEmployeeProfile = async (id: string) => {
    setIsProfileLoading(true);
    setIsProfileOpen(true);
    try {
      const emp = await getEmployee(id);
      setProfileEmployee(emp);
    } catch (err) {
      console.error(err);
      setIsProfileOpen(false);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const data = await getWorkLocations();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const startEdit = (node: WorkLocationExtended) => {
    setEditingId(node.id);
    setNewName(node.name);
    setSelectedParent(node.parentId || '');
    if (node.category) setSelectedCategory(node.category as CategoryType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewName('');
    setSelectedParent('');
    setError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      if (editingId) {
        // Validation: cannot set self as parent
        if (selectedParent === editingId) {
            setError('Uma área não pode ser pai de si mesma.');
            setIsSubmitting(false);
            return;
        }

        const result = await updateWorkLocation(editingId, {
            name: newName,
            parentId: selectedParent || null,
            category: selectedParent ? undefined : selectedCategory
        });
        if (result.success) {
            cancelEdit();
            fetchLocations();
        } else {
            setError(result.error);
        }
      } else {
        const result = await createWorkLocation(
          newName, 
          selectedParent ? undefined : selectedCategory, 
          selectedParent || undefined
        );
        if (result.success) {
          setNewName('');
          setSelectedParent('');
          fetchLocations();
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('Erro ao processar solicitação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta área/local? Todos os subníveis também serão afetados.')) return;
    try {
      const result = await deleteWorkLocation(id);
      if (result.success) {
        fetchLocations();
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const buildTree = (items: WorkLocationExtended[]) => {
    const nodeMap = new Map();
    items.forEach(item => nodeMap.set(item.id, { ...item, children: [] }));
    const roots: WorkLocationExtended[] = [];
    
    items.forEach(item => {
      if (item.parentId && nodeMap.has(item.parentId)) {
        nodeMap.get(item.parentId).children.push(nodeMap.get(item.id));
      } else {
        roots.push(nodeMap.get(item.id));
      }
    });
    return roots;
  };

  const allRoots = buildTree(locations);
  const filteredRoots = allRoots.filter(r => {
    if (activeTab === 'ADMINISTRATIVA') {
      return r.category === activeTab || !r.category;
    }
    return r.category === activeTab;
  });

  const countTotalEmployees = (node: WorkLocationExtended): number => {
    let count = node.employees?.length || 0;
    node.children?.forEach(child => {
      count += countTotalEmployees(child);
    });
    return count;
  };

  const AreaItem = ({ node, level = 0 }: { node: WorkLocationExtended, level: number }) => {
    const isExpanded = expandedNodes.has(node.id);
    const totalPeople = countTotalEmployees(node);
    const hasChildren = node.children && node.children.length > 0;
    const hasEmployees = node.employees && node.employees.length > 0;
    const isEditingThis = editingId === node.id;

    return (
      <div className="space-y-2">
        <div 
          className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
            level === 0 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 ml-6'
          } ${isEditingThis ? 'border-amber-500 bg-amber-50/30' : 'hover:border-emerald-300'} group`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <button 
              onClick={(e) => toggleNode(node.id, e)}
              className={`p-1 rounded-md transition-colors ${hasChildren || hasEmployees ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-300 cursor-default'}`}
            >
              {(hasChildren || hasEmployees) ? (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <MapPin size={16} />}
            </button>
            <div className="truncate">
              <h4 className={`font-headline font-black uppercase tracking-tight italic truncate ${level === 0 ? 'text-emerald-950 text-sm' : 'text-slate-600 text-xs'}`}>
                {node.name} {isEditingThis && <span className="text-[8px] not-italic bg-amber-500 text-white px-2 py-0.5 rounded ml-2">Editando</span>}
              </h4>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                {totalPeople} {totalPeople === 1 ? 'Pessoa' : 'Pessoas'} no total
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => startEdit(node)}
              className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
              title="Editar Unidade"
            >
              <Pencil size={14} />
            </button>
            <button 
              onClick={() => handleDelete(node.id)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              title="Excluir Unidade"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-2">
            {hasEmployees && (
                <div className={`ml-12 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3`}>
                    <p className="text-[9px] font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                        <Users size={12} /> Colaboradores Diretos
                    </p>
                    <div className="divide-y divide-emerald-100/50">
                        {node.employees?.map(emp => (
                            <div key={emp.id} className="py-2 flex items-center justify-between group/emp">
                                <div className="flex flex-col">
                                    <button 
                                        onClick={() => openEmployeeProfile(emp.id)}
                                        className="text-[10px] font-bold text-emerald-950 uppercase hover:text-emerald-600 text-left transition-colors"
                                    >
                                        {emp.name}
                                    </button>
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{emp.position}</span>
                                </div>
                                <button 
                                    onClick={() => openEmployeeProfile(emp.id)}
                                    className="p-1.5 bg-white text-emerald-600 rounded-lg shadow-sm border border-emerald-100 opacity-0 group-hover/emp:opacity-100 transition-opacity"
                                    title="Ver Perfil Completo"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {node.children?.map(child => (
                <AreaItem key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade text-on-background">
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
                <MapIcon className="text-emerald-600" />
                Gestão de Áreas e Unidades
            </h1>
          </div>
          <p className="text-slate-500 italic font-medium ml-12">Estrutura organizacional de setores, subáreas e locais de trabalho.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className={`bg-white rounded-[40px] border shadow-2xl p-8 space-y-8 sticky top-24 transition-all ${editingId ? 'border-amber-200 ring-4 ring-amber-50' : 'border-slate-100'}`}>
            <div className="space-y-2">
              <h2 className="text-lg font-headline font-black text-emerald-950 uppercase tracking-tight flex items-center gap-2 italic">
                  {editingId ? <Pencil className="text-amber-500" size={20} /> : <Plus className="text-emerald-600" size={20} />}
                  {editingId ? 'Editar Registro' : 'Novo Registro'}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {editingId ? 'Atualizando vínculo ou nome da área.' : 'Adicione uma área, subárea ou local final.'}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome da Área/Local</label>
                <input 
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-500/10 outline-none placeholder:text-slate-300"
                  placeholder="Ex: Jovem Aprendiz ou CIEE"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mover para (Pai)</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-emerald-950 focus:ring-2 focus:ring-emerald-500/10 outline-none"
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                >
                  <option value="">Raiz (Sem Pai)</option>
                  {locations.filter(l => l.id !== editingId && l.parentId === null).map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                {!selectedParent && (
                  <div className="mt-4 space-y-2 animate-fade-down">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Categoria Raiz</label>
                    <div className="grid grid-cols-3 gap-2">
                         {(['ADMINISTRATIVA', 'RURAL', 'URBANA'] as CategoryType[]).map(cat => (
                             <button 
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`py-3 rounded-xl text-[8px] font-black uppercase tracking-tighter border transition-all ${
                                    selectedCategory === cat 
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'
                                }`}
                             >
                                {cat}
                             </button>
                         ))}
                    </div>
                  </div>
                )}
              </div>

              {error && <p className="text-[10px] text-red-500 italic font-black uppercase tracking-widest animate-shake">{error}</p>}

              <div className="flex flex-col gap-3">
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl disabled:opacity-50 active:scale-95 group ${
                        editingId 
                        ? 'bg-amber-500 text-white shadow-amber-500/20 hover:bg-amber-600' 
                        : 'bg-emerald-950 text-white shadow-emerald-950/20 hover:bg-emerald-800'
                    }`}
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : (editingId ? <Pencil size={18} /> : <Plus size={18} />)}
                    {editingId ? 'Salvar Alterações' : 'Cadastrar Registro'}
                </button>

                {editingId && (
                    <button 
                        type="button"
                        onClick={cancelEdit}
                        className="w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all flex items-center justify-center gap-2"
                    >
                        <X size={14} /> Cancelar Edição
                    </button>
                )}
              </div>
            </form>

            <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-4">
                <Info className="text-emerald-600 shrink-0 mt-1" size={16} />
                <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">
                    DICA: Para criar subáreas (ex: Administrativo {'>'} Jovem Aprendiz), primeiro crie a área pai "Administrativo" e depois selecione-a como pai para o novo registro.
                </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
            {(['ADMINISTRATIVA', 'RURAL', 'URBANA'] as CategoryType[]).map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveTab(cat); cancelEdit(); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === cat 
                  ? 'bg-white text-emerald-950 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat === 'ADMINISTRATIVA' && <Briefcase size={14} />}
                {cat === 'RURAL' && <MapIcon size={14} />}
                {cat === 'URBANA' && <Home size={14} />}
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden min-h-[500px]">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-950">
                  <Layers size={18} />
                  <span className="text-xs font-black uppercase tracking-widest italic">{activeTab}</span>
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 shadow-sm">
                {filteredRoots.length} Áreas Base
              </div>
            </div>

            <div className="p-8 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
                </div>
              ) : (
                <>
                  {filteredRoots.map((root) => (
                    <AreaItem key={root.id} node={root} level={0} />
                  ))}

                  {filteredRoots.length === 0 && (
                    <div className="text-center py-24 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100 space-y-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <MapPin className="text-slate-200" size={32} />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Nenhuma área cadastrada em {activeTab}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Employee Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-6xl animate-fade-up">
                {isProfileLoading ? (
                    <div className="bg-white rounded-[40px] p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-emerald-600 w-12 h-12" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Carregando Perfil...</p>
                    </div>
                ) : (
                    <EmployeeForm 
                        initialData={profileEmployee}
                        isApprentice={profileEmployee?.isApprentice}
                        onCancel={() => { setIsProfileOpen(false); setProfileEmployee(null); }}
                        onSuccess={() => { setIsProfileOpen(false); setProfileEmployee(null); fetchLocations(); }}
                    />
                )}
            </div>
        </div>
      )}
    </div>
  );
}
