'use client';

import React, { useState } from 'react';
import { UserPlus, X, Save, AlertCircle } from 'lucide-react';
import { createQuickEmployee } from '@/app/dashboard/psicologia/pacientes/actions';

interface QuickEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (employee: any) => void;
}

export default function QuickEmployeeModal({ isOpen, onClose, onSuccess }: QuickEmployeeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    registrationNumber: '',
    position: 'GERAL',
    startDate: new Date().toISOString().split('T')[0],
    sectorId: '',
    workLocationId: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        cpf: formData.cpf,
        registrationNumber: formData.registrationNumber,
        position: formData.position,
        startDate: formData.startDate,
        sectorId: formData.sectorId,
        workLocationId: formData.workLocationId,
        isApprentice: false
      };

      const response = await fetch('/api/employees/quick-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.data);
        onClose();
      } else {
        setError(result.error || 'Erro ao criar funcionário.');
      }
    } catch (err: any) {
      setError('Erro de conexão ou técnico: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="bg-[#0E2F22] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserPlus className="text-[#cdf139]" size={24} />
            <h3 className="text-xl font-headline font-bold uppercase tracking-tight">Cadastro Rápido</h3>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center gap-3">
              <AlertCircle className="text-red-500" size={18} />
              <p className="text-xs text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Nome Completo</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#f2f4f3] border-none rounded-lg focus:ring-2 focus:ring-[#006C48] transition-all font-medium text-sm"
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">CPF</label>
                <input 
                  required
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none rounded-lg focus:ring-2 focus:ring-[#006C48] transition-all font-medium text-sm"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Matrícula (Opcional)</label>
                <input 
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                  className="w-full px-4 py-3 bg-[#f2f4f3] border-none rounded-lg focus:ring-2 focus:ring-[#006C48] transition-all font-medium text-sm"
                  placeholder="Ex: 12345"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#006C48] uppercase tracking-widest mb-2">Cargo</label>
              <input 
                required
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full px-4 py-3 bg-[#f2f4f3] border-none rounded-lg focus:ring-2 focus:ring-[#006C48] transition-all font-medium text-sm"
                placeholder="Ex: Operador"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#C1C8C2] text-[#0E2F22] font-bold text-sm rounded-lg hover:bg-[#eceeed] transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-[#0E2F22] text-white font-bold text-sm rounded-lg shadow-lg hover:bg-[#006C48] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={18} />
              )}
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
