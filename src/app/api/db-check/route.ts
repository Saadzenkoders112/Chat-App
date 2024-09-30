import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "../lib/db";

export async function GET(req: NextRequest){
    try {
        await initializeDatabase()
        return NextResponse.json({message: "Database connected successfully"})
    } catch(error) {
        return NextResponse.json({message: error})
    }
}