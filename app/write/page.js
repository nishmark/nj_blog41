"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Image from "next/image";

/*

model blog {
  id String @id @default(uuid())
  title String
  body String
  author String
  date DateTime    // Use DateTime for dates
  image String     // This will store the URL or path to the image
  username String
  createdAt DateTime @default(now())
  
*/

export default function Page() {
  const [blogtitle, setBlogtitle] = useState("");
  const [blogbody, setBlogbody] = useState("");
  const [blogauthor, setBlogauthor] = useState("");
  const [blogimageurl, setBlogimageurl] = useState("");
  const [blogusername, setBlogusername] = useState("");
  const [success, setSuccess] = useState(false);

  const [blog, setBlog] = useState({
    title: "",
    body: "",
    author: "",
    date: "",
    image:
      "https://st.depositphotos.com/17338290/61611/i/450/depositphotos_616117134-stock-photo-how-start-blog-blogging-beginners.jpg",
    username: "",
  });

  const [previewImageSrc, setPreviewImageSrc] = useState("https://www.godaddy.com/resources/wp-content/uploads/2023/08/learn-to-blog-featured.jpeg?size=3840x0");

  function clickedOnCoverPhoto() {
    const imageUrlElement = document.getElementById("imageUrl");
    if (imageUrlElement) {
      imageUrlElement.style.display = "block";
    }
    const submitBtnElement = document.getElementById("submitImageBtn");
    if (submitBtnElement) {
      submitBtnElement.style.display = "block";
    }
  }

  function clickedOnSubmitImage() {
    const imageUrl = document.getElementById("imageUrl").value;
    if (imageUrl) {
      setBlogimageurl(imageUrl);
      setPreviewImageSrc(imageUrl);
      document.getElementById("imageUrl").style.display = "none";
      document.getElementById("submitImageBtn").style.display = "none";
    }
  }

  function handleBlogTitleChange(e) {
    setBlogtitle(e.target.value);
  }

  function handleBlogBodyChange(e) {
    setBlogbody(e.target.value);
  }

  function handleBlogAuthorChange(e) {
    setBlogauthor(e.target.value);
  }

  function handleSaveBlog(e) {
    e.preventDefault();
    
    // Basic validation
    if (!blogtitle.trim()) {
      alert("Please enter a blog title");
      return;
    }
    
    if (!blogbody.trim()) {
      alert("Please enter blog content");
      return;
    }
    
    if (!blogauthor.trim()) {
      alert("Please enter author name");
      return;
    }
    
    // Set a default image if none is provided
    const imageToUse =
      blogimageurl ||
      "https://st.depositphotos.com/17338290/61611/i/450/depositphotos_616117134-stock-photo-how-start-blog-blogging-beginners.jpg";
    setBlog({
      title: blogtitle,
      body: blogbody,
      author: blogauthor,
      date: new Date().toISOString(),
      image: imageToUse,
      username: blogauthor,
    });
  }

  useEffect(() => {
    console.log(blog);

    if (
      blog.title &&
      blog.body &&
      blog.author &&
      blog.date &&
      blog.image &&
      blog.username
    ) {
      const uploadBlog = async () => {
        try {
          const response = await fetch("/api/blog", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blog),
          });

          if (!response.ok) {
            throw new Error("Failed to upload blog");
          }

          const data = await response.json();
          console.log("Blog uploaded successfully:", data);
          setSuccess(true);
          
          // Clear all form fields after successful submission
          setBlogtitle("");
          setBlogbody("");
          setBlogauthor("");
          setBlogimageurl("");
          setBlogusername("");
          
          // Reset the blog state to empty
          setBlog({
            title: "",
            body: "",
            author: "",
            date: "",
            image: "https://st.depositphotos.com/17338290/61611/i/450/depositphotos_616117134-stock-photo-how-start-blog-blogging-beginners.jpg",
            username: "",
          });
          
          // Reset the preview image to default
          setPreviewImageSrc("https://www.godaddy.com/resources/wp-content/uploads/2023/08/learn-to-blog-featured.jpeg?size=3840x0");
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
          
        } catch (error) {
          console.error("Error uploading blog:", error);
          // Handle error - show error message to user
        }
      };

      uploadBlog();
    }
  }, [blog]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center divide-y divide-gray-900/10">
      {success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="font-medium">Blog submitted successfully!</span>
          </div>
        </div>
      )}
      <div className="grid  gap-x-8 gap-y-8 py-10  bg-white w-2xl">
        <form className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  PUT AWESOME COVER PHOTO
                </label>

                {/* cover photo box */}
                <div className="flex flex-col items-center">
                  <Image
                    src={previewImageSrc}
                    alt="Blog cover"
                    width={300}
                    height={300}
                    className="max-h-[300px] object-cover rounded-lg cursor-pointer"
                    onClick={clickedOnCoverPhoto}
                  />
                  <input
                    type="text"
                    id="imageUrl"
                    placeholder="Enter image URL"
                    className="mt-4 px-4 py-2 border rounded-md w-full hidden"
                  />
                  <button
                    type="button"
                    id="submitImageBtn"
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hidden"
                    onClick={clickedOnSubmitImage}
                  >
                    Update Image
                  </button>
                </div>
              </div>

              <div className="sm:col-span-full">
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
                      value={blogtitle}
                      onChange={handleBlogTitleChange}
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
                    value={blogbody}
                    onChange={handleBlogBodyChange}
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
                      value={blogauthor}
                      onChange={handleBlogAuthorChange}
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
              onClick={handleSaveBlog}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-center">No saved blogs</h1>
        </div>
      </div>
    </div>
  );
}
