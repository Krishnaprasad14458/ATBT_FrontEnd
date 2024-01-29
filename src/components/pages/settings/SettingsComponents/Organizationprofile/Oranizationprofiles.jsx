import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { UserDataContext } from '../../../../../contexts/usersDataContext';

const OrganizationProfile = () => {
    const { usersState: { users },deleteUser } = useContext(UserDataContext);

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    // choose photo adding
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setSelectedFileName(file.name);

            };
            reader.readAsDataURL(file);
        }
    };

    const handleChooseFileClick = () => {
        document.getElementById('fileInput').click();
    };


    // for number scrolling disable
    $('input[type=number]').on('mousewheel', function (e) {
        $(e.target).blur();
    });
    // 

    return (
        <div className='container p-4 bg-[#f8fafc]'>
            <h1 className='mx-3 font-semibold text-lg grid1-item'>Organization Profile</h1>
            <div className="flex justify-start mt-3">
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-2 border-orange-600  text-black' : ''
                        }`}
                    onClick={() => handleTabClick(1)}>Overview
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(2)}>Organization Logo
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(3)}>Edit
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(4)}>Users
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(5)}>Activity Log
                </div>

            </div><hr />


            {activeTab === 1 && <div className="mt-4">
                <div className='flex justify-center mt-8'>
                    <div className='shadow border-2 bg-gray-52 rounded-md w-5/6'>
                        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid col-span-1 border-e-2 border-e-gray-200'>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 '> Organization Name  </p>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> Office Address  </p>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> Office Whatsapp Number  </p>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> Office Landline Number  </p>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> Office Email  </p>
                                <p className='px-3.5 py-3 text-sm text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>Own Domain / Sub Domain </p>
                            </div>
                            <div className='grid col-span-2'>
                                <p className='px-3 py-3 text-md text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> ATBT</p>
                                <p className='px-3 py-3 text-md text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> Hyderabad</p>
                                <p className='px-3 py-3 text-md  text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> 0987654321</p>
                                <p className='px-3 py-3 text-md  text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> 01927</p>
                                <p className='px-3 py-3 text-md  text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> atbt123@gmail.com</p>
                                <p className='px-3 py-3 text-md  text-gray-800 odd:bg-[#f3f4f6] odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'> https://erp.atbt.com</p>
                            </div>
                        </div>
                    </div></div></div>}

            {activeTab === 2 && <div className="mt-4">
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            </div>}
            {activeTab === 3 && <div className="mt-4">
                <div className='flex justify-center mt-8'>
                    <div className='shadow-md border-2 bg-gray-52  rounded-md p-4 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 w-5/6'>
                        <div className='grid col-span-1'>
                            <p className='px-2.5 pb-2.5 text-sm text-gray-800 pt-2.5'> Organization Name  </p>
                            <p className='px-2.5 py-2.5 text-sm text-gray-800 pt-2.5'> Office Address  </p>
                            <p className='px-2.5 py-2.5 text-sm text-gray-800 pt-2.5'> Office Whatsapp Number  </p>
                            <p className='px-2.5 py-2.5 text-sm text-gray-800 pt-2.5'> Office Landline Number  </p>
                            <p className='px-2.5 py-2.5 text-sm text-gray-800 pt-2.5'> Office Email  </p>
                            <p className='px-2.5 py-2.5 text-sm text-gray-800 pt-2.5'>Own Domain / Sub Domain </p>
                        </div>
                        <div className='grid col-span-3'>
                            <input id="name" name="entityname" type="text" autoComplete="name" required className=" mb-3 w-ffull p-2 text-xs block  bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            <input id="name" name="entityname" type="text" autoComplete="name" required className=" mb-3 p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            <input id="name" name="entityname" type="number" autoComplete="name" required className=" mb-3 p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                                style={{ "-moz-appearance": "textfield" }} />
                            <input id="name" name="entityname" type="number" autoComplete="name" required className=" mb-3 p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            <input id="name" name="entityname" type="email" autoComplete="name" required className=" mb-3 p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                            <input id="name" name="entityname" type="text" autoComplete="name" required className=" mb-3 p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>

                    </div></div>
            </div>}
            {activeTab === 4 && <div className="mt-4">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden ">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Name</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb]">Email</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb]">Phone Number</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Entity Name</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Designation</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Role </th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Actions </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map(user =>(
                                                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.userName}</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.email}</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">{user.phone}</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Infoz IT</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Developer</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Jr.Software Developer</td>
                                                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                                                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                                                                            </svg>
                                                                        </button>
                                                                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                                                            </svg>
                                
                                                                        </button>
                                                                        <button type="button" onClick={()=>deleteUser(user.id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                                                                            </svg>
                                
                                                                        </button>
                                                                        <label class="relative inline-flex items-center cursor-pointer">
                                                                            <input type="checkbox" value="" class="sr-only peer" />
                                                                            <div class="w-9 h-5 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-orange-600 checked:bg-orange-600"></div>
                                
                                                                        </label>
                                                                    </td>
                                                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
            {activeTab === 5 && <div className="mt-4">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden ">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Login Time</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb]">IP Address</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb]">Browser</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600  border-collapse border border-[#e5e7eb] ">Employee Name</th>
                                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600   border-collapse border border-[#e5e7eb] ">Entity Name</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">22-1-2023 (9:00AM)</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">irndf32432</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Crome</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Bhavitha</td>
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"> Inofz IT</td>


                                    {/* <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800  flex justify-evenly">
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                                </svg>

                                            </button>
                                            <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#64748b] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                                                </svg>

                                            </button>
                                        </td> */}
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}

        </div >
    )
}

export default OrganizationProfile