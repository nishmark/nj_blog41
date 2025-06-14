import React from "react";
import Image from "next/image";
import BlogDeleteButton from "./BlogDeleteButton";

// Server component - fetches data on server
async function getBlog(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${id}`, {
      cache: 'no-store' // Don't cache for real-time data
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function BlogPage({ params }) {
  const { any } = await params;
  const blog = await getBlog(any);

  if (!blog) {
    return (
      <div className="bg-gray-900 max-w-2xl mx-auto p-4 shadow-lg flex flex-col items-center">
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          Blog not found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 max-w-2xl mx-auto p-4 shadow-lg flex flex-col items-center">
      <Image
        src={blog?.imageUrl || blog?.image || "/placeholder-image.jpg"}
        alt={blog?.title || "Blog Title"}
        width={200}
        height={200}
        className="w-[200px] h-[200px] rounded-lg mx-auto mb-4"
      />
      <h4 className="text-white text-2xl font-bold mb-2">
        {blog?.title || "Blog Title"}
      </h4>
      <p className="text-gray-300 mb-2 italic">
        {blog?.body || blog?.blogbody || "Blog body goes here..."}
      </p>
      <p className="text-gray-400 mb-1">
        By{" "}
        <span className="font-semibold text-green-300">
          {blog?.author || "Author"}
        </span>{" "}
        on <span className="text-gray-500">{blog?.date || "Date"}</span>
      </p>
      <div className="text-white mt-4 text-lg leading-relaxed">
        {/* Blog content goes here */}
      </div>
      
      {/* Client component for delete functionality */}
      <BlogDeleteButton blogId={any} />
    </div>
  );
}
