"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PostPreview from "../components/PostPreview";
import { useState, useEffect } from "react";
import blogsData from "../../blogdata/blogs.json";

export default function Page() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [blogImage, setBlogImage] = useState("/images/dog1.jpeg");
  const [blogDate, setBlogDate] = useState();

  const [userSavedBlogs, setUserSavedBlogs] = useState([]);
  const [allBlogs, setallBlogs] = useState([]);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userSavedBlogs");
    if (saved) {
      setUserSavedBlogs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const combined = [...userSavedBlogs, ...blogsData];
    setallBlogs(combined);
    localStorage.setItem("allBlogs", JSON.stringify(combined));
  }, [userSavedBlogs]);

  useEffect(() => {
    const handleFocus = () => {
      const saved = localStorage.getItem("userSavedBlogs");
      setUserSavedBlogs(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogTitle, blogBody, authorName, blogImage, blogDate);
    const newBlog = {
      id: `blogtitle_${userSavedBlogs.length + 1}`,
      title: blogTitle,
      blogbody: blogBody,
      author: authorName,
      image: blogImage,
      date: new Date().toISOString(),
    };
    const updatedBlogs = [...userSavedBlogs, newBlog];
    setUserSavedBlogs(updatedBlogs);
    localStorage.setItem("userSavedBlogs", JSON.stringify(updatedBlogs));

    // Clear input fields after submission
    setBlogTitle("");
    setBlogBody("");
    setAuthorName("");
    setBlogImage("/images/dog1.jpeg");
    setBlogDate(new Date().toISOString());
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center divide-y divide-gray-900/10">
      <div className="grid  gap-x-8 gap-y-8 py-10  bg-white w-2xl">
        <form className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  BLOG TITLE
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="blogtitleid"
                      name="blogtitlename"
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Write your blog here
                </label>
                <div className="mt-2">
                  <textarea
                    id="blogbodyid"
                    name="blogbodyname"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={blogBody}
                    onChange={(e) => setBlogBody(e.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Author Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="authname"
                      name="authnamename"
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div>
        {allBlogs.length > 0 ? (
          <div className="w-full py-10">
            <h2 className="text-2xl font-bold text-center mb-8">
              Your Saved Blogs
            </h2>
            <PostPreview blogs={allBlogs} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center">No saved blogs</h1>
          </div>
        )}
      </div>
    </div>
  );
}
