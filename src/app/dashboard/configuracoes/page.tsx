'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  FileUp, 
  Loader2, 
  ExternalLink,
  Download
} from 'lucide-react';

interface ReportData {
  name: string;
  path: string;
  updatedAt: string;
}

export default function SettingsPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await fetch('/api/admin/report');
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error('Error fetching report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setStatus({ type: 'error', message: 'Por favor, envie apenas arquivos PDF.' });
      return;
    }

    setIsUploading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/report', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setReport(data.report);
        setStatus({ type: 'success', message: 'Relatório atualizado com sucesso!' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Erro ao fazer upload.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor.' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir o relatório atual?')) return;

    try {
      const res = await fetch('/api/admin/report', {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setReport(null);
        setStatus({ type: 'success', message: 'Relatório excluído com sucesso.' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Erro ao excluir.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexão.' });
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
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-black text-emerald-950 uppercase italic tracking-tight">Configurações do Sistema</h1>
        <p className="text-slate-500">Gerencie arquivos e documentos globais da Usina PAISA.</p>
      </header>

      {/* Report Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <FileText size={20} />
          </div>
          <h2 className="font-headline font-bold text-lg text-emerald-950 uppercase italic">Relatório de Transparência</h2>
        </div>

        <div className="p-8">
          {status && (
            <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Current File Info */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">PDF Ativo no Site</h3>
              
              {report ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group overflow-hidden">
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-red-500">
                      <FileUp size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-emerald-950 truncate mb-1">{report.name}</p>
                      <p className="text-xs text-slate-400">Atualizado em: {new Date(report.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <a 
                      href={report.path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1 hover:underline"
                    >
                      Visualizar <ExternalLink size={12} />
                    </a>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <button 
                      onClick={handleDelete}
                      className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-1 hover:underline"
                    >
                      Excluir <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Icon watermark */}
                  <FileText className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-200 opacity-20 -z-0" />
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Download size={24} />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Nenhum relatório configurado.</p>
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Atualizar Documento</h3>
              
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
                  ${isUploading ? 'opacity-50 cursor-not-allowed border-slate-200' : 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50 hover:border-emerald-400'}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf"
                  className="hidden"
                />
                
                {isUploading ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
                    <p className="text-sm font-bold text-emerald-950 uppercase tracking-widest">Enviando Arquivo...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-950 uppercase tracking-widest mb-1">Escolher PDF no PC</p>
                      <p className="text-xs text-slate-400">O arquivo antigo será substituído</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-[10px] text-amber-700 font-bold uppercase leading-relaxed">
                  ⚠️ Importante: Após o upload, a página "Sobre Nós" será atualizada automaticamente com o novo arquivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
