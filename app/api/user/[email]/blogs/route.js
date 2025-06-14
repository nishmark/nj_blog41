import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, context) {
  try {
    const params = await context.params;
    const { email } = params;
    
    const userBlogs = await prisma.blog.findMany({
      where: { userEmail: email },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(userBlogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 