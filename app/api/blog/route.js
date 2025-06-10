import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Validate sort parameters
    const validSortFields = ['title', 'author', 'date', 'createdAt'];
    const validSortOrders = ['asc', 'desc'];
    
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json({ error: 'Invalid sort field' }, { status: 400 });
    }
    
    if (!validSortOrders.includes(sortOrder)) {
      return NextResponse.json({ error: 'Invalid sort order' }, { status: 400 });
    }

    const allBlogs = await prisma.blog.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    
    return NextResponse.json(allBlogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newPost = await prisma.blog.create({
      data: {
        title: data.title,
        body: data.body,
        author: data.author,
        date: new Date(data.date),
        image: data.image,
        username: data.username,
      },
    });
    return Response.json(newPost, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

