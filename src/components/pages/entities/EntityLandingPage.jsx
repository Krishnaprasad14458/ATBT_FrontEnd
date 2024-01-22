
import React, { useState, Fragment, useRef, useEffect } from 'react';
import './EntityLandingPage.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Dialog, Transition, Menu } from '@headlessui/react'
import defprop from '../../../Images/defprof.svg';
import { Link, Outlet } from 'react-router-dom'

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useInitializePerPage from '../../../hooks/initializePerPage/useInitializePerPage';
import useDebounce from '../../../hooks/debounce/useDebounce';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const EntityLandingPage = () => {
    // todo toggle
    // const [todo, setTodo] = useState(false);
    // const [doing, setdoing] = useState(false);
    // const [done, setdone] = useState(false);
    // const handletodo = (e) => {
    //     setTodo(!todo);
    // }
    // const handledoing = (e) => {
    //     setdoing(!doing);
    // }
    // const handledone = (e) => {
    //     setdone(!done);
    // }

    // For tabs active
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // for calendar
    const localizer = momentLocalizer(moment);
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            start: new Date(2024, 0, 17, 10, 0),
            end: new Date(2024, 0, 17, 12, 0),
        },

    ]);
    useEffect(() => {
        console.log("events", events)
    }, [events])
    const [newtask, setNewTask] = useState("")
    const [newtaskStartDate, setnewtaskStartDate] = useState("")

    const [newtaskEndDate, setnewtaskEndDate] = useState("")


    const handleSelect = ({ start, end }) => {
        setOpen(true);
        setnewtaskStartDate(start);
        setnewtaskEndDate(end);
        setNewTask("");
    };

    const handleSave = () => {
        setOpen(false);

        if (newtask) {
            const newEvent = {
                title: newtask,
                start: newtaskStartDate,
                end: newtaskEndDate,
            };
            setEvents([...events, newEvent]);
            setNewTask("");
        }
    };
    // ----
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container p-2 bg-[#f8fafc]">
            {/* <h1 className='font-semibold text-lg grid1-item'>Entity Landing Page</h1> */}
            {/* entity name and entity logo */}
            <div className='flex gap-3'>
                <img className="w-8 h-8 rounded-full mx-2 mt-2" src={defprop} alt="Neil image" />
                <h4 className='my-3'>Infoz IT</h4>
            </div>
            <div className=''>
                <div className='flex'>
                    <div
                        className={`cursor-pointer px-1 py-1 text-md font-semibold  ${activeTab === 1 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(1)}>Overview
                    </div>

                    <div
                        className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(2)}>

                        List
                    </div>
                    <div
                        className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(3)}>Calendar
                    </div>
                    <div
                        className={`cursor-pointer px-5 py-1 text-md font-semibold ${activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(4)}>Dashboard
                    </div>
                    <div
                        className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(5)}>Messages
                    </div>
                    <div
                        className={`cursor-pointer px-5 py-1 text-md font-semibold  ${activeTab === 6 ? 'border-b-2 border-orange-600 text-black' : ''
                            }`}
                        onClick={() => handleTabClick(6)}>files
                    </div>
                </div><hr />
            </div>
            {activeTab === 1 && <div className="mt-4">
                <form className="space-y-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-2" method="POST">
                    <div className='grid1-item'>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Entity Name</label>
                            <div className="">
                                <input id="name" name="name" type="text" autoComplete="name" required className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className=''>
                                <textarea className="resize-none border rounded-md p-2 w-full h-32 border-1 border-gray-400 focus:outline-none focus:border-orange-400"></textarea>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Bhavitha</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Irshad</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'>Lakshmi</h4>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Niraj</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Irfan</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'>Krishna</h4>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'>sasi</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Moiz</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'>Srikanth</h4>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'>sasi</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                <h4 className='my-3'> Moiz</h4>
                            </div>
                            <div className='grid1-item flex'>
                                <img className="w-8 h-8 rounded-full mx-3 my-2" src={defprop} alt="Neil image" />
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-4">
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                </svg> */}
                                <p className='mt-4'> 2 more</p>
                            </div>
                        </div>

                    </div>

                </form>
            </div>
            }
            {activeTab === 2 && <div className="">
                <div className='flex justify-end my-2'>

                    <Menu as="div" className="relative inline-block ms-3 mt-1">
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
                    <Menu as="div" className="relative inline-block ms-3 mt-1">
                        <div className=''>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50">
                                Sort
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
                                                Start
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
                                                Due
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
                                                Assigned
                                            </Link>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <div>
                        <button className=" ms-2 create-btn mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-orange-foreground shadow hover:bg-orange/90 h-9 px-3 py-1 shrink-0 bg-orange-600 text-white gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ">
                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                            </svg>
                            Add Task</button>
                    </div>
                </div>

                <table className="w-full border-collapse border border-slate-200 mt-1 table-auto">
                    <thead>
                        <tr >
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Task Name</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Assigne</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Due Date</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Board Meeting</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Status</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Create by Admin</th>
                            <th scope="col" className="py-2 text-sm text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Update by Admin </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* <div className='flex flex-start mt-2 ms-2' onClick={handletodo}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <p className='text-md ms-2 font-semibold mb-3' >To Do</p>
                        </div> */}

                        {/* {todo && */}
                        <tr className='text-center text-gray-500'>
                            <td scope="col" onClick={toggleDrawer} className="flex justify-between py-2 text-sm border-collapse border border-[#e5e7eb]">
                                <div className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ms-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg><span className='text-sm ms-2' >Draft project brief</span></div>
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-end">
                                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Assigne</td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Due Date</td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Board Meeting</td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Status</td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Create by User </td>
                            <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Update by Admin </td>
                        </tr>
                        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
                            <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
                                <div className="flex justify-start">
                                    <div className="">
                                        <button className='border border-1 p-1 text-xs'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                                        </svg>
                                            Mark Complete</button>
                                    </div>
                                    <button onClick={toggleDrawer} className="absolute top-4 right-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                </div>


                            </div>
                        </div>
                        <tr className='text-center text-gray-500'>
                            <td className="py-2 border-slate-200 flex justify-start ms-4 text-sm">
                                <input className='w-full bg-gray-50 border-none focus:outline-none' type="text" placeholder='Add Task ..' />
                            </td>
                            <td className="border text-sm" colspan="7"></td>
                        </tr>
                        {/* <div className='flex flex-start' onClick={handledoing}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-3">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <p className='text-md ms-2 font-semibold mb-3 mt-3'>Doing</p>
                        </div>
                        {doing &&
                            <tr className='text-center text-gray-500'>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] flex justify-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ms-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg><span className='text-sm ms-2'>Draft project brief</span></td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Assigne</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Due Date</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Board Meeting</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Status</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Create by User </td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Update by Admin </td>
                            </tr>}
                        <tr className='text-center text-gray-500'>
                            <td className="py-2 border-slate-200 flex justify-start ms-4 text-sm border-b-" colspan="">
                                <input className='w-full bg-gray-50 border-none focus:outline-none' type="text" placeholder='Add Task ..' />
                            </td>
                            <td className="border text-sm" colspan="7"></td>
                        </tr>

                        <div className='flex flex-start' onClick={handledone}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mt-3">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <p className='text-md ms-2 font-semibold mb-3 mt-3'>Done</p>
                        </div>
                        {done &&
                            <tr className='text-center text-gray-500'>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] flex justify-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 ms-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg><span className='text-sm ms-2'>Draft project brief</span></td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Assigne</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Due Date</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb]">Board Meeting</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Status</td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Create by User </td>
                                <td scope="col" className="py-2 text-sm border-collapse border border-[#e5e7eb] ">Update by Admin </td>
                            </tr>

                        } 
                        <tr className='text-center text-gray-500'>
                            <td className="py-2 border-slate-200 flex justify-start ms-4 text-sm border-b-" colspan="">
                                <input className='w-full bg-gray-50 border-none focus:outline-none' type="text" placeholder='Add Task ..' />
                            </td>
                            <td className="border text-sm" colspan="7"></td>
                    </tr> */}
                    </tbody>
                </table>
                <div>

                </div>
            </div>}
            {activeTab === 3 && <div className="mt-4">
                <div>

                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelect}
                    />


                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 sm:mx-0 sm:h-10 sm:w-10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                                                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                                        </svg>

                                                        {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            Create New Task
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <input placeholder='Enter Task Here' className='focus:outline-none ps-1 border-b-2 border-gray-200' onChange={(e) => setNewTask(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-orange-600 px-3 py-2 text-sm  text-white shadow-sm  sm:ml-3 sm:w-auto"
                                                    onClick={handleSave}
                                                >
                                                    Save
                                                </button>

                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>




                </div>
            </div>}
            {activeTab === 4 && <div className="mt-4">
                kikk
            </div>}
            {activeTab === 5 && <div className="mt-4">
                <div className='flex flex-col '>
                    <div className='flex justify-center'>
                        <div className='flex flex-start rounded-md border-2 border-gray-200 px-3 py-2'>
                            <img className="w-8 h-8 rounded-full mx-3 my-3" src={defprop} alt="Neil image" />
                            <div className='mt-2 mr-2'>
                                <input className='px-2 py-2 w-96 focus:outline-none bg-[#f8fafc] rounded-md border-2 border-gray-200 ' type='text' placeholder='Enter Your Message' />
                            </div>
                            <div className=''> <button className='mt-4 text-lg'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                            </svg>
                            </button></div>
                        </div>
                    </div>
                </div>

            </div>}
            {activeTab === 6 && <div className="mt-4">
                kikk
            </div>}

        </div>
    )
}

export default EntityLandingPage