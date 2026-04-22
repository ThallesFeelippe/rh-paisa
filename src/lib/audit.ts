import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';
import { headers } from 'next/headers';

export async function logAudit(action: string, targetId?: string, details?: string) {
  try {
    const session = getSession();
    if (!session) return;

    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action,
        targetId,
        details,
        ipAddress: ip,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}
