'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  Plus, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Type, 
  AlignLeft,
  Loader2,
  Trash2,
  Upload,
  Download
} from 'lucide-react';

interface ProjectData {
  id?: string;
  title: string;
  location: string;
  date: string;
  description: string;
  images: string; // JSON string
  status?: string;
  category?: string;
  responsible?: string;
  impactTitle?: string;
  impactDescription?: string;
}

interface ProjectFormProps {
  initialData?: ProjectData;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    location: initialData?.location || '',
    date: initialData?.date || '',
    description: initialData?.description || '',
    status: initialData?.status || 'Concluído',
    category: initialData?.category || 'Social',
    responsible: initialData?.responsible || 'RH Paisa',
    impactTitle: initialData?.impactTitle || 'Impacto Gerado',
    impactDescription: initialData?.impactDescription || '',
    images: initialData?.images ? JSON.parse(initialData.images) : []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);
    const data = new FormData();
    files.forEach(file => data.append('files', file));

    try {
      const res = await fetch('/api/upload/projects', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...result.paths]
        }));
      } else {
        setError(result.error || 'Erro no upload de imagens');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Falha na comunicação com o servidor durante o upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = initialData ? `/api/admin/projects/${initialData.id}` : '/api/admin/projects';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        onSuccess();
      } else {
        setError(result.error || 'Erro ao salvar o projeto');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setError('Erro de conexão ou falha no servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl max-w-5xl mx-auto">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-shake">
          <X className="w-5 h-5 flex-shrink-0 cursor-pointer" onClick={() => setError(null)} />
          <p className="font-medium">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Basic Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Informações Básicas</label>
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase text-slate-400">Título</label>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors w-4 h-4" />
                  <input required className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm" placeholder="Ex: Natal Solidário" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-slate-400">Local</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors w-4 h-4" />
                    <input required className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm" placeholder="Localidade" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-slate-400">Data</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors w-4 h-4" />
                    <input required className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm" placeholder="Mês/Ano" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase text-slate-400">Descrição Principal</label>
                <div className="relative group">
                  <AlignLeft className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors w-4 h-4" />
                  <textarea required rows={4} className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm resize-none" placeholder="Descrição da listagem..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Ficha Técnica & Impacto (Reportagem)</label>
            <div className="space-y-4 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-slate-400">Status</label>
                  <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs" placeholder="Ex: Concluído" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-slate-400">Pilar ESG</label>
                  <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs" placeholder="Ex: Social" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-slate-400">Unidade Responsável</label>
                <input className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs" placeholder="Ex: RH & Sustentabilidade" value={formData.responsible} onChange={e => setFormData({ ...formData, responsible: e.target.value })} />
              </div>

              <div className="pt-2 border-t border-emerald-100 space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-emerald-600">Título da Seção de Impacto</label>
                  <input className="w-full px-4 py-2 bg-white border border-emerald-100 rounded-lg text-xs font-bold" placeholder="Impacto Gerado" value={formData.impactTitle} onChange={e => setFormData({ ...formData, impactTitle: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-emerald-600">Descrição do Impacto (Caixa Verde)</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-white border border-emerald-100 rounded-lg text-xs resize-none" placeholder="Texto que aparece na caixa verde..." value={formData.impactDescription} onChange={e => setFormData({ ...formData, impactDescription: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Images Area */}
        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Galeria de Fotos</label>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 min-h-[400px] content-start">
            {formData.images.map((img: string, idx: number) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group border border-slate-100 shadow-sm bg-slate-50">
                <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <button 
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-emerald-300 hover:bg-emerald-50/20 hover:text-emerald-600 transition-all bg-slate-50"
            >
              {isUploading ? <Loader2 className="animate-spin" /> : <Plus />}
              <span className="text-[10px] font-bold uppercase tracking-tighter">Add Foto</span>
            </button>
          </div>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <p className="text-[10px] text-slate-400 text-center italic">A primeira foto será a capa da reportagem.</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-50">
        <button 
          type="button"
          onClick={onCancel}
          className="px-8 py-4 font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          disabled={isSubmitting || isUploading}
          className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
          {initialData ? 'SALVAR ALTERAÇÕES' : 'PUBLICAR PROJETO'}
        </button>
      </div>
    </form>
  );
}
