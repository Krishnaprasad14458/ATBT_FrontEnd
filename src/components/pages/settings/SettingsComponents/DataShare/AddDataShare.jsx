import React from 'react'

const AddDataShare = () => {
    return (
        <div className=' p-4 bg-[#f8fafc]'>
            <div className='grid grid-cols-2  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 '>
                <div className='col-span-1 '>
                    <label className=' block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1'>
                        Name</label>
                    <input
                        type='text'
                        placeholder='Enter name'
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs' />
                </div>
                <div className='col-span-1 '>
                    <label className=' block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1'>
                        Description</label>
                    <input
                        type='text'
                        placeholder='Enter Description'
                        className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs' />
                </div>
            </div>
            <div className='grid grid-cols-2  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-2 '>
                <div className='col-span-1 '>
                    <div className='grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
                        <div className='col-span-1'>
                            <label className=' block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1'>
                                Share data of</label>
                        </div>
                    </div>
                    <div className='grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
                        <div className='col-span-1'>

                            <select className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'>
                                <option>User</option>
                                <option>Entity</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <select
                                className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'>
                                <option>bhavitha</option>
                                <option>Irshad</option>
                                <option>Irfan</option>
                                <option>Niraj</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 '>
                    <div className='grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
                        <div className='col-span-1'>
                            <label className=' block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1'>
                                Share data with</label>
                        </div>

                    </div>
                    <div className='grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
                        <div className='col-span-1'>
                            <div className='px-2 py-1.5  block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400'>
                                <span className='text-sm'> User</span>
                            </div>

                        </div>
                        <div className='col-span-2'>
                            <select
                                className='px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs'>
                                <option>bhavitha</option>
                                <option>Irshad</option>
                                <option>Irfan</option>
                                <option>Niraj</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex justify-end '>
                <button className='mt-4 px-3 py-2 flex  justify-end whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '>
                    Add
                </button>
            </div>
        </div>
    )
}
export default AddDataShare