"use client";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className=" bg-gray-900 m md:flex md:items-center md:justify-between p-6">
      <div className="min-w-0 flex-1">
        <a href="/">
          <h2 className="text-2xl/7 ml-25 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
            D-BOW BLOGS
          </h2>
        </a>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4 mr-30">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white/20"
          onClick={() => router.push("/write")}
        >
          WRITE A BLOG
        </button>
        
        {/* Show user info if logged in, otherwise show LOGIN button */}
        {session ? (
          <div className="ml-3 flex items-center space-x-4">
            {/* My Blogs Button */}
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400"
              onClick={() => router.push("/my-blogs")}
            >
              MY BLOGS
            </button>
            
            {/* User Avatar */}
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            )}
            
            {/* User Info */}
            <div className="text-white">
              <div className="text-sm font-medium">
                {session.user?.name || session.user?.email}
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => router.push("/login")}
          >
            LOGIN
          </button>
        )}
      </div>
    </div>
  );
}
