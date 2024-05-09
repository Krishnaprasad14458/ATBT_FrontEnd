import React, { useState, useContext } from "react";
import {
  NavLink,
  redirect,
  useLoaderData,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { UserDataContext } from "../../../../contexts/usersDataContext/usersDataContext";
import { getUserById } from "../../../../contexts/usersDataContext/utils/usersApis";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";

const UserLandingPage = () => {
  const { id, BMid } = useParams();
  const data = useLoaderData();

  const {
    usersState: { users },
    getUser,
  } = useContext(UserDataContext);
  // for the active tabs
  const location = useLocation();
  const currentURL = location.pathname.split("/");
  console.log("currentURL", currentURL);

  return (
    <div className=" p-4 bg-[#f8fafc]">
      <div className="flex justify-between my-2">
        {/* <p className="text-xl font-semibold">User Landing Page</p> */}
        <BreadCrumbs />
      </div>

      <div className="flex overflow-x-auto">
        {!BMid && (
          <NavLink
            to="userboardmeetings"
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          User Board Meetings
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`userboardmeetings/${BMid}/tasks`}
            end
            isActive={(match, location) =>
              match ||
              location.pathname.startsWith(`/users/${id}/boardmeetings`)
            }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Board Meetings Tasks
          </NavLink>
        )}

        {!BMid && (
          <NavLink
            to="tasks"
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
           User Tasks
          </NavLink>
        )}
        {!BMid && (
          <NavLink
            to="documents"
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          User  Documents
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`userboardmeetings/${BMid}/documents`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          Board Meeting  Documents
          </NavLink>
        )}

        {!BMid && (
          <NavLink
            to="."
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          User  Overview
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`userboardmeetings/${BMid}`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
          Board Meeting  Overview
          </NavLink>
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default UserLandingPage;
