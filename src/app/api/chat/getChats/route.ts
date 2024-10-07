import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../lib/db';
import { AppDataSource } from '../../lib/typeOrm.config';
import { Chat } from '../../entities/chat';
import { getTokenData } from '@/utils/helpers.util';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = parseInt(searchParams.get('roomId') || '0');
  try {
    await initializeDatabase();
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Token must be provided' },
        { status: 401 },
      );
    }
    const tokenData = await getTokenData(token || '');
    if (!tokenData) {
      return NextResponse.json({ message: 'Invalid token!' }, { status: 401 });
    }
    const messages = await AppDataSource.getRepository(Chat).findBy({ roomId });
    return NextResponse.json({ messages: messages });
  } catch (error) {
    return NextResponse.json({ message: 'No messages yet...' });
  }
}
