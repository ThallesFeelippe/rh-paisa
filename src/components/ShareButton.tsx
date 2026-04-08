'use client';

import React from 'react';
import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'Confira este projeto social da Usina Paisa!',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg ${
        copied 
        ? 'bg-emerald-500 text-white translate-y-[-2px]' 
        : 'bg-[#006c48] text-white hover:bg-[#00190f] hover:shadow-emerald-900/40'
      }`}
    >
      {copied ? (
        <>
          <Check size={16} /> Link Copiado!
        </>
      ) : (
        <>
          <Share2 size={16} /> Compartilhar Reportagem
        </>
      )}
    </button>
  );
}
