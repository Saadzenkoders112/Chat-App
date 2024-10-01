import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '../../lib/db';
import { AppDataSource } from '../../lib/typeOrm.config';
import { User } from '../../entities/user';
import bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  const { resetToken, newPassword } = await req.json();
  await initializeDatabase();
  try {
    const user = AppDataSource.getRepository(User).findOneBy({ resetToken });
    if (!user) {
      return NextResponse.json({ message: 'Token is expired' });
    }
    const userRepository = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.update({ resetToken }, { password: hashedPassword });
    return NextResponse.json({ message: 'Password updated!' });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
