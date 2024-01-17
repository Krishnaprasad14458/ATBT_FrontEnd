import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function BoardMeetings() {
  return (
    <div className=' p-2 bg-[#f8fafc] overflow-hidden'>
      <h1 className='mx-3 mt-2  font-semibold text-lg grid1-item'>Board Meetings</h1>
      <div className="flex justify-start">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "cursor-pointer px-5 py-1 font-semibold pending" :
              isActive ? "cursor-pointer px-5 py-1 font-semibold border-b-4 border-orange-600 text-black active" :
                "cursor-pointer px-5 py-1 font-semibold"
          }
          exact
          to="/boardmeetings/completed">
          Completed
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? "cursor-pointer px-5 py-1 font-semibold pending" :
              isActive ? "cursor-pointer px-5 py-1 font-semibold border-b-4 border-orange-600 text-black active" :
                "cursor-pointer px-5 py-1 font-semibold"
          }
          activeClassName={'border-b-4 border-orange-600  text-black'}
          to="/boardmeetings/upcomming">
          Upcomingg
        </NavLink>
      </div>
      <Outlet />
    </div >
  )
}

export default BoardMeetings

