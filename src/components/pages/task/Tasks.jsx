import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { ifStatement } from '@babel/types';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function Tasks() {
  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 my-2'>
        <h1 className='font-semibold text-lg grid1-item'>Tasks</h1>
        <div className='grid1-item  text-start'>
          <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none " placeholder="Search here..." required />
          </div>
        </div>
        <div className='grid1-item text-end filter_pagination'>
          <select className="me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>

          </select>
          <Menu as="div" className="relative inline-block me-2 ">
            <div className=''>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                Filters
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Account settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Support
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        License
                      </Link>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>
      </div>

      <div className="flex justify-start gap-6">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "cursor-pointer  py-1 font-semibold pending" :
              isActive ? "cursor-pointer  py-1 font-semibold border-b-2 border-orange-600 text-black active text-md" :
                "cursor-pointer py-1 font-semibold text-md"
          }
          exact
          to="/tasks/completed">
          Completed
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "cursor-pointer  py-1 font-semibold pending" :
              isActive ? "cursor-pointer  py-1 font-semibold border-b-2 border-orange-600 text-black active text-md" :
                "cursor-pointer  py-1 font-semibold text-md"
          }
          activeClassName={'border-b-4 border-orange-600  text-black'}
          to="/tasks/upcomming">
          Upcoming
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "cursor-pointer px-5 py-1 font-semibold pending" :
              isActive ? "cursor-pointer px-5 py-1 font-semibold border-b-2 border-orange-600 text-black active text-md" :
                "cursor-pointer px-5 py-1 font-semibold text-md"
          }
          exact
          to="/tasks/overdue">
          Overdue
        </NavLink>
      </div>
      <Outlet />
    </div >
  );
}

export default Tasks;
