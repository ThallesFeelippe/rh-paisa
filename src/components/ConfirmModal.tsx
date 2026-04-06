'use client';

import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#00190f]/90 backdrop-blur-md animate-fade">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slideUp border border-[#c1c8c2]/30">
        
        {/* Header/Icon Area */}
        <div className={`p-8 flex flex-col items-center text-center ${variant === 'danger' ? 'bg-[#ffdad6]/30' : 'bg-[#fef7da]/30'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${variant === 'danger' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#fef7da] text-[#a1810b]'}`}>
            {variant === 'danger' ? <Trash2 size={32} /> : <AlertCircle size={32} />}
          </div>
          <h3 className="text-2xl font-extrabold text-[#00190f] font-headline uppercase leading-tight italic tracking-tighter">
            {title}
          </h3>
          <p className="mt-4 text-[#414844] text-sm font-body leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-white flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-xl border border-[#c1c8c2] text-[#414844] font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#f2f4f3] transition-all"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-6 py-4 rounded-xl text-white font-headline font-bold text-xs uppercase tracking-widest transition-all shadow-lg ${variant === 'danger' ? 'bg-[#ba1a1a] hover:bg-[#93000a] shadow-[#ba1a1a]/20' : 'bg-[#006C48] hover:bg-[#004d33] shadow-[#006C48]/20'}`}
          >
            {confirmText}
          </button>
        </div>

        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#414844]/40 hover:text-[#00190f] transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
