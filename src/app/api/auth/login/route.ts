import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "../../lib/db";
import { AppDataSource } from "../../lib/typeOrm.config";
import { User } from "../../entities/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    await initializeDatabase()
    const {email, password} = await req.json()
    try {
        const user = await AppDataSource.getRepository(User).findOneBy({email})
        if (!user) {
            return NextResponse.json({message: "Invalid email!"}, {status: 404})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({message: "Invalid password!"}, {status: 401})
        }
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '1hr'}
        )

        return NextResponse.json({message: "Logged in!", token, user})
    } catch(error){
        return NextResponse.json({message: error})
    }
}