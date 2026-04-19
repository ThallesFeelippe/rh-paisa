import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const logPath = path.join(process.cwd(), 'persistence_log.txt');
  try {
    if (!fs.existsSync(logPath)) {
      return NextResponse.json({ message: 'Log file not found at ' + logPath });
    }
    const content = fs.readFileSync(logPath, 'utf-8');
    return NextResponse.json({ content: content.split('\n') });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
