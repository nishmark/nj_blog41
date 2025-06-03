"use client";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
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
        <a href="/write">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white/20"
            onClick={() => router.push("/write")}
          >
            WRITE A BLOG
          </button>
        </a>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
