'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Camera, User, BadgeCheck, Save, Loader2, Image as ImageIcon, Shield, Lock } from 'lucide-react';
import { getCurrentUser, updateProfile } from './actions';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    avatarUrl: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    setIsLoading(true);
    const data = await getCurrentUser();
    if (data) {
      setUser(data);
      setFormData({
        name: data.name || '',
        avatarUrl: data.avatarUrl || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setIsLoading(false);
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, avatarUrl: result.path }));
      } else {
        setError(result.error || 'Erro no upload do avatar');
      }
    } catch (err) {
      setError('Falha na comunicação com o servidor durante o upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('avatarUrl', formData.avatarUrl);
    submitData.append('currentPassword', formData.currentPassword);
    submitData.append('newPassword', formData.newPassword);
    submitData.append('confirmPassword', formData.confirmPassword);

    try {
      const result = await updateProfile(submitData);
      if (result.success) {
        setSuccess(true);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Erro ao atualizar perfil');
      }
    } catch (err) {
      setError('Erro inseperado ao salvar as alterações.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-fade">
        <Loader2 className="animate-spin text-emerald-600 w-12 h-12" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      {/* Header Space */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-emerald-950 tracking-tighter uppercase italic font-headline mb-4">
          Meu Perfil
        </h1>
        <p className="text-slate-400 text-sm font-medium">Gerencie suas informações básicas no ecossistema Paisa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column: Avatar & Info Summary */}
        <div className="md:col-span-1 space-y-10">
          <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-emerald-950/5 border border-slate-50 relative group">
            <div className="relative mx-auto w-40 h-40">
              <div className="w-full h-full rounded-[40px] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden relative shadow-inner">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <User size={64} />
                  </div>
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="animate-spin text-white w-8 h-8" />
                  </div>
                )}
              </div>
              
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 z-10"
              >
                <Camera size={20} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="mt-12 text-center space-y-3">
              <h3 className="text-xl font-black text-emerald-950 uppercase italic font-headline truncate">{user?.name}</h3>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">
                <Shield size={12} /> {user?.role}
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-50 rounded-full blur-2xl opacity-60"></div>
          </div>

          <div className="bg-emerald-950 p-8 rounded-[40px] text-white shadow-2xl">
            <BadgeCheck className="text-emerald-400 mb-6" size={32} />
            <p className="text-sm font-medium text-emerald-100/70 leading-relaxed mb-6 italic">
              Seu perfil permite o controle de módulos administrativos. Mantenha seus dados atualizados para auditoria.
            </p>
            <div className="h-px w-full bg-white/10"></div>
            <div className="mt-6">
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">USUÁRIO DO SISTEMA</p>
                <p className="font-mono text-xs opacity-60">@{user?.username}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[48px] shadow-2xl shadow-emerald-950/5 border border-slate-50 space-y-12">
            
            {error && (
              <div className="p-6 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-4 animate-shake">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </div>
            )}

            {success && (
              <div className="p-6 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-4 animate-fade">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Perfil atualizado com sucesso!
              </div>
            )}

            <div className="space-y-10">
                {/* Name Input */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">NOME COMPLETO OU EXIBIÇÃO</label>
                    <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                        <input 
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-black text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                            placeholder="Seu nome real..."
                        />
                    </div>
                </div>

                {/* Password Section */}
                <div className="pt-6 border-t border-slate-100 space-y-8">
                    <div className="flex items-center gap-3 ml-2">
                        <Lock size={14} className="text-emerald-600" />
                        <h4 className="text-[10px] font-black text-emerald-950 uppercase tracking-widest">Alterar Senha</h4>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">SENHA ATUAL</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                                <input 
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                                    className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-black text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">NOVA SENHA</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                                    <input 
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                                        className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-black text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">CONFIRMAR NOVA SENHA</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                                    <input 
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-black text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Read-only Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">USUÁRIO (LOGIN)</label>
                        <div className="px-8 py-6 bg-slate-100/50 border border-slate-100 rounded-[28px] text-sm font-medium text-slate-500 italic">
                            {user?.username}
                        </div>
                        <p className="text-[9px] text-slate-300 ml-2 italic">O nome de usuário não pode ser alterado diretamente.</p>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-2">NÍVEL DE ACESSO</label>
                        <div className="px-8 py-6 bg-slate-100/50 border border-slate-100 rounded-[28px] text-sm font-medium text-slate-500 italic">
                            {user?.role}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="bg-emerald-950 text-white px-12 py-6 rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95 group"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                  {isSaving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
