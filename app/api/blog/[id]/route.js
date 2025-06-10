import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, context) {
  const params = await context.params;
  const { id } = params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  const params = await context.params;
  const { id } = params;
  try {
    const deletedBlog = await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma error code for record not found
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
