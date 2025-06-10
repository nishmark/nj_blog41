"use client";
import { HeartIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostPreview({ blogs }) {
  const router = useRouter();
  //impliment the handleReadMore function
  async function handleReadMore(e, id) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Blog not found");
      const blog = await res.json();
     
      router.push(`/blog/${id}`);
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <div className="px-[100px]">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {blogs &&
          blogs.map((blog) => (
            <li
              key={blog.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  alt=""
                  src={blog.image}
                  className="mx-auto size-32 shrink-0 rounded-full"
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {blog.title}
                </h3>
                <dl className="mt-1 flex grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                      {blog.author}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href="#"
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <HeartIcon
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      LIKE
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`/blog/${blog.id}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      onClick={(e) => handleReadMore(e, blog.id)}
                    >
                      <BookOpenIcon
                        aria-hidden="true"
                        className="size-5 text-gray-400"
                      />
                      READ MORE
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
