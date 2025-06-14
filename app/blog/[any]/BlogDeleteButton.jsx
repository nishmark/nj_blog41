"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogDeleteButton({ blogId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog/${blogId}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete blog");
      }

      setDeleted(true);
      alert("Blog deleted successfully!");
      
      // Redirect to home page after deletion
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert(error.message || "An error occurred while deleting the blog.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (deleted) {
    return (
      <div className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Blog deleted successfully!
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={isDeleting}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleDelete}
    >
      {isDeleting ? 'Deleting...' : 'DELETE'}
    </button>
  );
} 