import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request, context) { //get request to the server
  const params = await context.params; //get the params from the context
  const { id } = params; //get the id from the params
  try {
    const blog = await prisma.blog.findUnique({ //find the blog by id
      where: { id }, //where the id is the id of the blog
    });
    if (!blog) { //if the blog is not found
      return NextResponse.json({ error: "Blog not found" }, { status: 404 }); //return an error
    }
    return NextResponse.json(blog); //return the blog
  } catch (error) { //catch an error
    return NextResponse.json({ error: error.message }, { status: 500 }); //return an error
  }
}

export async function DELETE(request, context) { //delete request to the server
  const params = await context.params; //get the params from the context
  const { id } = params; //get the id from the params
  try {
    const deletedBlog = await prisma.blog.delete({ //delete the blog by id 
      where: { id }, //where the id is the id of the blog
    });
    return NextResponse.json({ message: "Blog deleted successfully", blog: deletedBlog }); //return the deleted blog
  } catch (error) {
        if (error.code === 'P2025') { //
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
