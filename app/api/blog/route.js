import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'createdAt'; //sort by createdAt by default
    const sortOrder = searchParams.get('sortOrder') || 'desc'; //sort in descending order by default
    
    // Validate sort parameters
    const validSortFields = ['title', 'author', 'date', 'createdAt']; //valid sort fields
    const validSortOrders = ['asc', 'desc']; //valid sort orders
    
    if (!validSortFields.includes(sortBy)) { //if the sort field is not valid
      return NextResponse.json({ error: 'Invalid sort field' }, { status: 400 }); //return an error
    }
    
    if (!validSortOrders.includes(sortOrder)) { //if the sort order is not valid
      return NextResponse.json({ error: 'Invalid sort order' }, { status: 400 }); //return an error
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) { //if the DATABASE_URL is not configured
      console.error('DATABASE_URL is not configured'); //log an error
      return NextResponse.json({  //return an error
        error: 'Database not configured. Please set DATABASE_URL environment variable.'  
      }, { status: 500 }); 
    }

    const allBlogs = await prisma.blog.findMany({ //find all the blogs
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    
    return NextResponse.json(allBlogs); //return the blogs
  } catch (error) {
    console.error('Prisma Error:', error); //log an error
    return NextResponse.json({ 
      error: error.message,
      details: 'Database connection failed. Please check your DATABASE_URL configuration.'
    }, { status: 500 });
  }
}

export async function POST(request) { //post request to the server
  try {
    const data = await request.json(); //get the data from the request
    
    // Input validation
    if (!data.title || !data.title.trim()) { //if the title is not valid
      return NextResponse.json({ error: 'Title is required' }, { status: 400 }); //return an error
    }
    
    if (!data.body || !data.body.trim()) { //if the body is not valid
      return NextResponse.json({ error: 'Body is required' }, { status: 400 }); //return an error
    }
    
    if (!data.author || !data.author.trim()) { //if the author is not valid
      return NextResponse.json({ error: 'Author is required' }, { status: 400 }); //return an error
    }
    
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) { //if the DATABASE_URL is not configured
      console.error('DATABASE_URL is not configured'); //log an error
      return NextResponse.json({  //return an error
        error: 'Database not configured. Please set DATABASE_URL environment variable.' 
      }, { status: 500 });
    }

    const newPost = await prisma.blog.create({ //create a new blog
      data: {
        title: data.title.trim(),
        body: data.body.trim(),
        author: data.author.trim(),
        date: new Date(data.date),
        image: data.image,
        username: data.username || data.author.trim(),
      },
    });
    return NextResponse.json(newPost, { status: 201 }); //return the new blog
  } catch (error) {
    console.error('Prisma POST Error:', error); //log an error
    return NextResponse.json({ 
      error: error.message,
      details: 'Database connection failed. Please check your DATABASE_URL configuration.'
    }, { status: 500 }); //return an error      
  }
}

