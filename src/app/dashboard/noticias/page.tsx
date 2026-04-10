'use client';

import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  ChevronRight,
  Eye,
  Calendar,
  Tag
} from 'lucide-react';
import NewsForm from '@/components/NewsForm';
import { getNews, deleteNews } from './actions';

export default function NoticiasDashboard() {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir esta notícia permanentemente?')) return;
    try {
      const result = await deleteNews(id);
      if (result.success) {
        setNews(news.filter(n => n.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (isLoading && news.length === 0) {
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
          <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight flex items-center gap-3">
            <Newspaper className="text-emerald-600" />
            Gestão de Notícias
          </h1>
          <p className="text-slate-500">Publique comunicados, novidades e artigos no portal da Usina.</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => { setIsFormOpen(true); setEditingNews(null); }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            <Plus size={18} />
            Nova Notícia
          </button>
        )}
      </header>

      {isFormOpen ? (
        <div className="py-4">
          <NewsForm 
            initialData={editingNews} 
            onCancel={() => setIsFormOpen(false)} 
            onSuccess={() => { setIsFormOpen(false); fetchNews(); }} 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
              {/* Image Preview */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                {item.image ? (
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={item.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Newspaper size={40} />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-sm ${
                    item.status === 'PUBLICO' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                  }`}>
                    {item.status === 'PUBLICO' ? 'Público' : 'Rascunho'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={12} />
                    {item.category}
                  </div>
                </div>

                <h3 className="text-lg font-headline font-extrabold text-emerald-950 line-clamp-2 leading-tight uppercase italic tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed flex-grow">
                  {item.excerpt || item.content.substring(0, 150) + '...'}
                </p>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => { setEditingNews(item); setIsFormOpen(true); }}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <a 
                    href={`/noticias/${item.id}`}
                    target="_blank"
                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1 group/link"
                  >
                    Ver <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {news.length === 0 && !isLoading && (
            <div className="col-span-full border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Newspaper size={32} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-emerald-950 uppercase tracking-widest">Nenhuma notícia publicada</p>
                <p className="text-sm text-slate-400">Crie sua primeira postagem clicando no botão acima.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
