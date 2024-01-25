import React from 'react'

const AddRoles = () => {
    return (
        <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
            <h1 className='font-semibold text-lg grid1-item'> Add Roles</h1>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-col-2 gap-2 mt-2'>
                <div className='grid1-item mx-3 text-start w-96'>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
                        <div className="">
                            <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                    </div>
                </div>
                <div className='grid1-item mx-3 text-start w-96'>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900">Name</label>
                        <div className="">
                            <input id="name" name="boardMeetingName" type="text" autoComplete="name" required className="p-2 text-xs block w-full bg-gray-50  rounded-md  border-2 border-gray-200 py-1 text-gray-900 appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoles