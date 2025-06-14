"use client"

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function WritePageClient() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    author: '',
    image: ''
  });
  const [showImageInput, setShowImageInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Default image for preview
  const previewImageSrc = formData.image || "https://st.depositphotos.com/17338290/61611/i/450/depositphotos_616117134-stock-photo-how-start-blog-blogging-beginners.jpg";

  // Save blog data to server
  const saveBlog = async (blogData) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData)
      });
      
      if (response.ok) {
        const savedBlog = await response.json();
        console.log('Blog saved successfully:', savedBlog);
        return { success: true, data: savedBlog };
      } else {
        const error = await response.json();
        console.error('Error saving blog:', error);
        return { success: false, error: error.error || 'Failed to save blog' };
      }
    } catch (error) {
      console.error('Network error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!session) {
      alert("Please log in to create a blog post");
      router.push("/login");
      return;
    }
    
    // Check if session has required user data
    if (!session.user?.email) {
      alert("User session is incomplete. Please log in again.");
      router.push("/login");
      return;
    }
    
    // Basic validation
    if (!formData.title?.trim()) {
      alert("Please enter a blog title")
      return
    }
    
    if (!formData.body?.trim()) {
      alert("Please enter blog content")
      return
    }
    
    setIsLoading(true);
    
    // Prepare blog data with user details
    const blogData = {
      title: formData.title.trim(),
      body: formData.body.trim(),
      image: formData.image || previewImageSrc,
      date: new Date().toISOString(),
      authorId: session.user.email, // This is correct - API will use this to find/create user
      author: session.user.name || session.user.email, // Send name or email as author
      username: session.user.name || session.user.email, // Use logged-in user's name
      userEmail: session.user.email, // This is what the API needs to find/create user
    };
    
    console.log('Session user:', session.user); // Debug: see what's in session
    console.log('Blog data being sent:', blogData); // Debug: see what we're sending
    
    try {
      const result = await saveBlog(blogData);
      
      if (result.success) {
        alert('Blog saved successfully!');
        
        // Clear the form
        setFormData({
          title: '',
          body: '',
          author: '',
          image: ''
        });
        
      
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Image handling functions
  const clickedOnCoverPhoto = () => {
    setShowImageInput(!showImageInput);
  };

  const clickedOnSubmitImage = () => {
    const imageUrlInput = document.getElementById('imageUrl');
    if (imageUrlInput && imageUrlInput.value.trim()) {
      const newImageUrl = imageUrlInput.value.trim();
      setFormData(prev => ({
        ...prev,
        image: newImageUrl
      }));
      setShowImageInput(false);
      imageUrlInput.value = '';
      console.log('Image updated to:', newImageUrl);
    } else {
      alert('Please enter a valid image URL');
    }
  };

  // Individual field handlers (for backward compatibility)
  const handleBlogTitleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleBlogBodyChange = (e) => {
    setFormData(prev => ({
      ...prev,
      body: e.target.value
    }));
  };

  const handleBlogAuthorChange = (e) => {
    setFormData(prev => ({
      ...prev,
      author: e.target.value
    }));
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center divide-y divide-gray-900/10">
      <div className="grid gap-x-8 gap-y-8 py-10 bg-white w-full max-w-2xl">
        <form className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit}>
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
                    key={previewImageSrc}
                    src={previewImageSrc}
                    alt="Blog cover"
                    width={300}
                    height={300}
                    unoptimized
                    className="max-h-[300px] object-cover rounded-lg cursor-pointer"
                    onClick={clickedOnCoverPhoto}
                  />
                  <input
                    type="text"
                    id="imageUrl"
                    placeholder="Enter image URL"
                    className={`mt-4 px-4 py-2 border rounded-md w-full ${showImageInput ? 'block' : 'hidden'}`}
                  />
                  <button
                    type="button"
                    id="submitImageBtn"
                    className={`mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md ${showImageInput ? 'block' : 'hidden'}`}
                    onClick={clickedOnSubmitImage}
                  >
                    Update Image
                  </button>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  BLOG TITLE
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="blogtitleid"
                      name="title"
                      type="text"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter blog title"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="body"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Write your blog here
                </label>
                <div className="mt-2">
                  <textarea
                    id="blogbodyid"
                    name="body"
                    rows={6}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={formData.body}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="author"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  AUTHOR NAME : {session.user.name?.toUpperCase()} 
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
              onClick={() => {
                setFormData({
                  title: '',
                  body: '',
                  author: '',
                  image: ''
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}