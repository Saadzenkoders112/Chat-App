import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "../../lib/db";
import { AppDataSource } from "../../lib/typeOrm.config";
import { User } from "../../entities/user";

export async function PUT(req: NextRequest) {
    const {resetToken} =await req.json()
    await initializeDatabase()
    try {
        const user = AppDataSource.getRepository(User).findOneBy({resetToken})
        
    } catch(error) {
        return NextResponse.json({message: error})
    }
}