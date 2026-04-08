import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'sustainability_report_url' }
    });

    return NextResponse.json({ 
      reportUrl: setting?.value || '' 
    });
  } catch (error) {
    return NextResponse.json({ reportUrl: '' }, { status: 500 });
  }
}
