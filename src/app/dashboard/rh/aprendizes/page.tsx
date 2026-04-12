'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  ChevronRight,
  Eye,
  Search,
  Users,
  Building,
  UserCheck
} from 'lucide-react';
import EmployeeForm from '@/components/rh/EmployeeForm';
import { getEmployees, deleteEmployee } from '../actions';

export default function AprendizesRH() {
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
      const data = await getEmployees(true); // isApprentice: true
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este cadastro?')) return;
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
    e.cpf.includes(searchTerm)
  );

  if (isLoading && employees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
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
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
            </button>
            <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight flex items-center gap-3">
              <GraduationCap className="text-emerald-600" />
              Jovem Aprendiz
            </h1>
          </div>
          <p className="text-slate-500 ml-12">Gestão detalhada e acompanhamento de aprendizes da Usina.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => { setIsFormOpen(true); setEditingEmployee(null); }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Novo Aprendiz
          </button>
        )}
      </header>

      {isFormOpen ? (
        <div className="py-2">
          <EmployeeForm 
            isApprentice={true}
            initialData={editingEmployee} 
            onCancel={() => setIsFormOpen(false)} 
            onSuccess={() => { setIsFormOpen(false); fetchEmployees(); }} 
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou CPF..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/10 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((item) => (
              <div key={item.id} className="group bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-50">
                    {item.photoUrl ? (
                      <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Users size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-headline font-black text-emerald-950 uppercase italic tracking-tight line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">{item.position || 'Aprendiz'}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-bold uppercase">{item.sector?.name || 'Geral'}</span>
                      <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-1 rounded font-bold uppercase">{item.workLocation?.name || 'S/ Local'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">CPF:</span>
                    <span className="text-emerald-950">{item.cpf}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Matrícula:</span>
                    <span className="text-emerald-950">{item.registrationNumber || '-'}</span>
                  </div>
                </div>

                {item.observationApprentice && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-500 italic line-clamp-2">“{item.observationApprentice}”</p>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setEditingEmployee(item); setIsFormOpen(true); }}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1 group/link">
                    Perfil <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}

            {filteredEmployees.length === 0 && !isLoading && (
              <div className="col-span-full border-2 border-dashed border-slate-100 rounded-[40px] p-20 text-center space-y-6">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <GraduationCap size={32} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhum aprendiz encontrado</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
