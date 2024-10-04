import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../entities/user';
import { AppDataSource } from '../../lib/typeOrm.config';
import { getTokenData } from '@/utils/helpers.util';
import { Not } from 'typeorm';
import { Room } from '../../entities/room';
import { initializeDatabase } from '../../lib/db';
import { Friend } from '../../entities/friend';

interface GetUserReq {
  friendId: number;
}

export async function GET(req: any) {
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
    const userId = tokenData.id; // Get user ID from token data

    // Fetch all users
    const allUsers = await AppDataSource.getRepository(User).find();

    // Fetch all friends of the user
    const friends = await AppDataSource.getRepository(Friend).find({
      where: [{ userId: userId }, { friendId: userId }],
    });
    
    const friendIds = new Set<number>();
    friends.forEach(friend => {
      friendIds.add(friend.friendId);
      friendIds.add(friend.userId);
    });

    const nonFriendUsers = allUsers.filter(
      user => !friendIds.has(user.id) && user.id !== userId,
    );

    return NextResponse.json({ users: nonFriendUsers });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users!' });
  }
}
