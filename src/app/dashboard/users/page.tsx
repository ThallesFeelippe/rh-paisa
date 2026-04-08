'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Trash2, 
  UserCircle2, 
  CheckCircle,
  AlertCircle,
  Loader2,
  XCircle,
  Check
} from 'lucide-react';
import { createUser, deleteUser, getUsers } from './actions';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [mounted, setMounted] = useState(false);
  
  // State for inline logical confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    role: 'SECRETARIA'
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    const data = new FormData();
    data.append('username', formData.username);
    data.append('name', formData.name);
    data.append('password', formData.password);
    data.append('role', formData.role);

    try {
      const res = await createUser(data);
      if (res.success) {
        setMessage({ text: 'Usuário criado com sucesso!', type: 'success' });
        setFormData({ username: '', name: '', password: '', role: 'SECRETARIA' });
        fetchUsers();
      } else {
        setMessage({ text: res.message || 'Erro ao criar usuário.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Ocorreu um erro no servidor.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeDelete = async (id: string, username: string) => {
    setIsDeleting(true);
    try {
      const res = await deleteUser(id);
      if (res.success) {
        setDeletingId(null);
        fetchUsers();
      } else {
        alert('Erro ao excluir: ' + (res.message || 'Erro interno'));
      }
    } catch (err) {
      alert('Erro de conexão ao excluir.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="animate-spin text-emerald-600" size={32} />
    </div>
  );

  return (
    <div className="space-y-10 pb-20 max-w-[1200px] mx-auto transition-all duration-500">
      {/* Header */}
      <section className="animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2 italic">Gestão de Usuários</h2>
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-12 bg-emerald-600"></div>
          <p className="text-[#414844] font-body text-sm font-medium">Controle de acessos do ecossistema RH Paisa.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 border border-[#c1c8c2]/30 shadow-xl shadow-emerald-900/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20">
                <UserPlus size={20} />
              </div>
              <h3 className="text-xl font-bold font-headline text-[#00190f] uppercase tracking-tight">Novo Acesso</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  placeholder="Maria Silva"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 rounded-xl text-sm transition-all duration-300 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Usuário (Login)</label>
                <input 
                  required
                  type="text" 
                  placeholder="maria_rh"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 rounded-xl text-sm transition-all duration-300 outline-none"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Senha Temporária</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 rounded-xl text-sm transition-all duration-300 outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-widest">Cargo / Permissão</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 rounded-xl text-sm transition-all duration-300 outline-none cursor-pointer appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="SECRETARIA">Secretária</option>
                  <option value="PSICOLOGA">Psicóloga</option>
                  <option value="GESTOR_RH">Gestor de RH</option>
                  <option value="APRENDIZ">Jovem Aprendiz</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              {message.text && (
                <div className={`p-4 rounded-xl text-xs font-bold font-headline flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300 ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {message.text}
                </div>
              )}

              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#0e2f22] text-white py-5 rounded-xl font-bold font-headline text-xs uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'CADASTRAR ACESSO'}
              </button>
            </form>
          </div>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#c1c8c2]/30 shadow-xl shadow-emerald-900/5 overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <h3 className="text-xl font-bold font-headline text-[#00190f] uppercase tracking-tight flex items-center gap-3">
                <Shield className="text-emerald-600" size={20} />
                Contas Ativas
              </h3>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {users.length} Registros
              </div>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                  <p className="text-xs font-headline uppercase font-bold tracking-widest text-[#414844]/40">Sincronizando banco de dados...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 font-headline text-[10px] tracking-widest uppercase text-slate-400">
                        <th className="px-8 py-5">Identificação</th>
                        <th className="px-8 py-5">Cargo</th>
                        <th className="px-8 py-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <UserCircle2 size={24} />
                              </div>
                              <div>
                                <p className="font-bold text-[#00190f] text-sm uppercase tracking-tight">{user.username}</p>
                                <p className="text-xs text-[#414844]/60 font-medium">{user.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase border tracking-widest transition-all duration-300 ${
                              user.role === 'ADMIN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-600/5' : 
                              user.role === 'GESTOR_RH' ? 'bg-[#0E2F22] text-white border-[#0E2F22]' :
                              user.role === 'APRENDIZ' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-slate-50 text-slate-500 border-slate-100'
                            }`}>
                              {user.role ? user.role.replace('_', ' ') : 'PADRÃO'}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            {user.username === 'admin_paisa' ? (
                              <div className="flex items-center justify-end gap-2 text-emerald-600/40 font-bold text-[9px] uppercase tracking-tighter italic scale-95 opacity-60">
                                <Shield size={12} />
                                Master Admin
                              </div>
                            ) : deletingId === user.id ? (
                              <div className="flex items-center justify-end gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
                                <button 
                                  disabled={isDeleting}
                                  onClick={() => executeDelete(user.id, user.username)}
                                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-red-700 transition-all flex items-center gap-2 shadow-lg shadow-red-600/20"
                                >
                                  {isDeleting ? <Loader2 className="animate-spin" size={12} /> : <Check size={12} />}
                                  Confirmar
                                </button>
                                <button 
                                  disabled={isDeleting}
                                  onClick={() => setDeletingId(null)}
                                  className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
                                >
                                  <XCircle size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setDeletingId(user.id)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-[10px] uppercase tracking-wider group-hover:border-red-100"
                              >
                                <Trash2 size={16} />
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">Excluir</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
