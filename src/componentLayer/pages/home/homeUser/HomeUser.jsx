import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Link,
  useFetcher,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import HomeUsersList from "../../../pages/home/homeUser/HomeUsersList";
import GateKeeper from "../../../../rbac/GateKeeper";
import { debounce, caseLetter } from "../../../../utils/utils";

function HomeUser() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.toString(), "sp");
  const fetcher = useFetcher();
  const data = fetcher?.data?.data ?? [];
  const navigation = useNavigation();
  console.log(navigation, "dparam", fetcher);
  const [Qparams, setQParams] = useState({
    search: "",
    page: 1,
    pageSize: 5,
  });
  const debouncedParams = useCallback(
    debounce((param) => {
      fetcher.submit(param, {
        method: "get",
        action: "resource/dashboard/user",
      });
    }, 500),
    []
  );
  useEffect(() => {
    debouncedParams(Qparams);
  }, [Qparams]);
  const handleSearchChange = (event) => {
    setQParams({
      ...Qparams,
      page: 1,
      search: event.target.value,
    });
  };

  function handlePage(page) {
    setQParams({
      ...Qparams,
      page,
    });
  }
  return (
    <div className="w-full h-[420px] relative text-center bg-slate-50 border border-gray-200 rounded-md shadow sm:pt-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="grid1-item overflow-hidden sm:w-full">
        <div className="p-3 sm:px-6 sm:pt-2">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-lg font-semibold leading-none text-gray-800 dark:text-white">
              Users {fetcher?.state === "loading" ? "..." : null}
            </h5>
            <GateKeeper
              permissionCheck={(permission) =>
                permission.module === "user" && permission.canCreate
              }
            >
              <Link
                to="/users/new"
                className="text-sm font-medium text-white-600 hover:underline dark:text-white-500"
              >
                <button className="inline-flex px-3 py-2 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow hover:bg-primary/90 shrink-0 bg-orange-600 text-white gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 "
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  Create
                </button>
              </Link>
            </GateKeeper>
          </div>
          {/* input module */}
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              type="search"
              id="gsearch"
              name="gsearch"
              className="bg-slate-50  w-80  border-none focus:outline-none appearance-none focus:border-none placeholder:text-sm text-sm"
              placeholder="Search here..."
              onChange={handleSearchChange}
            />
          </div>
          <hr className="w-96 my-1" />
        </div>
        <hr />
        {/* list module */}
        <div className="flow-root md:p-0 px-2 ">
          <ul
            role="list"
            className="divide-y divide-[#e3e3e3] dark:divide-gray-700 "
          >
            {!data?.users || data?.users?.length === 0 ? (
              <li className="py-2 px-2">
                <p>No user found</p>
              </li>
            ) : (
              data?.users?.map((user) => (
                <li
                  className="py-2 md:px-5  hover:bg-slate-100 "
                  title={caseLetter(user.userName || user.name)}
                  key={user.id}
                >
                  <Link to={`/users/${user.id}`}>
                    <HomeUsersList user={user} className="" />
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
        <hr />
      </div>
      {/* dashboard module */}
      <div className="flex items-center justify-between  px-4 py-3  sm:px-6 absolute inset-x-0 right-0 bottom-0">
        {/* hidden dashboard only for mobile */}
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        {/*only for big screen dashboard */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          {/* dashboard data */}
          <div>
            {!data?.users || data?.users?.length === 0 ? (
              "no data to show"
            ) : fetcher?.state === "loading" ? (
              "Loading..."
            ) : (
              <p className="text-sm text-gray-700">
                Showing {data?.startUser} to {data?.endUser} of
                <span className="text-sm "> {data?.totalUsers}</span>
              </p>
            )}
          </div>
          {/* prev and next for big screens */}
          <div>
            <section
              className="isolate inline-flex -px rounded-md shadow-sm"
              aria-label="dashboard"
            >
              {/* previos button */}
              <button
                disabled={
                  fetcher?.state === "loading"
                    ? true
                    : false || data?.currentPage === 1
                }
                onClick={() => handlePage(data.currentPage - 1)}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  fetcher?.state === "loading"
                    ? "cursor-wait"
                    : data?.currentPage === 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              {/* next button */}
              <button
                disabled={
                  fetcher?.state === "loading"
                    ? true
                    : false || data?.currentPage === data?.totalPages
                }
                onClick={() => handlePage(data.currentPage + 1)}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  fetcher?.state === "loading"
                    ? "cursor-wait"
                    : data?.currentPage === data?.totalPages
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeUser;
