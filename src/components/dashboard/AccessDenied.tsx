'use client';

import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-[40px] border border-slate-100 shadow-2xl p-12 text-center space-y-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -ml-16 -mb-16 opacity-50"></div>

        <div className="relative">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 animate-pulse">
            <ShieldAlert size={48} />
          </div>
          
          <h1 className="text-4xl font-headline font-black text-slate-900 uppercase italic tracking-tighter leading-none">
            Acesso <br />
            <span className="text-red-600">Restrito</span>
          </h1>
          
          <p className="text-slate-500 font-medium mt-6 leading-relaxed">
            Seu perfil de usuário não possui as permissões necessárias para acessar este módulo do ecossistema PAISA.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 relative">
          <button 
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            <ArrowLeft size={16} /> Voltar para Segurança
          </button>
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-400 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-emerald-600 hover:border-emerald-200 transition-all"
          >
            <Home size={16} /> Painel Principal
          </button>
        </div>

        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest pt-4">
          Protocolo de Segurança: USINA-PAISA-0403
        </p>
      </div>
    </div>
  );
}
