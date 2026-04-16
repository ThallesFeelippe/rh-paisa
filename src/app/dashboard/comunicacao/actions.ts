'use server';

import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '../perfil/actions';

export async function getChatMessages(channel: string) {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { channel },
      orderBy: { createdAt: 'asc' },
      take: 100, // Limit to last 100 messages
    });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function sendChatMessage(channel: string, content: string) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Não autorizado' };

  try {
    const message = await prisma.chatMessage.create({
      data: {
        content,
        channel,
        senderId: user.id || 'system',
        senderName: user.name || 'Usuário',
      },
    });
    revalidatePath('/dashboard/comunicacao');
    return { success: true, data: message };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'Erro ao enviar mensagem' };
  }
}

export async function deleteMessages(channel: string) {
  const user = await getCurrentUser();
  if (user?.role !== 'ADMIN' && user?.role !== 'SECRETARIA') {
    return { success: false, error: 'Sem permissão para zerar o banco' };
  }

  try {
    await prisma.chatMessage.deleteMany({
      where: { channel }
    });
    revalidatePath('/dashboard/comunicacao');
    return { success: true };
  } catch (error) {
    console.error('Error deleting messages:', error);
    return { success: false, error: 'Erro ao limpar mensagens' };
  }
}
