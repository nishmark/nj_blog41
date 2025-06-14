import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET - Get all users (for admin purposes)
export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        provider: true,
        createdAt: true,
        _count: {
          select: {
            blogs: true
          }
        }
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Create or update user
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.provider || !data.providerId) {
      return NextResponse.json({ 
        error: 'Email, provider, and providerId are required' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { 
        providerId: data.providerId 
      }
    });

    let user;
    
    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          email: data.email,
          name: data.name || existingUser.name,
          image: data.image || existingUser.image,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          image: data.image,
          provider: data.provider,
          providerId: data.providerId
        }
      });
    }
    
    return NextResponse.json(user, { status: existingUser ? 200 : 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
} 