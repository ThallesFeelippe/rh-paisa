'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  Plus as PlusIcon, 
  Pencil as PencilIcon, 
  Trash2 as Trash2Icon, 
  Loader2 as Loader2Icon, 
  ChevronRight as ChevronRightIcon, 
  Search as SearchIcon, 
  Briefcase as BriefcaseIcon, 
  MapPin as MapPinIcon, 
  Filter as FilterIcon 
} from 'lucide-react';
import EmployeeForm from '@/components/rh/EmployeeForm';
import { getEmployees, deleteEmployee } from '../../rh/actions';

export default function FuncionariosPsicologia() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees(false); // isApprentice: false
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este registro permanentemente?')) return;
    try {
      const result = await deleteEmployee(id);
      if (result.success) {
        setEmployees(employees.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.cpf.includes(searchTerm) ||
    e.registrationNumber?.includes(searchTerm)
  );

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2Icon className="animate-spin text-emerald-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade text-on-background">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => window.history.back()}
                className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 transition-all hover:border-emerald-200 shadow-sm group"
                title="Voltar"
            >
                <ChevronRightIcon className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
            </button>
            <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight flex items-center gap-3">
              <UsersIcon className="text-emerald-600" />
              Funcionários (Psicologia)
            </h1>
          </div>
          <p className="text-slate-500 ml-12">Visualização e gestão de colaboradores integrada ao módulo psicológico.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => { setIsFormOpen(true); setEditingEmployee(null); }}
            className="bg-emerald-950 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-950/20"
          >
            <PlusIcon size={18} />
            Novo Registro
          </button>
        )}
      </header>

      {isFormOpen ? (
        <div className="py-2">
          <EmployeeForm 
            isApprentice={false}
            initialData={editingEmployee} 
            onCancel={() => setIsFormOpen(false)} 
            onSuccess={() => { setIsFormOpen(false); fetchEmployees(); }} 
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow max-w-md">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Nome, CPF ou Matrícula..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/10 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-all">
              <FilterIcon size={16} /> Filtros
            </button>
          </div>

          {/* Table Style View */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Colaborador</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Cargo & Setor</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Unidade</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEmployees.map((e) => (
                  <tr key={e.id} className="group hover:bg-emerald-50/30 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-50">
                          {e.photoUrl ? (
                            <img src={e.photoUrl} alt={e.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <UsersIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-headline font-black text-emerald-950 uppercase italic tracking-tight">{e.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Matrícula: {e.registrationNumber || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-bold text-emerald-900 uppercase tracking-tight">{e.position}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">{e.sector?.name}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPinIcon size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{e.workLocation?.name || 'Sede'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        Ativo
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => { setEditingEmployee(e); setIsFormOpen(true); }}
                          className="p-2 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <PencilIcon size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(e.id)}
                          className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2Icon size={18} />
                        </button>
                        <button className="p-2 text-slate-300 hover:text-emerald-950 ml-2">
                           <ChevronRightIcon size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && (
              <div className="p-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <UsersIcon size={32} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhum funcionário encontrado</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
