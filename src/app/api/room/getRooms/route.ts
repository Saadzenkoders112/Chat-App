import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '../../lib/typeOrm.config';
import { Room } from '../../entities/room';
import { initializeDatabase } from '../../lib/db';
import { getTokenData } from '@/utils/helpers.util';

export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ message: 'Token must be provided' }, {status: 401});
    }
    const tokenData = await getTokenData(token || '');
    if (!tokenData) {
      return NextResponse.json({ message: 'Invalid token!' }, {status: 401});
    }
    const rooms = await AppDataSource.getRepository(Room).find();
    return NextResponse.json({ rooms: rooms });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
