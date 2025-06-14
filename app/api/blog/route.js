import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const blogs = await prisma.blog.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.title?.trim() || !data.body?.trim() || !data.authorId?.trim()) {
      return NextResponse.json({ error: 'Title, body, and authorId are required' }, { status: 400 });
    }

    // First, find or create the user using the authorId (which is the email)
    let user = await prisma.user.findUnique({
      where: { email: data.authorId }
    });

    if (!user) {
      // Create a new user if they don't exist
      user = await prisma.user.create({
        data: {
          email: data.authorId,
          name: data.author || data.authorId,
          provider: 'google', // Default provider
          providerId: data.authorId, // Use email as provider ID for now
        }
      });
    }

    const newPost = await prisma.blog.create({
      data: {
        title: data.title.trim(),
        body: data.body.trim(),
        authorId: user.id, // Use the actual user ID from database
        date: new Date(data.date),
        image: data.image,
        username: data.username || data.author || user.name,
        userId: user.id,
        userEmail: data.userEmail || data.authorId,
      },
    });
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

