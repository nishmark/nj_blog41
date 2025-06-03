"use client";
import { useEffect, useState } from "react";

export default function BlogPage({ params }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("allBlogs");
    if (savedBlogs) {
      console.log("All saved blogs:", JSON.parse(savedBlogs));
    }
    onload();
  }, []);

  useEffect(() => {
    console.log("Blog ID from params:", params.any);
  }, [params]);

  function onload() {
    const savedBlogs = localStorage.getItem("allBlogs");
    if (savedBlogs) {
      const allBlogs = JSON.parse(savedBlogs);
      const foundBlog = allBlogs.find((blog) => blog.id === params.any);
      if (foundBlog) {
        setBlog(foundBlog);
      }
    }
    setLoading(false);
  }

  function handleDelete() {
    // Remove from allBlogs
    const savedBlogs = localStorage.getItem("allBlogs");
    if (savedBlogs) {
      const allBlogs = JSON.parse(savedBlogs);
      const updatedBlogs = allBlogs.filter((blog) => blog.id !== params.any);
      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));
    }

    // Remove from userSavedBlogs
    const userBlogs = localStorage.getItem("userSavedBlogs");
    if (userBlogs) {
      const userSaved = JSON.parse(userBlogs);
      const updatedUserBlogs = userSaved.filter(
        (blog) => blog.id !== params.any
      );
      localStorage.setItem("userSavedBlogs", JSON.stringify(updatedUserBlogs));
    }

    setDeleted(true);
    setBlog(null);
  }

  return (
    <div className="bg-gray-900 max-w-2xl mx-auto p-4 shadow-lg flex flex-col items-center">
      {blog && !deleted ? (
        <>
          <img
            src={blog?.imageUrl || blog?.image || "/placeholder-image.jpg"}
            alt={blog?.title || "Blog Title"}
            className="w-[200px] h-[200px] rounded-lg mx-auto mb-4"
          />
          <h4 className="text-white text-2xl font-bold mb-2">
            {blog?.title || "Blog Title"}
          </h4>
          <p className="text-gray-300 mb-2 italic">
            {blog?.body || "Blog body goes here..."}
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
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </>
      ) : null}
      {deleted && (
        <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Blog deleted successfully!
        </div>
      )}
    </div>
  );
}
