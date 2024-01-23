import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrganizationProfile = () => {


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
                    onClick={() => handleTabClick(4)}>Subscription
                </div>
                <div
                    className={`cursor-pointer px-5 py-2 font-semibold ${activeTab === 5 ? 'border-b-2 border-orange-600 text-black' : ''
                        }`}
                    onClick={() => handleTabClick(5)}>Activity Log
                </div>
            </div><hr />


            {activeTab === 1 && <div className="mt-4">
                <div className='flex justify-center mt-8'>
                    <div className='shadow-md border-2 bg-gray-52 rounded-md p-8'>
                        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                            <div className='grid col-span-1'>
                                <p className='px-3 pb-2.5 text-sm text-gray-800'> Organization Name  </p>
                                <p className='px-3 py-2.5 text-sm text-gray-800'> Office Address  </p>
                                <p className='px-3 py-2.5 text-sm text-gray-800'> Office Whatsapp Number  </p>
                                <p className='px-3 py-2.5 text-sm text-gray-800'> Office Landline Number  </p>
                                <p className='px-3 py-2.5 text-sm text-gray-800'> Office Email  </p>
                                <p className='px-3 py-2.5 text-sm text-gray-800'>Own Domain / Sub Domain </p>
                            </div>
                            <div className='grid col-span-2'>
                                <p className='px-3 pb-2.5 text-md'>:&nbsp; &nbsp; &nbsp; ATBT</p>
                                <p className='px-3 py-2.5 text-md'>:&nbsp; &nbsp; &nbsp; Hyderabad</p>
                                <p className='px-3 py-2.5 text-md'>:&nbsp; &nbsp; &nbsp; 0987654321</p>
                                <p className='px-3 py-2.5 text-md'>:&nbsp; &nbsp; &nbsp; 01927</p>
                                <p className='px-3 py-2.5 text-md'>:&nbsp; &nbsp; &nbsp; atbt123@gmail.com</p>
                                <p className='px-3 py-2.5 text-md'>:&nbsp; &nbsp; &nbsp; https://erp.atbt.com</p>
                            </div>
                        </div>
                    </div> </div></div>}



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
                <div className='shadow-md border-2 bg-gray-52 rounded-md p-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                    <div className='grid col-span-1'>
                        <p className='px-3 pb-2.5 text-sm text-gray-800'> Organization Name  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Address  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Whatsapp Number  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Landline Number  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Email  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'>Own Domain / Sub Domain </p>
                    </div>
                    <div className='grid col-span-2'>
                        <input id="name" name="entityname" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Address  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Whatsapp Number  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Landline Number  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'> Office Email  </p>
                        <p className='px-3 py-2.5 text-sm text-gray-800'>Own Domain / Sub Domain </p>
                    </div>

                </div>
            </div>}
            {activeTab === 4 && <div className="mt-4">Content for Tab 4</div>}
            {activeTab === 5 && <div className="mt-4">Content for Tab 4</div>}
            {activeTab === 6 && <div className="mt-4">Content for Tab 4</div>}
            {activeTab === 7 && <div className="mt-4">Content for Tab 4</div>}







        </div >
    )
}

export default OrganizationProfile