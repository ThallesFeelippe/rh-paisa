'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Image as ImageIcon, 
  Type, 
  AlignLeft,
  Loader2,
  Upload,
  Send,
  Video,
  Settings,
  Globe,
  Tag,
  Calendar,
  User,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface NewsData {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  gallery?: string;
  category: string;
  tags?: string;
  status: string;
  authorName?: string;
  authorAvatar?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string | Date;
}

interface NewsFormProps {
  initialData?: NewsData;
  onSuccess: () => void;
  onCancel: () => void;
}

type TabType = 'GERAL' | 'MIDIA' | 'SEO' | 'CONFIG';

export default function NewsForm({ initialData, onSuccess, onCancel }: NewsFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('GERAL');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || 'Geral',
    status: initialData?.status || 'PUBLICO',
    image: initialData?.image || '',
    videoUrl: initialData?.videoUrl || '',
    gallery: initialData?.gallery || '[]',
    tags: initialData?.tags || '',
    authorName: initialData?.authorName || 'Comunicação Paisa',
    authorAvatar: initialData?.authorAvatar || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    publishedAt: initialData?.publishedAt 
      ? new Date(initialData.publishedAt).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<string[]>(() => {
    try {
      return formData.gallery ? JSON.parse(formData.gallery) : [];
    } catch (e) {
      return [];
    }
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'authorAvatar' | 'gallery' | 'video') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);
    const data = new FormData();
    
    if (target === 'gallery') {
      Array.from(files).forEach(file => data.append('files', file));
    } else {
      data.append('files', files[0]);
    }

    try {
      const res = await fetch('/api/upload/news', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      
      if (result.success) {
        if (target === 'gallery') {
          const newGallery = [...galleryItems, ...result.paths];
          setGalleryItems(newGallery);
          setFormData(prev => ({ ...prev, gallery: JSON.stringify(newGallery) }));
        } else if (target === 'video') {
            setFormData(prev => ({ ...prev, videoUrl: result.paths[0] }));
        } else {
          setFormData(prev => ({
            ...prev,
            [target]: result.paths[0]
          }));
        }
      } else {
        setError(result.error || 'Erro no upload do arquivo');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Falha no upload do arquivo.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = galleryItems.filter((_, i) => i !== index);
    setGalleryItems(newGallery);
    setFormData(prev => ({ ...prev, gallery: JSON.stringify(newGallery) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));

    try {
      const { createNews, updateNews } = await import('@/app/dashboard/noticias/actions');
      const result = initialData 
        ? await updateNews(initialData.id!, submitData)
        : await createNews(submitData);

      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Erro ao salvar a notícia no banco de dados');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setError('Erro de conexão ou erro interno no servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: TabType, label: string, icon: any }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
        activeTab === id 
        ? 'border-emerald-600 text-emerald-950 bg-emerald-50/30' 
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
      }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row h-[85vh] animate-fade">
      {/* Left Navigation */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Settings size={18} />
            </div>
            <span className="font-headline font-black text-emerald-950 uppercase tracking-tighter text-sm italic italic">Estúdio Pro</span>
        </div>

        <div className="flex flex-col gap-1">
            <TabButton id="GERAL" label="Conteúdo" icon={FileText} />
            <TabButton id="MIDIA" label="Mídia & Visual" icon={Video} />
            <TabButton id="SEO" label="SEO & Social" icon={Globe} />
            <TabButton id="CONFIG" label="Configurações" icon={Tag} />
        </div>

        <div className="mt-auto pt-8 border-t border-slate-200">
            <div className="bg-emerald-100/50 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <div>
                    <p className="text-[9px] font-black text-emerald-900 uppercase">Status Final</p>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase">{formData.status}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col relative overflow-hidden">
        {error && (
            <div className="mx-8 mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
                <X className="w-5 h-5 flex-shrink-0 cursor-pointer" onClick={() => setError(null)} />
                <p className="font-medium">{error}</p>
            </div>
        )}

        <div className="flex-grow overflow-y-auto p-12 custom-scrollbar">
            {/* TAB: GERAL */}
            {activeTab === 'GERAL' && (
                <div className="space-y-10 animate-fade-up">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identidade da Notícia</label>
                        <div className="space-y-6">
                            <div className="group">
                                <input 
                                    required 
                                    className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-emerald-500 transition-all outline-none text-4xl font-black text-emerald-950 placeholder:text-slate-200 uppercase italic font-headline" 
                                    placeholder="Título Impactante aqui..." 
                                    value={formData.title} 
                                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                                />
                            </div>
                            <textarea 
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 focus:ring-2 focus:ring-emerald-500/10 outline-none text-lg leading-relaxed text-slate-600 font-medium italic" 
                                placeholder="Um resumo curto para prender a atenção do leitor..." 
                                value={formData.excerpt} 
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })} 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Autor da Matéria</label>
                            <div className="flex items-center gap-6">
                                <div 
                                    onClick={() => authorInputRef.current?.click()}
                                    className="w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden"
                                >
                                    {formData.authorAvatar ? <img src={formData.authorAvatar} className="w-full h-full object-cover" /> : <User className="text-slate-300" />}
                                </div>
                                <div className="flex-grow">
                                    <input 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-emerald-950" 
                                        value={formData.authorName} 
                                        onChange={e => setFormData({ ...formData, authorName: e.target.value })} 
                                    />
                                    <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Responsável pela redação</p>
                                </div>
                                <input type="file" ref={authorInputRef} className="hidden" onChange={e => handleFileUpload(e, 'authorAvatar')} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Corpo do Artigo</label>
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Suporte para HTML Básico</span>
                        </div>
                        <textarea 
                            required 
                            rows={15} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-10 focus:ring-2 focus:ring-emerald-500/10 outline-none text-lg leading-loose text-slate-700 font-body" 
                            placeholder="Desenvolva sua narrativa aqui..." 
                            value={formData.content} 
                            onChange={e => setFormData({ ...formData, content: e.target.value })} 
                        />
                    </div>
                </div>
            )}

            {/* TAB: MIDIA */}
            {activeTab === 'MIDIA' && (
                <div className="space-y-12 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capa Principal</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[16/10] rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-all overflow-hidden group shadow-lg"
                            >
                                {formData.image ? (
                                    <img src={formData.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"><Upload className="text-emerald-600" /></div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Selecionar Capa</span>
                                    </>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={e => handleFileUpload(e, 'image')} />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vídeo de Destaque</label>
                            <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4">
                                <div className="flex bg-white p-1 rounded-xl shadow-sm">
                                    <input 
                                        className="flex-grow bg-transparent px-4 py-2 text-xs font-bold outline-none" 
                                        placeholder="Link do YouTube ou Vimeo" 
                                        value={formData.videoUrl} 
                                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => videoInputRef.current?.click()}
                                        className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        <Upload size={14} />
                                    </button>
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Aparece no topo da matéria</p>
                                <input type="file" ref={videoInputRef} className="hidden" onChange={e => handleFileUpload(e, 'video')} accept="video/*" />
                                {formData.videoUrl && (
                                    <div className="text-[10px] font-bold text-emerald-600 truncate flex items-center gap-2">
                                        <Video size={12} /> {formData.videoUrl.split('/').pop()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Galeria Adicional</label>
                            <button 
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                            >
                                <Plus size={14} /> Adicionar Fotos
                            </button>
                        </div>
                        <input type="file" multiple ref={galleryInputRef} className="hidden" onChange={e => handleFileUpload(e, 'gallery')} />
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {galleryItems.map((url, i) => (
                                <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-md">
                                    <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    <button 
                                        type="button"
                                        onClick={() => removeGalleryItem(i)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            <div 
                                onClick={() => galleryInputRef.current?.click()}
                                className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <ImageIcon className="text-slate-200" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: SEO */}
            {activeTab === 'SEO' && (
                <div className="space-y-12 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link Permanente (Slug)</label>
                                <div className="flex gap-2">
                                    <div className="flex-grow flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                                        <span className="text-slate-300 text-xs font-bold mr-1">noticias/</span>
                                        <input 
                                            className="bg-transparent text-xs font-bold text-emerald-950 flex-grow outline-none" 
                                            value={formData.slug} 
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                                        />
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={generateSlug}
                                        className="bg-slate-950 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                    >
                                        <Search size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Título SEO</label>
                                <input 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-emerald-950" 
                                    placeholder="Ex: Novo Recorde na Safra 2024 | Usina Paisa"
                                    value={formData.metaTitle} 
                                    onChange={e => setFormData({ ...formData, metaTitle: e.target.value })} 
                                />
                            </div>
                        </div>

                        {/* Google Preview */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preview Google</label>
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-2">
                                <p className="text-xs text-[#202124] mb-1">paisa.com.br › noticias › {formData.slug || '...'}</p>
                                <h4 className="text-xl text-[#1a0dab] font-medium leading-tight">{formData.metaTitle || formData.title || 'Título da Notícia'}</h4>
                                <p className="text-sm text-[#4d5156] line-clamp-2 leading-relaxed">
                                    {formData.metaDescription || formData.excerpt || 'A descrição SEO aparecerá aqui para atrair mais cliques nos buscadores...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-slate-50">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Descrição SEO</label>
                        <textarea 
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 focus:ring-2 focus:ring-emerald-500/10 outline-none text-sm leading-relaxed text-slate-600 font-medium" 
                            placeholder="Descreva o conteúdo para o Google da forma mais atraente possível..." 
                            value={formData.metaDescription} 
                            onChange={e => setFormData({ ...formData, metaDescription: e.target.value })} 
                        />
                    </div>
                </div>
            )}

            {/* TAB: CONFIG */}
            {activeTab === 'CONFIG' && (
                <div className="space-y-12 animate-fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoria Principal</label>
                            <select 
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-600/10"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Geral">Geral</option>
                                <option value="Produção">Produção</option>
                                <option value="Sustentabilidade">Sustentabilidade</option>
                                <option value="Eventos">Eventos</option>
                                <option value="Comunicado">Comunicado</option>
                                <option value="ESG">ESG & Social</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status de Visibilidade</label>
                            <select 
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-600/10"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="PUBLICO">Publicado (Ao Vivo)</option>
                                <option value="RASCUNHO">Rascunho (Privado)</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data de Publicação</label>
                            <div className="relative">
                                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" />
                                <input 
                                    type="date"
                                    className="w-full px-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-600/10"
                                    value={formData.publishedAt}
                                    onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tags Rápidas</label>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Separadas por vírgula</span>
                        </div>
                        <div className="relative group">
                            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 w-5 h-5 transition-colors" />
                            <input 
                                className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-[28px] text-sm font-black text-emerald-950 placeholder:text-slate-300 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all" 
                                placeholder="sustentabilidade, tecnologia, safra2024..."
                                value={formData.tags} 
                                onChange={e => setFormData({ ...formData, tags: e.target.value })} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-12 border-t border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
            <button 
                type="button"
                onClick={onCancel}
                className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all flex items-center gap-2"
            >
                <X size={14} /> DESCARTAR
            </button>
            <div className="flex gap-4">
                <button 
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="bg-emerald-950 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-emerald-950/20 hover:bg-emerald-800 transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95 group"
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    {initialData ? 'SALVAR ATUALIZAÇÃO' : 'PUBLICAR NO MURAL'}
                </button>
            </div>
        </div>
      </div>
    </form>
  );
}
