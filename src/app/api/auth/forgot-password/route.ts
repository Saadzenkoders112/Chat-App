import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '../../lib/typeOrm.config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../../entities/user';
import { initializeDatabase } from '../../lib/db';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await initializeDatabase();
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist!' },
        { status: 404 },
      );
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.RESET_TOKEN_SECRET!,
      { expiresIn: '1hr' },
    );
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await AppDataSource.getRepository(User).save(user);

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password reset link',
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });
    return NextResponse.json({
      message: 'Password reset link sent to your gmail',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
