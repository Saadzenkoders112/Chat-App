import { NextResponse, NextRequest } from 'next/server';
import { initializeDatabase } from '../../lib/db';
import bcrypt from 'bcrypt';
import { User } from '../../entities/user';
import { AppDataSource } from '../../lib/typeOrm.config';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();
  await initializeDatabase();
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    console.log(user)
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User();
      (newUser.first_name = firstName),
        (newUser.last_name = lastName),
        (newUser.email = email),
        (newUser.password = hashedPassword);

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.save(newUser);
      return NextResponse.json({ message: 'User created!' });
    } else {
      return NextResponse.json({ message: 'Email already exists!' });
    }
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
