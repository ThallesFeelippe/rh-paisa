'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Send, 
  User, 
  MessageSquare, 
  Brain, 
  Users, 
  Loader2,
  Lock,
  MessageCircle,
  Hash,
  Trash2
} from 'lucide-react';
import { getChatMessages, sendChatMessage, deleteMessages } from './actions';
import { getCurrentUser } from '../perfil/actions';
import ConfirmModal from '@/components/ConfirmModal';

export default function ComunicacaoPage() {
  const searchParams = useSearchParams();
  const channelParam = searchParams.get('channel');
  
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [activeChannel, setActiveChannel] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const userData = await getCurrentUser();
    setUser(userData);

    // Prioritize channel from URL, then role-based default
    let targetChannel = channelParam || '';
    
    // Enforcement: RH can't see Psicologia chat, etc.
    if (userData?.role === 'PSICOLOGA') {
      targetChannel = 'PSICOLOGIA_SECRETARIA';
    } else if (userData?.role === 'GESTOR_RH') {
      targetChannel = 'RH_SECRETARIA';
    } else if (userData?.role === 'SECRETARIA' || userData?.role === 'ADMIN') {
      if (!targetChannel) targetChannel = 'PSICOLOGIA_SECRETARIA';
    }
    
    setActiveChannel(targetChannel);
    
    if (targetChannel) {
      const msgs = await getChatMessages(targetChannel);
      setMessages(msgs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [channelParam]); // Re-fetch if channel parameter changes

  useEffect(() => {
    if (activeChannel) {
      const interval = setInterval(async () => {
        const msgs = await getChatMessages(activeChannel);
        setMessages(msgs);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeChannel]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const res = await sendChatMessage(activeChannel, newMessage);
    if (res.success) {
      setNewMessage('');
      const updatedMsgs = await getChatMessages(activeChannel);
      setMessages(updatedMsgs);
    }
    setIsSending(false);
  };

  const handleClearHistory = async () => {
    setIsDeleting(true);
    const res = await deleteMessages(activeChannel);
    if (res.success) {
      setMessages([]);
      setShowConfirmDelete(false);
    }
    setIsDeleting(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#006C48]" size={32} />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="space-y-1">
          <p className="text-[#006C48] font-black tracking-widest text-[10px] uppercase">Central de Comunicação</p>
          <h2 className="text-4xl font-headline font-black text-[#00190f] uppercase tracking-tighter italic">Chat Interno</h2>
        </div>
      </section>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar Info - Desktop Only */}
        <div className="hidden lg:flex w-64 flex-col gap-4">
          <div className="bg-white p-6 rounded-3xl border border-[#c1c8c2]/30 shadow-sm flex-1">
            <h4 className="text-[10px] font-black text-[#00190f] uppercase tracking-widest mb-4 flex items-center gap-2 text-opacity-40">
              <Lock size={12} /> Canal Seguro
            </h4>
            <div className="space-y-6">
              <div className="p-3 bg-[#f8faf9] rounded-2xl border border-[#c1c8c2]/10">
                <p className="text-[10px] font-bold text-[#006C48] uppercase mb-1">Status do Canal</p>
                <p className="text-xs font-medium text-[#414844]">Criptografia ponta-a-ponta ativa para este canal.</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-titles text-[#00190f]/30">Participantes</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#006C48] flex items-center justify-center text-white text-[10px] font-black">S</div>
                  <p className="text-[10px] font-bold uppercase truncate">Secretaria</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#cdf139] flex items-center justify-center text-[#171e00] text-[10px] font-black">
                    {activeChannel.includes('PSICOLOGIA') ? 'P' : 'R'}
                  </div>
                  <p className="text-[10px] font-bold uppercase truncate">
                    {activeChannel.includes('PSICOLOGIA') ? 'Psicóloga' : 'Gestor RH'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-3xl border border-[#c1c8c2]/30 shadow-xl overflow-hidden flex flex-col relative">
           {/* Channel Info Bar */}
           <div className="px-6 py-4 bg-[#f8faf9] border-b border-[#c1c8c2]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-[#c1c8c2]/10">
                  <Hash className="text-[#006C48]" size={16} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-[#00190f] tracking-tight">{activeChannel.replace('_', ' • ')}</p>
                  <p className="text-[10px] font-bold text-[#006C48] uppercase animate-pulse">Online agora</p>
                </div>
              </div>

              {(user?.role === 'ADMIN' || user?.role === 'SECRETARIA') && (
                <button 
                  onClick={() => setShowConfirmDelete(true)}
                  className="flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={14} /> Limpar Chat
                </button>
              )}
           </div>

           {/* Confirm Delete Modal */}
           <ConfirmModal 
             isOpen={showConfirmDelete}
             onClose={() => setShowConfirmDelete(false)}
             onConfirm={handleClearHistory}
             title="Zerar Histórico?"
             description="Esta ação apagará permanentemente todas as mensagens deste canal para todos os participantes."
             confirmText="Sim, Apagar Tudo"
             variant="danger"
           />

           {/* Messages Container */}
           <div 
             ref={scrollRef}
             className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth no-scrollbar select-none"
             style={{ backgroundImage: 'radial-gradient(#006c4805 1px, transparent 0)', backgroundSize: '24px 24px' }}
           >
             {messages.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-opacity-30 text-[#414844]">
                 <MessageSquare size={48} className="mb-4 opacity-10" />
                 <p className="text-[10px] font-black uppercase tracking-widest italic">Inicie uma conversa segura</p>
               </div>
             ) : (
               messages.map((msg) => {
                 const isMine = msg.senderId === user.id;
                 return (
                   <div 
                     key={msg.id} 
                     className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} w-full space-y-1 mb-2`}
                   >
                     <div className={`flex flex-col max-w-[70%] ${isMine ? 'items-end' : 'items-start'}`}>
                        {/* Sender Label - Only for others */}
                        {!isMine && (
                          <p className="text-[10px] font-black text-[#00190f]/40 uppercase mb-1 ml-2 tracking-tighter">
                            {msg.senderName}
                          </p>
                        )}
                        
                        <div 
                          className={`px-4 py-3 shadow-md transition-all hover:scale-[1.01] ${
                            isMine 
                              ? 'bg-[#006C48] text-white rounded-2xl rounded-tr-none' 
                              : 'bg-white text-[#00190f] rounded-2xl rounded-tl-none border border-[#c1c8c2]/30'
                          }`}
                        >
                           <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                           <div className={`mt-1 flex items-center justify-end gap-1 ${isMine ? 'text-white/60' : 'text-[#414844]/40'}`}>
                             <p className="text-[8px] font-bold" suppressHydrationWarning>
                               {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </p>
                           </div>
                        </div>
                     </div>
                   </div>
                 );
               })
             )}
           </div>

           {/* Input Area */}
           <div className="p-6 bg-[#f8faf9] border-t border-[#c1c8c2]/20">
             <form onSubmit={handleSendMessage} className="relative group">
               <input 
                 disabled={isSending}
                 autoFocus
                 className="w-full bg-white border border-[#c1c8c2]/40 rounded-2xl px-6 py-4 pr-24 text-sm font-medium focus:ring-2 focus:ring-[#006C48] focus:border-transparent transition-all shadow-sm"
                 placeholder="Digite sua mensagem técnica..."
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
               />
               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                 <button 
                   type="submit"
                   disabled={isSending || !newMessage.trim()}
                   className="p-3 bg-[#006C48] text-white rounded-xl hover:bg-[#00190f] transition-all disabled:opacity-30 shadow-lg shadow-[#006C48]/20 group-hover:scale-105 active:scale-95"
                 >
                   {isSending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                 </button>
               </div>
             </form>
           </div>
        </div>
      </div>
    </div>
  );
}
