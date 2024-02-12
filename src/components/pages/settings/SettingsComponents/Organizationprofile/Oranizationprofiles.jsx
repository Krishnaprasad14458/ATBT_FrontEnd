import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserDataContext } from '../../../../../contexts/usersDataContext/usersDataContext';
import useDebounce from '../../../../../hooks/debounce/useDebounce';
import * as actions from '../../../../../contexts/usersDataContext/utils/usersActions';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const OrganizationProfile = () => {
    const { usersState: { settings }, usersDispatch, deleteUser, setSortBy, toggleUser } = useContext(UserDataContext);
    const { debouncedSetPage, debouncedSetSearch } = useDebounce(usersDispatch);
    const handlePerPageChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        usersDispatch({
            type: 'SET_PER_PAGE',
            payload: {
                conext: 'SETTINGS',
                data: selectedValue
            }
        });
    };
    useEffect(() => {
        // usersDispatch(actions.setPerPage(10))
        return () => {
            usersDispatch({
                type: "SET_SEARCH",
                payload: {
                    data: "",
                    context: "SEIINGS"
                }
            })
            //   usersDispatch(actions.setPerPage(5))
        }
    }, [])
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    // choose photo adding
    const [imageSrc, setImageSrc] = useState(null);
    const [displayImage, setDisplayImage] = useState()
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setDisplayImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(file);
                setSelectedFileName(file.name);

            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        // console.log("imageSrc", imageSrc)
    })
    const handleChooseFileClick = () => {
        document.getElementById('fileInput').click();
    };


    // for number scrolling disable
    $('input[type=number]').on('mousewheel', function (e) {
        $(e.target).blur();
    });

    const handleDeleteUser = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#fff',
            confirmButtonText: 'Delete',
            customClass: {
                popup: 'custom-swal2-popup',
                title: 'custom-swal2-title',
                content: 'custom-swal2-content',
            },
        });

        if (confirmDelete.isConfirmed) {
            try {
                const result = await deleteUser(id);
            } catch (error) {
                Swal.fire('Error', 'Unable to delete user 🤯', 'error');
            }
        }
    };


    return (
        <div className='container lg:p-4 bg-[#f8fafc]'>
            <h1 className='mx-3 font-semibold text-lg grid1-item'>Organization Profile</h1>

            <div className="flex justify-start overflow-auto rounded-sm border-1">
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 1 ? 'border-b-2 border-orange-600  text-black' : ''
                        }`}
                    onClick={() => handleTabClick(1)}>Overview
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 2 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(2)}>Organization&nbsp;Logo
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 3 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(3)}>Edit
                </div>
               
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 4 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(4)}>Activity&nbsp;Log
                </div>
            </div>
            <hr />
            {/* 1st tab */}
            {activeTab === 1 && <div className="mt-4">
                <div className='lg:flex lg:justify-center lg:mt-8'>
                    <div className='shadow border-2 bg-gray-52 rounded-md sm:w-full lg:w-5/6'>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm  w-3/6 font-medium text-gray-800 border border-gray-200">Organization Name</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">ATBT</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Address</td>
                                        <td class="px-3 py-3 text-sm text-gray-800">Hyderabad</td>
                                    </tr>
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Whatsapp Number</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">0987654321</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Landline Number</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">01927</td>
                                    </tr>
                                    <tr class="bg-gray-50 dark:bg-gray-800">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Office Email</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">atbt123@gmail.com</td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-900">
                                        <td class="px-3 py-3 text-sm font-medium text-gray-800 border-r border-gray-200">Own Domain / Sub Domain</td>
                                        <td class="px-3 py-3 text-sm text-gray-800 border border-gray-200">https://erp.atbt.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
            {/* 2nd tab */}
            {activeTab === 2 && <div className="mt-4">
                <div className='flex justify-center mt-5'>
                    {displayImage && (
                        <img
                            src={URL.createObjectURL(displayImage)}
                            alt="Selected"
                            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
                        />
                    )}
                </div><br /><br />
                <div className='flex justify-center'>
                    <div className="mb-3 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                        <input className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleFileChange} />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>
                </div>
            </div>}
            {/* 3rd tab */}
            {activeTab === 3 && <div className="mt-4">
                <div className='flex justify-center mt-5'>
                    <div class='grid lg:grid-cols-2 sm:grid-cols-1 gap-6 lg:p-5 w-4/5 '>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Organization Name</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Address</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Whatsapp Number</label>
                            <input id="name" name="entityname" type="number" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" style={{ "-moz-appearance": "textfield" }} />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Landline Number</label>
                            <input id="name" name="entityname" type="number" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Office Email</label>
                            <input id="name" name="entityname" type="email" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                        <div>
                            <label class='text-sm text-gray-800 pt-1'>Own Domain / Sub Domain</label>
                            <input id="name" name="entityname" type="text" autoComplete="name" required class="mt-1 p-2 w-full text-xs block bg-gray-50 rounded-md border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>}
          
            {activeTab === 4 && <div className="mt-4 overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-y-scroll max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
                            <thead className='sticky top-0 z-50'>
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
                                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">Chrome</td>
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