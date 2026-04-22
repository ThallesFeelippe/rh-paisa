'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  LayoutDashboard as LayoutDashboardIcon, 
  Briefcase as BriefcaseIcon, 
  FileText as FileTextIcon,
  Newspaper as NewspaperIcon, 
  Leaf as LeafIcon, 
  Users as UsersIcon, 
  Settings as SettingsIcon, 
  LogOut as LogOutIcon, 
  Search as SearchIcon, 
  Bell as BellIcon, 
  LayoutGrid as LayoutGridIcon,
  Menu as MenuIcon,
  X as XIcon,
  GalleryVertical as GalleryVerticalIcon,
  User as UserCompIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  GraduationCap as GraduationCapIcon,
  MapPin as MapPinIcon,
  MessageCircle as MessageCircleIcon,
  ClipboardList as ClipboardListIcon,
} from 'lucide-react';
import { getCurrentUser } from './perfil/actions';
import AccessDenied from '@/components/dashboard/AccessDenied';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboardIcon, href: '/dashboard' },
    { name: 'Usuários', icon: UsersIcon, href: '/dashboard/users', roles: ['ADMIN'] },
    { name: 'Vagas', icon: BriefcaseIcon, href: '/dashboard/vagas', roles: ['ADMIN', 'GESTOR_RH'] },
    { name: 'Candidatos', icon: FileTextIcon, href: '/dashboard/candidatos', roles: ['ADMIN', 'GESTOR_RH', 'PSICOLOGA'] },
    { 
      name: 'RH', 
      icon: BriefcaseIcon, 
      href: '/dashboard/rh/funcionarios',
      isExpandable: true,
      roles: ['ADMIN', 'GESTOR_RH'],
      subItems: [
        { name: 'Funcionários', icon: UsersIcon, href: '/dashboard/rh/funcionarios' },
        { name: 'Jovem Aprendiz', icon: GraduationCapIcon, href: '/dashboard/rh/aprendizes' },
        { name: 'Afastados', icon: LeafIcon, href: '/dashboard/rh/afastados' },
        { name: 'Fila Atendimento', icon: UsersIcon, href: '/dashboard/atendimentos?origin=RH' },
        { name: 'Chat Secretaria', icon: MessageCircleIcon, href: '/dashboard/comunicacao?channel=RH_SECRETARIA&origin=RH' },
      ]
    },
    { 
      name: 'Secretaria', 
      icon: GraduationCapIcon, 
      href: '/dashboard/atendimentos?origin=SECRETARIA',
      isExpandable: true,
      roles: ['ADMIN', 'SECRETARIA'],
      subItems: [
        { name: 'Fila Atendimento', icon: UsersIcon, href: '/dashboard/atendimentos?origin=SECRETARIA' },
        { name: 'Chat Psicologia', icon: MessageCircleIcon, href: '/dashboard/comunicacao?channel=PSICOLOGIA_SECRETARIA&origin=SECRETARIA' },
        { name: 'Chat RH', icon: MessageCircleIcon, href: '/dashboard/comunicacao?channel=RH_SECRETARIA&origin=SECRETARIA' },
      ]
    },
    { 
      name: 'Psicologia', 
      icon: UsersIcon, 
      href: '/dashboard/psicologia/pacientes',
      isExpandable: true,
      roles: ['ADMIN', 'PSICOLOGA'],
      subItems: [
        { name: 'Gestão de Pacientes', icon: UsersIcon, href: '/dashboard/psicologia/pacientes' },
        { name: 'Entrevistas', icon: ClipboardListIcon, href: '/dashboard/psicologia/entrevistas' },
        { name: 'Funcionários (RH)', icon: UsersIcon, href: '/dashboard/psicologia/funcionarios' },
        { name: 'Fila Atendimento', icon: UsersIcon, href: '/dashboard/atendimentos?origin=PSICOLOGIA' },
        { name: 'Chat Secretaria', icon: MessageCircleIcon, href: '/dashboard/comunicacao?channel=PSICOLOGIA_SECRETARIA&origin=PSICOLOGIA' },
      ]
    },
    { name: 'Projetos Sociais', icon: GalleryVerticalIcon, href: '/dashboard/projetos', roles: ['ADMIN', 'GESTOR_RH'] },
    { name: 'Notícias', icon: NewspaperIcon, href: '/dashboard/noticias', roles: ['ADMIN', 'GESTOR_RH'] },
  ];

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        if (!data) {
          router.push('/login');
          return;
        }
        setUser(data);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [router]);

  // Auto-expand menu based on current path (Accordion style)
  useEffect(() => {
    const activeMenu = navItems.find(item => 
      item.isExpandable && item.subItems?.some(sub => pathname === sub.href)
    );
    if (activeMenu && expandedMenu !== activeMenu.name) {
      setExpandedMenu(activeMenu.name);
    }
  }, [pathname]);

  const filteredNavItems = navItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  const toggleMenu = (name: string) => {
    setExpandedMenu(prev => prev === name ? null : name);
  };

  const handleLogout = () => {
    document.cookie = "paisa_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Iniciando Ecossistema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-emerald-950 text-white transition-all duration-500 ease-in-out flex flex-col z-50 shadow-2xl relative
          ${isSidebarOpen ? 'w-80' : 'w-24'}`}
      >
        {/* Sidebar Header */}
        <div className="p-8 flex items-center justify-between mb-4">
          {isSidebarOpen ? (
            <div className="animate-fade-in">
              <h1 className="text-xl font-black tracking-tighter leading-none italic font-headline uppercase">
                Usina Paisa
              </h1>
              <p className="text-[9px] font-bold text-emerald-500 tracking-[0.3em] uppercase mt-1">
                Precision Ecosystem
              </p>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 bg-emerald-800 rounded-2xl flex items-center justify-center font-black italic text-xl">P</div>
            </div>
          )}
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-emerald-800 rounded-xl transition-colors text-emerald-400"
          >
            {isSidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {filteredNavItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
            const isExpanded = expandedMenu === item.name;

            return (
              <div key={item.name} className="space-y-1">
                {item.isExpandable ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group
                        ${isExpanded ? 'bg-emerald-900/50 text-white' : 'text-emerald-100/50 hover:bg-emerald-900/30 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className={isExpanded ? 'text-emerald-400' : 'text-emerald-100/30 group-hover:text-emerald-400 transition-colors'} />
                        {isSidebarOpen && <span className="animate-fade-in">{item.name}</span>}
                      </div>
                      {isSidebarOpen && (
                        isExpanded ? <ChevronUpIcon size={14} className="text-emerald-400" /> : <ChevronDownIcon size={14} />
                      )}
                    </button>
                    
                    {isExpanded && isSidebarOpen && (
                      <div className="ml-8 pr-2 space-y-1 animate-slide-down">
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                              pathname === sub.href
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                : 'text-slate-400 hover:bg-slate-50/5 hover:text-white'
                            }`}
                          >
                            <sub.icon size={16} />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group
                      ${isActive 
                        ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-105' 
                        : 'text-emerald-100/50 hover:bg-emerald-900/30 hover:text-white'}`}
                  >
                    <item.icon size={20} className={isActive ? 'text-white' : 'text-emerald-100/30 group-hover:text-emerald-400 transition-colors'} />
                    {isSidebarOpen && <span className="animate-fade-in">{item.name}</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        {user && (
          <div className={`p-6 mt-auto border-t border-emerald-900/50 transition-all duration-300 ${isSidebarOpen ? 'bg-emerald-950' : 'bg-emerald-950'}`}>
            <Link 
              href="/dashboard/perfil"
              className={`flex items-center gap-4 group cursor-pointer ${!isSidebarOpen && 'justify-center'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-emerald-700 group-hover:border-emerald-400 transition-all shadow-lg">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserCompIcon size={24} className="opacity-50" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-emerald-950 rounded-full"></div>
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0 animate-fade-in">
                  <p className="text-[11px] font-black uppercase italic tracking-tighter truncate leading-none text-white">
                    {user.name}
                  </p>
                  <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                    {user.role}
                  </p>
                </div>
              )}
            </Link>
            
            {isSidebarOpen && (
              <button 
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center gap-3 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-emerald-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20"
              >
                <LogOutIcon size={14} /> Encerrar Sessão
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Header Bar */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <MapPinIcon size={16} className="text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Unidade Matriz - Paisa Industrial</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                type="text" 
                placeholder="PROCURAR NO SISTEMA..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold tracking-widest focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none w-64"
              />
            </div>
            
            <button className="relative p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all group">
              <BellIcon size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <Link href="/dashboard/perfil" className="p-3 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
              <SettingsIcon size={20} />
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-slate-50/30">
          {(() => {
            const currentItem = navItems.find(item => 
              (item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)) ||
              (item.subItems?.some(sub => pathname === sub.href))
            );
            
            if (currentItem && user && currentItem.roles && !currentItem.roles.includes(user.role)) {
              return <AccessDenied />;
            }
            
            return children;
          })()}
        </div>

        {/* Page Footer */}
        <footer className="h-12 bg-white border-t border-slate-100 flex items-center justify-between px-10 shrink-0">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
            © 2024 USINA PAISA - SISTEMA DE GESTÃO INTEGRADA
          </p>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-[9px] font-black text-emerald-950 uppercase tracking-widest italic">Conectado ao Servidor Central</p>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        
        .font-headline {
          font-family: 'Inter', sans-serif;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 23, 42, 0.1);
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
