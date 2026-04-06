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
  Loader2
} from 'lucide-react';
import { createUser, deleteUser, getUsers } from './actions';

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    role: 'SECRETARIA'
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
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
        setMessage({ text: 'Erro ao criar usuário.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Ocorreu um erro no servidor.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (username === 'admin_paisa') {
      alert('Não é possível excluir o administrador mestre.');
      return;
    }
    
    if (confirm(`Deseja realmente excluir o usuário ${username}?`)) {
      const res = await deleteUser(id);
      if (res.success) fetchUsers();
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section>
        <h2 className="text-4xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2">Gestão de Usuários</h2>
        <p className="text-[#414844] font-body text-sm">Administre as permissões e contas do ecossistema RH Paisa.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-8 border border-[#c1c8c2]/50 shadow-sm sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#92f7c3]/30 rounded-lg text-[#006C48]">
                <UserPlus size={24} />
              </div>
              <h3 className="text-xl font-bold font-headline text-[#00190f] uppercase">Criar Novo Acesso</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#414844] ml-1">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Maria Silva"
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#414844] ml-1">Nome de Usuário (Login)</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: maria_rh"
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#414844] ml-1">Senha Temporária</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#414844] ml-1">Cargo / Permissão</label>
                <select 
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm transition-all cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="SECRETARIA">Secretária</option>
                  <option value="PSICOLOGA">Psicóloga</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              {message.text && (
                <div className={`p-3 rounded-lg text-xs font-bold font-headline flex items-center gap-2 ${
                  message.type === 'success' ? 'bg-[#92f7c3]/30 text-[#006C48]' : 'bg-[#ffdad6]/50 text-[#ba1a1a]'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {message.text}
                </div>
              )}

              <button 
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#0e2f22] text-white py-4 rounded-lg font-bold font-headline text-xs uppercase tracking-widest hover:bg-[#006C48] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'CRIAR ACESSO'}
              </button>
            </form>
          </div>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 border border-[#c1c8c2]/50 shadow-sm h-full">
            <h3 className="text-xl font-bold font-headline text-[#00190f] uppercase mb-8 flex items-center gap-3">
              <Shield className="text-[#414844]" size={20} />
              Usuários Cadastrados
            </h3>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#414844]/50">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="text-sm font-headline uppercase font-bold tracking-widest">Carregando usuários...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#e6e9e8]/50 font-headline text-[10px] tracking-widest uppercase text-[#414844]">
                      <th className="px-4 py-4 rounded-l-lg">Usuário</th>
                      <th className="px-4 py-4">Nome</th>
                      <th className="px-4 py-4">Cargo</th>
                      <th className="px-4 py-4 rounded-r-lg text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-body">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-[#f2f4f3] transition-colors group">
                        <td className="px-4 py-5 font-bold text-[#00190f] flex items-center gap-3">
                          <UserCircle2 className="text-[#414844]/40" size={20} />
                          {user.username}
                        </td>
                        <td className="px-4 py-5 text-[#414844]">{user.name}</td>
                        <td className="px-4 py-5">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            user.role === 'ADMIN' ? 'bg-[#92f7c3] text-[#00734d]' : 'bg-[#e1e3e2] text-[#414844]'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          {user.username !== 'admin_paisa' && (
                            <button 
                              onClick={() => handleDelete(user.id, user.username)}
                              className="p-1 hover:text-[#ba1a1a] transition-colors"
                            >
                              <Trash2 size={18} />
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
  );
}
