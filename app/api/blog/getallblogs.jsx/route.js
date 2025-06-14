import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get('sort');
  
  let blogs;
  
  switch (sortBy) {
    case 'title-asc':
      // Get blogs sorted by title A to Z
      blogs = await prisma.blog.findMany({
        orderBy: {
          title: 'asc'
        }
      });
      break;
      
    case 'title-desc':
      // Get blogs sorted by title Z to A
      blogs = await prisma.blog.findMany({
        orderBy: {
          title: 'desc'
        }
      });
      break;
      
    case 'author-asc':
      // Get blogs sorted by author A to Z
      blogs = await prisma.blog.findMany({
        orderBy: {
          author: 'asc'
        }
      });
      break;
      
    case 'author-desc':
      // Get blogs sorted by author Z to A
      blogs = await prisma.blog.findMany({
        orderBy: {
          author: 'desc'
        }
      });
      break;
      
    case 'newest':
      // Get blogs sorted by newest first (assuming there's a createdAt or date field)
      blogs = await prisma.blog.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
      break;
      
    case 'oldest':
      // Get blogs sorted by oldest first
      blogs = await prisma.blog.findMany({
        orderBy: {
          createdAt: 'asc'
        }
      });
      break;
      
    default:
      // Default behavior - get all blogs without sorting
      blogs = await prisma.blog.findMany();
      break;
  }
  
  return NextResponse.json(blogs);
}