'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  Download,
  Trash2
} from 'lucide-react';
import { getSustainabilitySettings, uploadSustainabilityReport } from './actions';

export default function SustentabilidadePage() {
  const [reportUrl, setReportUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getSustainabilitySettings();
    setReportUrl(data.reportUrl);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage({ text: 'Por favor, selecione um arquivo PDF.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await uploadSustainabilityReport(formData);
      if (res.success) {
        setMessage({ text: 'Relatório atualizado com sucesso!', type: 'success' });
        setReportUrl(res.url || '');
      } else {
        setMessage({ text: res.error || 'Erro ao fazer upload.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erro de conexão.', type: 'error' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#00190f] font-headline uppercase mb-2 italic flex items-center gap-4">
            <Leaf className="text-emerald-600" size={40} />
            Portal de Sustentabilidade
          </h2>
          <p className="text-[#414844] font-body text-sm font-medium border-l-2 border-emerald-600 pl-4 py-1">
            Gestão de transparência e indicadores ambientais da Usina Paisa.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 border border-[#c1c8c2]/30 shadow-xl shadow-emerald-900/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-600 text-white rounded-xl">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-bold font-headline text-[#00190f] uppercase">Relatório Anual</h3>
            </div>
            
            <p className="text-sm text-[#414844] mb-8 leading-relaxed">
              O relatório PDF será disponibilizado automaticamente na página de <strong>Meio Ambiente</strong> do site público para consulta de parceiros e investidores.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group hover:bg-emerald-50/50 ${
                isUploading ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-emerald-400'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf"
              />
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="animate-spin text-emerald-600 mb-4" size={32} />
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Fazendo Upload...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 mb-4">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-[#00190f]">Clique para selecionar o PDF</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Tamanho máximo: 20MB</p>
                </div>
              )}
            </div>
          </div>

          {message.text && (
            <div className={`mt-6 p-4 rounded-xl text-xs font-bold font-headline flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}
        </div>

        {/* Current State Section */}
        <div className="bg-[#0E2F22] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold font-headline uppercase mb-10 tracking-tight flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Status do Relatório
            </h3>

            {isLoading ? (
              <div className="py-10 flex flex-col items-center justify-center opacity-50">
                <Loader2 className="animate-spin mb-4" />
                <p className="text-[10px] uppercase tracking-widest">Buscando informações...</p>
              </div>
            ) : reportUrl ? (
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <FileText className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Arquivo Atual</p>
                      <p className="text-sm font-medium break-all">{reportUrl.split('/').pop()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={reportUrl} 
                    target="_blank" 
                    className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    <ExternalLink size={14} />
                    Visualizar Publicação
                  </a>
                  <a 
                    href={reportUrl} 
                    download
                    className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    <Download size={14} />
                    Download Local
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <XCircle size={32} className="text-white/20" />
                </div>
                <p className="text-sm text-white/40 font-medium">Nenhum relatório publicado ainda.</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-[9px] uppercase tracking-[0.2em] text-[#ABCFBB]/30 font-bold flex justify-between">
            <span>Sustentabilidade RH Paisa</span>
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function XCircle({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
