import React from 'react';
import { Link } from 'react-router-dom';
const Forms = () => {
    return (
        <div className='container p-4 bg-[#f8fafc]'>
            <div className="flex justify-between">
                <p className="text-xl font-semibold">Forms</p>
                <div className='flex justify-end'>
                    <Link to="/settings">
                        <button type="submit"
                            className="create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1">Back</button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-4 mt-4">
                <Link
                    to="userform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                User Form
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    to="entityform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Entity Form
                            </p>
                        </div>
                    </div>
                </Link>
                <Link to="boardmeetingform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Board Meeting Form
                            </p>
                        </div>
                    </div>
                </Link>

                <Link to="teamform">
                    <div className='grid1-item  text-start'>
                        <div className=" py-5 px-4 text-center bg-orange-600 rounded-md">
                            <p className="text-white text-base">
                                Teams Form
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Forms