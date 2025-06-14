"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter, useSearchParams } from 'next/navigation';

import {
  ArrowLongRightIcon ,
  ArrowLongLeftIcon,
  ClockIcon,
  CalendarIcon,
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  UserIcon,
} from '@heroicons/react/20/solid'

export default function Dropdown({ currentSortBy, currentSortOrder }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCurrentSortText = () => {
    if (currentSortBy === 'title' && currentSortOrder === 'asc') return 'A-Z';
    if (currentSortBy === 'title' && currentSortOrder === 'desc') return 'Z-A';
    if (currentSortBy === 'author' && currentSortOrder === 'asc') return 'Author A-Z';
    if (currentSortBy === 'author' && currentSortOrder === 'desc') return 'Author Z-A';
    if (currentSortBy === 'createdAt' && currentSortOrder === 'desc') return 'Newest';
    if (currentSortBy === 'createdAt' && currentSortOrder === 'asc') return 'Oldest';
    return 'Newest';
  };

  const handleSort = (sortBy, sortOrder) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    router.push(`/?${params.toString()}`);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          {getCurrentSortText()}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('title', 'asc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <ArrowLongRightIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
              />
              Title A-Z
            </button>
          </MenuItem>
 
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('title', 'desc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <ArrowLongLeftIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500" />
              Title Z-A
            </button>
          </MenuItem>

        </div>
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('author', 'asc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <UserIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500" />
              Author A-Z
            </button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('author', 'desc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <UserIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500" />
              Author Z-A
            </button>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('createdAt', 'desc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <ClockIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500" />
              Newest First
            </button>
          </MenuItem>
          
        </div>
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={() => handleSort('createdAt', 'asc')}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <CalendarIcon aria-hidden="true" className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500" />
              Oldest First
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
