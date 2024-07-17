import React, { useState, useEffect, useContext, } from 'react';
import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';
// import { BoardMeetingsDataContext } from '../../../../contexts/boardmeetingsDataContext/boardmeetingsDataContext';
// import axios from 'axios';
import GateKeeper from '../../../../rbac/GateKeeper';
import BreadCrumbs from '../../../components/breadcrumbs/BreadCrumbs';
const BoardMeetingLandingPage = () => {
  const { id, BMid } = useParams();

 
  return (
    <div className=' p-4 bg-[#f8fafc]'>
      <div className='flex justify-between my-2'>
        <p className='text-xl font-semibold'><BreadCrumbs/></p>
      </div>
      <div className='flex overflow-auto'>
      <GateKeeper
          permissionCheck={(permission) =>
            permission.module === "task" && permission.canRead
          }
        >
             <NavLink
            to={`tasks?search=&page=1&pageSize=10`}
            end
            // isActive={(match, location) =>
            //   match ||
            //   location.pathname.startsWith(`/users/${id}/userboardmeetings`)
            // }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
           Decisions
          </NavLink>
        </GateKeeper>
        <NavLink
            to={`documents`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Attachments
          </NavLink>
          <GateKeeper
              permissionCheck={(permission) =>
                permission.module === "meeting" && permission.canRead
              }
            >
               <NavLink
            to={`.`}
            
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Overview
          </NavLink>
            </GateKeeper>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default BoardMeetingLandingPage;
