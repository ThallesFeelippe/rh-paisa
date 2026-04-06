import React from 'react';
import { Construction } from 'lucide-react';

export default function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#414844]">
      <div className="p-6 bg-[#e6e9e8] rounded-full mb-6">
        <Construction size={48} className="text-[#006C48]" />
      </div>
      <h2 className="text-2xl font-bold font-headline uppercase tracking-tight mb-2">{title}</h2>
      <p className="text-sm font-body max-w-md text-center">
        Esta funcionalidade do CRM está sendo integrada ao banco de dados e estará disponível em breve.
      </p>
    </div>
  );
}
