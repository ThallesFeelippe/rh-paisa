'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ShieldCheck, Mail, Lock, LayoutGrid, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Redireciona para o dashboard se o login for bem-sucedido
        router.push('/dashboard');
      } else {
        setError(data.message || 'Credenciais inválidas.');
      }
    } catch (err) {
      setError('Algo deu errado. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center overflow-hidden animate-fade">
      <main className="w-full min-h-screen flex flex-col md:flex-row">
        
        {/* Branding/Imagery Section (Organic & Tech) */}
        <section className="relative w-full md:w-7/12 h-64 md:h-screen overflow-hidden">
          <img 
            alt="Campo de cana-de-açúcar" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnHhTfoMtPYM8WWTTugzzKtaukJWtBMA_7xyze2rpFljMUrJofucnAWKJMeB9n02qpfP3-KiGzTaBdCcJemVBE8goAsP7BJmPYSPXPU_BVmcgi89PXccnAkZVt3vQy2-FQDYDFIGIJirax4qxZROpScWRY8Qlvhw2BnbsfwgS6r_OFv6Dn1Cow3IknkJulNz2G_NyZ9Sw_XxlA9Fv5YnvyrD2oVofUzNrJFD34e5BOG0CGTaTZQJ6-sxMr_-Yz6L4cANsKUKkTVppk" 
          />
          {/* Overlay Mask */}
          <div className="absolute inset-0 bg-primary-container/40 backdrop-none mix-blend-multiply"></div>
          
          {/* Floating Data Card (Industrial Precision) */}
          <div className="absolute bottom-12 left-12 right-12 md:right-auto md:w-96 bg-white/60 backdrop-blur-xl rounded-xl p-8 border border-white/20 hidden md:block shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>sensors_kr</span>
              <span className="font-headline text-[10px] tracking-widest uppercase text-on-surface-variant font-black">Monitoramento Ativo</span>
            </div>
            <h2 className="font-headline text-2xl font-bold text-primary mb-2 tracking-tighter italic uppercase leading-none">Eco-Digital <br/> <span className="text-secondary">Usina Paisa</span></h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">Integrando precisão industrial com sustentabilidade regenerativa para o futuro da produção sucroenergética.</p>
            <div className="mt-6 flex gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">Extração</span>
                <span className="font-headline text-lg font-bold text-secondary">98.4%</span>
              </div>
              <div className="w-px h-8 bg-outline-variant/30"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">Umidade</span>
                <span className="font-headline text-lg font-bold text-secondary">12.1%</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Logo */}
          <div className="absolute top-8 left-8 md:hidden">
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-secondary">precision_manufacturing</span>
              <span className="font-headline font-bold tracking-tighter text-primary">USINA PAISA</span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full md:w-5/12 bg-white flex flex-col items-center justify-center p-8 md:p-16 relative">
          {/* Top Corner Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg className="w-full h-full text-secondary fill-current" viewBox="0 0 100 100">
              <path d="M100 0 L100 100 L0 100 Z"></path>
            </svg>
          </div>
          
          <div className="w-full max-w-md">
            {/* Brand Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#0e2f22] p-3 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-emerald-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
                </div>
                <div>
                  <h1 className="font-headline text-3xl font-extrabold text-[#00190f] tracking-tighter leading-none italic uppercase">USINA PAISA</h1>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[#414844] font-black italic">SugarLink Admin Portal</p>
                </div>
              </div>
              <h2 className="font-headline text-2xl font-bold text-[#00190f] mb-2 uppercase italic tracking-tight">Bem-vindo ao Ecossistema</h2>
              <p className="text-[#414844] text-sm mb-6">Acesse o painel de controle industrial para gerenciar sua operação.</p>
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 animate-shake">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-3 w-5 h-5" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}
            </header>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#414844] ml-1" htmlFor="email">Usuário ou E-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727974] group-focus-within:text-[#006c48] transition-colors duration-300 w-5 h-5" />
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006c48] focus:ring-0 transition-all duration-300 outline-none text-[#191c1c] placeholder:text-[#727974]/50 font-medium" 
                    id="email" 
                    placeholder="Ex: admin_paisa" 
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#414844]" htmlFor="password">Senha de Acesso</label>
                  <Link className="text-[10px] font-black uppercase tracking-widest text-[#006c48] hover:underline transition-all duration-300" href="#">Esqueci minha senha</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#727974] group-focus-within:text-[#006c48] transition-colors duration-300 w-5 h-5" />
                  <input 
                    className="w-full pl-12 pr-12 py-4 bg-[#f2f4f3] border-none border-b-2 border-[#c1c8c2] focus:border-[#006c48] focus:ring-0 transition-all duration-300 outline-none text-[#191c1c] placeholder:text-[#727974]/50 font-medium" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727974] hover:text-[#191c1c] transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1">
                <input 
                  className="w-4 h-4 rounded-sm border-[#c1c8c2] text-[#006c48] focus:ring-[#006c48]/30 transition-all cursor-pointer" 
                  id="remember" 
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                />
                <label className="text-sm text-[#414844] cursor-pointer select-none font-medium" htmlFor="remember">Manter conectado neste dispositivo</label>
              </div>

              <button 
                className="w-full bg-[#006c48] text-white font-headline font-bold py-5 rounded-lg flex items-center justify-center gap-3 group hover:bg-[#005235] transition-all duration-300 shadow-lg shadow-[#006c48]/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>ENTRAR NO SISTEMA</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Support Footer */}
            <footer className="mt-16 pt-8 border-t border-[#c1c8c2]/20">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#414844]/60 hover:text-[#191c1c] transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-lg">support_agent</span>
                  <span className="text-[10px] uppercase tracking-widest font-black">Suporte Técnico Especializado</span>
                </div>
                <p className="text-[10px] text-[#414844]/40 leading-relaxed uppercase tracking-tighter font-medium">
                  Acesso restrito a colaboradores autorizados da Usina Paisa e Precision Ecosystem Industrial. © 2024.
                </p>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Global Background Logo Watermark */}
      <div className="fixed bottom-4 right-8 pointer-events-none opacity-5 hidden md:block">
        <span className="font-headline text-[120px] font-extrabold text-[#00190f] select-none pointer-events-none tracking-tighter leading-none uppercase italic">PAISA</span>
      </div>
    </div>
  );
}
