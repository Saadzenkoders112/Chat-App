import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../entities/user';
import { AppDataSource } from '../../lib/typeOrm.config';
import { getTokenData } from '@/utils/helpers.util';
import { initializeDatabase } from '../../lib/db';
import { Friend } from '../../entities/friend';
import { headers } from 'next/headers';

interface GetUserReq {
  friendId: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  try {
    await initializeDatabase();
    const headerList = headers();
    const token = headerList.get('Authorization')?.split(' ')[1];
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
    const userId = tokenData.id;

    const allUsers = await AppDataSource.getRepository(User).find();

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

    const searchTermList = searchTerm.split(' ');
    const regex = searchTermList.map(word => new RegExp(word, "i"));

    const searchedUsers = nonFriendUsers.filter(
      friend =>
        regex.some(regex => regex.test(friend.first_name)) || 
        regex.some(regex => regex.test(friend.last_name)),
    );

    console.log(searchedUsers)

    return NextResponse.json({ users: searchedUsers });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users!' });
  }
}
