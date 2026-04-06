'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  User, 
  Contact, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  ArrowRight, 
  CheckCircle,
  Loader2,
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { submitApplication } from '@/app/dashboard/candidatos/actions';
import { getJobs } from '@/app/dashboard/vagas/actions';
import Link from 'next/link';

export default function InscricaoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobIdFromQuery = searchParams.get('job') || 'general';
  
  const [jobs, setJobs] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    cpf: '',
    education: 'Ensino Médio',
    maritalStatus: 'Solteiro(a)',
    email: '',
    phone: '',
    address: '',
    motivation: '',
    jobId: jobIdFromQuery,
  });

  const [files, setFiles] = useState<{ photo: File | null; resume: File | null }>({
    photo: null,
    resume: null,
  });

  useEffect(() => {
    async function loadJobs() {
      const data = await getJobs();
      setJobs(data);
    }
    loadJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    
    if (files.photo) data.append('photoFile', files.photo);
    if (files.resume) data.append('resumeFile', files.resume);

    try {
      const res = await submitApplication(data);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => router.push('/vagas'), 5000);
      } else {
        setMessage(res.message || 'Erro ao enviar candidatura.');
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-12 rounded-2xl shadow-2xl text-center border-t-8 border-[#006C48] animate-fade">
          <div className="w-20 h-20 bg-[#92f7c3]/40 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00734d]">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-[#00190f] font-headline uppercase italic mb-4">Candidatura Recebida!</h2>
          <p className="text-[#414844] mb-8 font-body">Seu currículo foi enviado com sucesso ao nosso RH. Entraremos em contato caso seu perfil se alinhe às nossas necessidades.</p>
          <p className="text-[10px] text-[#414844]/60 uppercase tracking-widest font-bold">Redirecionando em alguns segundos...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#f8faf9] min-h-screen pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Branding */}
        <div className="lg:col-span-4 space-y-8">
          <Link href="/vagas" className="inline-flex items-center gap-2 text-[#006C48] font-bold text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform font-headline italic">
            ← Voltar para Vagas
          </Link>
          <div className="inline-block px-4 py-1 bg-[#92f7c3] text-[#002113] text-xs font-bold uppercase tracking-widest rounded-full font-headline italic">
            Semeie seu Futuro
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#00190f] font-headline uppercase italic leading-none tracking-tighter">
            Cultive seu <span className="text-[#006C48]">Sucesso</span> Conosco.
          </h1>
          <p className="text-[#414844] text-lg leading-relaxed font-body">
            Junte-se à USINA PAISA e faça parte de um ecossistema de precisão que une tecnologia industrial à sustentabilidade vital.
          </p>
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-xl group border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              alt="Industrial Plant"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-[#0e2f22]/30 mix-blend-multiply"></div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-8 bg-white p-10 md:p-14 rounded-2xl shadow-xl border border-[#c1c8c2]/30">
          <form className="space-y-12" onSubmit={handleSubmit}>
            
            {/* Vaga Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#c1c8c2]/30 pb-4">
                <Briefcase className="text-[#006c48] w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#00190f] font-headline uppercase italic">Oportunidade Escolhida</h2>
              </div>
              <select 
                className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 text-[#00190f] font-bold rounded-lg cursor-pointer"
                value={formData.jobId}
                onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
              >
                <option value="general">BANCO DE TALENTOS GERAL</option>
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.title} ({j.location})</option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-[#c1c8c2]/30 pb-4">
                <User className="text-[#006c48] w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#00190f] font-headline uppercase italic">Informações Pessoais</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Nome Completo</label>
                  <input 
                    required type="text" placeholder="Ex: João Silva" 
                    className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Idade</label>
                    <input 
                      required type="number" placeholder="00" 
                      className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg text-center"
                      value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">CPF</label>
                    <input 
                      required type="text" placeholder="000.000.000-00" 
                      className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg"
                      value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-[#c1c8c2]/30 pb-4">
                <Contact className="text-[#006c48] w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#00190f] font-headline uppercase italic">Contato</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">E-mail</label>
                  <input 
                    required type="email" placeholder="contato@paisa.com" 
                    className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Telefone / WhatsApp</label>
                  <input 
                    required type="tel" placeholder="(00) 00000-0000" 
                    className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#414844]">Endereço Completo</label>
                <input 
                  required type="text" placeholder="Rua, Número, Cidade - UF" 
                  className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value })}
                />
              </div>
            </div>

            {/* Files & Motivation */}
            <div className="space-y-8">
               <div className="flex items-center gap-3 border-b border-[#c1c8c2]/30 pb-4">
                <FileText className="text-[#006c48] w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#00190f] font-headline uppercase italic">Currículo e Apresentação</h2>
              </div>
              <p className="text-xs text-[#414844] italic">Por que você deseja trabalhar na Usina Paisa?</p>
              <textarea 
                className="w-full bg-[#f2f4f3] border-none focus:ring-1 focus:ring-[#006C48] p-4 rounded-lg min-h-[120px]"
                placeholder="Conte-nos um pouco sobre sua trajetória..."
                value={formData.motivation} onChange={(e) => setFormData({...formData, motivation: e.target.value })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FileUploadCard 
                  icon={<ImageIcon size={20} />} 
                  label="Foto de Perfil" 
                  accept="image/*" 
                  fileName={files.photo?.name}
                  onChange={(file) => setFiles({ ...files, photo: file })}
                />
                <FileUploadCard 
                  icon={<Upload size={20} />} 
                  label="Currículo (PDF)" 
                  accept=".pdf" 
                  fileName={files.resume?.name}
                  onChange={(file) => setFiles({ ...files, resume: file })}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8">
              {message && (
                <div className="bg-[#ffdad6] text-[#ba1a1a] p-4 rounded-lg mb-6 flex items-center gap-3 text-xs font-bold font-headline uppercase italic">
                  <AlertCircle size={20} /> {message}
                </div>
              )}
              <button 
                disabled={isSubmitting}
                className="w-full bg-[#0e2f22] text-white py-6 rounded-lg font-headline font-bold uppercase tracking-[0.2em] italic text-sm hover:bg-[#006C48] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-[#0e2f22]/30"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    ENVIAR CANDIDATURA <ArrowRight size={20} />
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-[#414844]/60 uppercase tracking-widest font-black italic mt-6">
                Seus dados estão protegidos pela LGPD e serão tratados com sigilo industrial.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function FileUploadCard({ icon, label, accept, fileName, onChange }: { icon: any, label: string, accept: string, fileName?: string, onChange: (file: File | null) => void }) {
  return (
    <div className={`relative group border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer text-center ${fileName ? 'border-[#006C48] bg-[#92f7c3]/10' : 'border-[#c1c8c2] hover:border-[#006C48] hover:bg-[#f8faf9]'}`}>
      <input 
        type="file" 
        accept={accept} 
        className="absolute inset-0 opacity-0 cursor-pointer" 
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
      <div className="flex flex-col items-center">
        <div className={`p-3 rounded-full transition-transform mb-3 ${fileName ? 'bg-[#006C48] text-white' : 'bg-[#e6e9e8] text-[#006C48] group-hover:scale-110'}`}>
          {fileName ? <CheckCircle size={20} /> : icon}
        </div>
        <p className="text-sm font-bold text-[#00190f] font-headline uppercase italic">{fileName || label}</p>
        <p className="text-[10px] text-[#414844]/60 uppercase tracking-widest font-bold mt-1">
          {fileName ? 'Arquivo selecionado' : 'Sincronização imediata'}
        </p>
      </div>
    </div>
  );
}
