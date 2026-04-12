'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText,
  Newspaper, 
  Leaf, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  LayoutGrid,
  Menu,
  X,
  GalleryVertical,
  User as UserIcon,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { getCurrentUser } from './perfil/actions';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const data = await getCurrentUser();
      if (data) setUser(data);
    }
    loadUser();
  }, [pathname]); // Refresh when navigating to ensure data is updated

  const [isRHOpen, setIsRHOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Usuários', icon: Users, href: '/dashboard/users' },
    { name: 'Vagas', icon: Briefcase, href: '/dashboard/vagas' },
    { name: 'Candidatos', icon: FileText, href: '/dashboard/candidatos' },
    { 
      name: 'RH', 
      icon: UserIcon, 
      href: '/dashboard/rh',
      isExpandable: true,
      subItems: [
        { name: 'Jovem Aprendiz', icon: GraduationCap, href: '/dashboard/rh/aprendizes' },
        { name: 'Funcionários', icon: Users, href: '/dashboard/rh/funcionarios' },
        { name: 'Unidades', icon: MapPin, href: '/dashboard/rh/unidades' },
      ]
    },
    { name: 'Projetos Sociais', icon: GalleryVertical, href: '/dashboard/projetos' },
    { name: 'Notícias', icon: Newspaper, href: '/dashboard/noticias' },
    { name: 'Configurações', icon: Settings, href: '/dashboard/configuracoes' },
  ];

  const handleLogout = async () => {
    // Logic to clear cookie and redirect
    document.cookie = "paisa_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-[#0E2F22] shadow-2xl transition-all duration-300 z-50 flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 mb-10 flex items-center justify-between">
          <div className={`${!isSidebarOpen && 'hidden'}`}>
            <h1 className="text-xl font-bold tracking-tighter text-white font-headline uppercase leading-none">USINA PAISA</h1>
            <p className="text-[#ABCFBB]/60 text-[10px] tracking-widest font-headline uppercase mt-1">Precision Ecosystem</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#ABCFBB] hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems?.some(sub => pathname === sub.href));
            
            if (item.isExpandable) {
              return (
                <div key={item.name} className="flex flex-col">
                  <button
                    onClick={() => setIsRHOpen(!isRHOpen)}
                    className={`flex items-center px-6 py-3 transition-all duration-300 group w-full text-left ${
                      isActive 
                        ? 'text-white bg-[#006C48] rounded-r-full font-bold' 
                        : 'text-[#ABCFBB]/70 hover:text-white hover:bg-[#006C48]/50'
                    }`}
                  >
                    <item.icon className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} w-5 h-5`} />
                    {isSidebarOpen && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-headline text-sm tracking-tight">{item.name}</span>
                        {isRHOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    )}
                  </button>
                  
                  {isRHOpen && isSidebarOpen && (
                    <div className="ml-8 mt-1 space-y-1 border-l border-white/10 pl-2">
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center px-4 py-2 text-xs transition-all duration-300 rounded-lg ${
                            pathname === sub.href 
                              ? 'text-white bg-white/10 font-bold' 
                              : 'text-[#ABCFBB]/50 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <sub.icon size={14} className="mr-3 opacity-70" />
                          <span className="font-headline tracking-tight">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 transition-all duration-300 group ${
                  isActive 
                    ? 'text-white bg-[#006C48] rounded-r-full font-bold' 
                    : 'text-[#ABCFBB]/70 hover:text-white hover:bg-[#006C48]/50'
                }`}
              >
                <item.icon className={`${isSidebarOpen ? 'mr-3' : 'mx-auto'} w-5 h-5`} />
                {isSidebarOpen && <span className="font-headline text-sm tracking-tight">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <Link 
            href="/dashboard/perfil"
            className={`flex items-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/5 ${!isSidebarOpen && 'justify-center border-none'}`}
          >
            <div className="w-12 h-12 rounded-xl bg-[#006C48] flex items-center justify-center text-white font-bold overflow-hidden border border-white/10 shrink-0">
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={24} className="opacity-50" />
              )}
            </div>
            {isSidebarOpen && (
              <div className="ml-4 truncate">
                <p className="text-white text-xs font-black uppercase tracking-tight truncate">{user?.name || 'Carregando...'}</p>
                <p className="text-[#ABCFBB]/50 text-[9px] font-bold uppercase tracking-widest">{user?.role || 'Acesso Restrito'}</p>
              </div>
            )}
          </Link>
          
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-2 text-[#ABCFBB]/70 hover:text-white hover:bg-error/20 rounded-lg transition-all duration-300 group ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className={`${isSidebarOpen ? 'mr-3' : ''} w-5 h-5 group-hover:text-error transition-colors`} />
            {isSidebarOpen && <span className="font-headline text-sm tracking-tight group-hover:text-error">Sair do Sistema</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-16 sticky top-0 bg-[#f8faf9]/80 backdrop-blur-xl border-b border-[#C1C8C2]/20 flex items-center justify-between px-8 z-40">
          <div className="flex items-center flex-1">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414844] w-4 h-4" />
              <input 
                type="text" 
                placeholder="Pesquisar métricas ou ativos..." 
                className="w-full pl-10 pr-4 py-2 bg-[#eceeed] border-none focus:ring-1 focus:ring-[#006C48] rounded-lg text-sm transition-all duration-300 font-body outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-[#414844] hover:text-[#006C48] transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            </button>
            <button className="text-[#414844] hover:text-[#006C48] transition-colors">
              <LayoutGrid size={20} />
            </button>
            <div className="h-8 w-[1px] bg-[#c1c8c2]/30 mx-2"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-headline font-bold text-[#0E2F22] hidden sm:inline">SISTEMA ATIVO</span>
              <div className="w-2 h-2 bg-[#006C48] rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Canvas */}
        <main className="p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
