"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserBlogs() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserBlogs();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const fetchUserBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/${session.user.email}/blogs`);
      if (response.ok) {
        const blogs = await response.json();
        setUserBlogs(blogs);
      } else {
        console.error('Failed to fetch user blogs');
      }
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewBlog = (blogId) => {
    router.push(`/blog/${blogId}`);
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to view your blogs</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
        <button
          onClick={() => router.push("/write")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Write New Blog
        </button>
      </div>

      {userBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">You haven't written any blogs yet.</p>
          <button
            onClick={() => router.push("/write")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Write Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewBlog(blog.id)}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.body}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>{blog.userName || blog.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 