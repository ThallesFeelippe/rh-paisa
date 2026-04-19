'use client';

import React, { useState, useMemo } from 'react';
import { MessageSquarePlus, Send, History, FileText, Filter, Calendar } from 'lucide-react';
import { addEvolution } from '@/app/dashboard/psicologia/pacientes/actions';
import LaudoReport from './LaudoReport';

interface EvolutionListProps {
  profile: any;
  evolutions: any[];
}

export default function EvolutionList({ profile, evolutions }: EvolutionListProps) {
  const [newEvolution, setNewEvolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  // Filtering state
  const [dateFilter, setDateFilter] = useState({
    start: '',
    end: ''
  });

  const filteredEvolutions = useMemo(() => {
    return evolutions.filter(evo => {
      if (!dateFilter.start && !dateFilter.end) return true;
      const evoDate = new Date(evo.createdAt).toISOString().split('T')[0];
      const start = dateFilter.start || '1970-01-01';
      const end = dateFilter.end || '9999-12-31';
      return evoDate >= start && evoDate <= end;
    });
  }, [evolutions, dateFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvolution.trim()) return;

    setIsSubmitting(true);
    const result = await addEvolution(profile.id, newEvolution);

    if (result.success) {
      setNewEvolution('');
      window.location.reload(); 
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Controls: Report & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#f2f4f3]/50 p-4 rounded-2xl border border-[#C1C8C2]/20">
        <button 
          onClick={() => setIsReportOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0E2F22] text-white text-xs font-bold rounded-xl hover:bg-[#006C48] transition-all shadow-lg"
        >
          <FileText size={16} className="text-[#cdf139]" />
          GERAR LAUDO COMPLETO
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727974]" size={14} />
            <input 
              type="date"
              value={dateFilter.start}
              onChange={(e) => setDateFilter({...dateFilter, start: e.target.value})}
              className="pl-9 pr-3 py-2 bg-white border border-[#C1C8C2]/30 rounded-lg text-[10px] font-bold text-[#0E2F22] outline-none focus:ring-1 focus:ring-[#006C48]"
            />
          </div>
          <span className="text-[#727974] text-[10px] font-bold">ATÉ</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727974]" size={14} />
            <input 
              type="date"
              value={dateFilter.end}
              onChange={(e) => setDateFilter({...dateFilter, end: e.target.value})}
              className="pl-9 pr-3 py-2 bg-white border border-[#C1C8C2]/30 rounded-lg text-[10px] font-bold text-[#0E2F22] outline-none focus:ring-1 focus:ring-[#006C48]"
            />
          </div>
        </div>
      </div>

      {/* New Evolution Form */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea 
          value={newEvolution}
          onChange={(e) => setNewEvolution(e.target.value)}
          placeholder="Adicionar nova evolução clínica..."
          rows={3}
          className="w-full bg-[#f2f4f3] border-none rounded-2xl p-4 pr-16 text-sm font-medium focus:ring-1 focus:ring-[#006C48] outline-none placeholder:text-[#727974] shadow-inner"
        />
        <button 
          type="submit"
          disabled={isSubmitting || !newEvolution.trim()}
          className="absolute right-4 bottom-4 p-3 bg-[#006C48] text-white rounded-xl hover:bg-[#0E2F22] transition-all disabled:opacity-50 disabled:bg-[#C1C8C2]"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>

      {/* History List */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredEvolutions.length > 0 ? (
          filteredEvolutions.map((evo) => (
            <div key={evo.id} className="relative pl-6 border-l-2 border-[#C1C8C2]/30 space-y-2 group animate-fade-in">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#006C48] group-hover:scale-125 transition-transform"></div>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#006C48]">{evo.authorName}</p>
                <p className="text-[9px] font-bold text-[#727974]">{new Date(evo.createdAt).toLocaleString('pt-BR')}</p>
              </div>
              <p className="text-sm font-medium text-[#0E2F22] leading-relaxed bg-white border border-[#C1C8C2]/10 p-5 rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                {evo.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-30 border-2 border-dashed border-[#C1C8C2]/30 rounded-3xl">
            <History size={48} className="mx-auto mb-4" />
            <p className="text-xs font-black uppercase tracking-[0.2em]">Nenhuma evolução para este período.</p>
          </div>
        )}
      </div>

      <LaudoReport 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        profile={profile}
        evolutions={filteredEvolutions}
      />
    </div>
  );
}
