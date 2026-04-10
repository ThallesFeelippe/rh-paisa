'use client';

import React from 'react';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
  };

  return (
    <form className="flex flex-col sm:flex-row gap-4 max-w-xl group" onSubmit={handleSubmit}>
      <div className="flex-grow relative">
        <input 
          className="w-full bg-white/[0.04] border border-white/10 text-white placeholder:text-white/20 px-8 py-6 rounded-2xl focus:ring-1 focus:ring-secondary focus:bg-white/[0.08] transition-all outline-none text-lg font-medium" 
          placeholder="E-mail corporativo" 
          type="email"
          required
        />
      </div>
      <button 
        className="bg-secondary text-white px-12 py-6 font-bold rounded-2xl hover:bg-white hover:text-[#0e2f22] transition-all duration-500 whitespace-nowrap text-lg shadow-2xl active:scale-95" 
        type="submit"
      >
        Inscrever-se
      </button>
    </form>
  );
}
