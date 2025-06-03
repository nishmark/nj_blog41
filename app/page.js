"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import PostPreview from "./components/PostPreview";
import blogsJson from "../blogdata/blogs.json"; // adjust path if needed

export default function Home() {
  const [allBlogs, setAllBlogs] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("allBlogs") || "[]");
    if (stored.length > 0) {
      setAllBlogs(stored);
    }
  }, []);

  return (
    <div>
      <PostPreview
        blogs={allBlogs && allBlogs.length > 0 ? allBlogs : blogsJson}
      />
    </div>
  );
}
