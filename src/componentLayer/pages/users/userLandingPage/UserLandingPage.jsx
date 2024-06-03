import React from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";

import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import GateKeeper from "../../../../rbac/GateKeeper";

const UserLandingPage = () => {
  const { id, BMid } = useParams();
  return (
    <div className=" p-3 bg-[#f8fafc]">
      <div className="flex justify-between my-2">
        <p className="text-xl font-semibold">
          {" "}
          <BreadCrumbs />
        </p>
      </div>
      <div className="flex overflow-x-auto">
        {!BMid && (
          <GateKeeper
            permissionCheck={(permission) =>
              permission.module === "meeting" && permission.canRead
            }
          >
            <NavLink
              to={{
                pathname: `userboardmeetings`,
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
              User Meetings
            </NavLink>
          </GateKeeper>
        )}
        {BMid && (
          <GateKeeper
          permissionCheck={(permission) =>
            permission.module === "task" && permission.canRead
          }
        >
             <NavLink
            to={`userboardmeetings/${BMid}/tasks`}
            end
            isActive={(match, location) =>
              match ||
              location.pathname.startsWith(`/users/${id}/userboardmeetings`)
            }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Meeting Tasks
          </NavLink>
        </GateKeeper>
      
        )}

        {!BMid && (
          <GateKeeper
            permissionCheck={(permission) =>
              permission.module === "task" && permission.canRead
            }
          >
            
            <NavLink
              to={{
                pathname: "tasks",
                search: `?status=To-Do`,
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
              User Tasks
            </NavLink>
          </GateKeeper>
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
            User Attachments
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
                ? "border-b-2 border-orange-500 text-orange-600 cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Meeting Attachments
          </NavLink>
        )}

        {!BMid && (
           <GateKeeper
           permissionCheck={(permission) =>
             permission.module === "user" && permission.canRead
           }
         >
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
            User Overview
          </NavLink>
         </GateKeeper>
    
        )}
        {BMid && (
              <GateKeeper
              permissionCheck={(permission) =>
                permission.module === "meeting" && permission.canRead
              }
            >
               <NavLink
            to={`userboardmeetings/${BMid}`}
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
            </GateKeeper>
          
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default UserLandingPage;
