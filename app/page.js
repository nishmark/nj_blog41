"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import PostPreview from "./components/PostPreview";
import Dropdown from "./components/Dropdown";

export default function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchBlogs = useCallback(async (sortByParam = sortBy, sortOrderParam = sortOrder) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?sortBy=${sortByParam}&sortOrder=${sortOrderParam}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setAllBlogs(data);
      } else {
        setAllBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setAllBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    fetchBlogs(newSortBy, newSortOrder);
  };

  return (
    <div>
      <div className="flex justify-end mt-4 mr-20">
        <Dropdown onSortChange={handleSortChange} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading blogs...</div>
        </div>
      ) : (
        <PostPreview blogs={allBlogs} />
      )}
    </div>
  );
}
