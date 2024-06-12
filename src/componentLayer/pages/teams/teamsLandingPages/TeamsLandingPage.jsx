import React, { useState, useEffect } from "react";
import {
  NavLink,
  useParams,
  Outlet,
  useMatch,
  useMatches,
  useLocation,
} from "react-router-dom";

import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
const TeamsLandingPage = () => {
  const { id, BMid } = useParams();
  let location = useLocation();
  let [ActiveLink, setActiveLink] = useState(false);
  useEffect(() => {
    if (
      location.pathname == `/teams/${id}/tasks/To-Do` ||
      location.pathname == `/teams/${id}/tasks/In-Progress` ||
      location.pathname == `/teams/${id}/tasks/Over-Due` ||
      location.pathname == `/teams/${id}/tasks/Completed` ||
      location.pathname == `/teams/${id}/tasks/Master`
    ) {
      setActiveLink(true);
    } else {
      setActiveLink(false);
    }
  }, [location]);

  return (
    <div className=" p-4 bg-[#f8fafc]">
      <div className="flex justify-between my-2">
        <p className="text-xl font-semibold">
          <BreadCrumbs />
        </p>
      </div>
      <div className="flex overflow-auto">
        {!BMid && (
          <NavLink
            to={{
              pathname: `teamboardmeetings`,
              search: `?search=&page=1&pageSize=10`,
            }}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Team Meetings
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`teamboardmeetings/${BMid}/tasks`}
            end
            isActive={(match, location) =>
              match ||
              location.pathname.startsWith(`/teams/${id}/teamboardmeetings`)
            }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Meetings Decisions
          </NavLink>
        )}{" "}
        {!BMid && (
          <NavLink
            // to={{
            //   pathname: "tasks/To-Do",
            //   // search: `?status=To-Do`,
            // }}
            to="tasks/To-Do?search=&page=1&pageSize=10"

            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : ActiveLink
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Team Decisions
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
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Team Attachments
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`teamboardmeetings/${BMid}/documents`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Meeting Attachments
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
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Team Overview
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`teamboardmeetings/${BMid}`}
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Meeting Overview
          </NavLink>
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default TeamsLandingPage;
