import React from 'react';
import { Link } from 'react-router-dom';
import userformicon from '../../../../../assets/Images/Userform.svg';
import entityform from '../../../../../assets/Images/entity.svg';
import boardmeetingform from '../../../../../assets/Images/boardmeeting.svg';
import teamsform from '../../../../../assets/Images/teams.svg';
const Forms = () => {
const formsData = [
        {
            name: "User Form",
            icon: userformicon,
            link: "userform"
        },
        {
            name: "Entity Form",
            icon: entityform,
            link: "entityform"
        },
        {
            name: "Board Meeting Form",
            icon: boardmeetingform,
            link: "boardmeetingform"
        },
        {
            name: "Teams Form",
            icon: teamsform,
            link: "teamform"
        },
    ]
    return (
        <div className=' p-4 bg-[#f8fafc]'>
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
                {formsData && formsData.length > 0 && formsData.map((data) => (
                    <Link to={data.link}>
                        <div className='transition-transform duration-300 ease-in-out transform hover:-translate-y-1 custom-shadow hover:shadow-sm shadow-sm'>
                            <div className='grid1-item  text-start rounded-md'>
                                <div className=' py-3 px-4 text-start bg-white rounded-md flex justify-between items-center shadow-sm'>
                                    <div>
                                        <p className='text-black flex text-md font-semibold'>{data.name}</p>
                                        <span className='mt-3 text-sm leading-6 underline text-black flex gap-1'>
                                            <p>Explore </p> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 mt-1">
                                                <path fill-rule="evenodd" d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                    <span className='bg-orange-100 rounded-full hidden sm:block'>
                                        <img src={data.icon} className='w-16 h-16 rounded-full' /> </span>
                                </div>
                            </div>

                        </div></Link>
                ))}
            </div>
        </div >
    )
}
export default Forms