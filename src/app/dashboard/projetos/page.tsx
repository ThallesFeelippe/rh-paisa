'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  GalleryVertical,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import ProjectForm from '@/components/ProjectForm';

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error('Projects API returned non-array data:', data);
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este projeto permanentemente?')) return;
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight flex items-center gap-3">
            <GalleryVertical className="text-emerald-600" />
            Gestão de Projetos Sociais
          </h1>
          <p className="text-slate-500">Administre as publicações que aparecem na galeria do site.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => { setIsFormOpen(true); setEditingProject(null); }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Novo Projeto
          </button>
        )}
      </header>

      {isFormOpen ? (
        <div className="py-4">
          <ProjectForm 
            initialData={editingProject} 
            onCancel={() => setIsFormOpen(false)} 
            onSuccess={() => { setIsFormOpen(false); fetchProjects(); }} 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
              {/* Image Preview */}
              <div className="h-56 relative overflow-hidden bg-slate-100">
                {project.images && JSON.parse(project.images)[0] ? (
                  <img 
                    src={JSON.parse(project.images)[0]} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={project.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Briefcase size={40} />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-black text-emerald-950 tracking-widest uppercase shadow-sm">
                    {project.date}
                  </span>
                </div>
                {JSON.parse(project.images || '[]').length > 1 && (
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-emerald-600/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1">
                      +{JSON.parse(project.images).length - 1} fotos
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8 space-y-4 flex-grow">
                <div className="flex items-center gap-2 text-emerald-600">
                  <MapPin size={14} className="opacity-60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{project.location}</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-emerald-950 truncate leading-tight italic uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed h-[2.5rem]">
                  {project.description}
                </p>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => { setEditingProject(project); setIsFormOpen(true); }}
                      className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <a 
                    href="/acoes-sociais" 
                    target="_blank"
                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1 group/link"
                  >
                    Ver no Site <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Briefcase size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-emerald-950 uppercase tracking-widest">Nenhum projeto cadastrado</p>
                <p className="text-sm text-slate-400">Comece adicionando o primeiro projeto social para exibir na galeria.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
