import React from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomColumn from "../../../componentLayer/components/tableCustomization/CustomColumn";
import CustomFilter from "../../../componentLayer/components/tableCustomization/CustomFilter";
function Reports() {
  document.title = "ATBT | Report";
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div className="overflow-x-auto p-3">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 items-center gap-2 mt-2">
        <h1 className="font-semibold text-lg grid1-item">Reports</h1>
        <div className="grid1-item text-start">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              // onChange={handleSearch}
              // value={Qparams?.search}
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none "
              placeholder="Search here..."
              required
            />
          </div>
        </div>
        <div className="grid1-item text-end flex justify-end filter_pagination divide-x-2 h-7 mt-2">
          {/* <CustomColumn
            tableView={tableView}
            setTableView={setTableView}
            form="userform"
          />
          <CustomFilter
            fieldsDropDownData={fieldsDropDownData}
            Qparams={Qparams}
            setQParams={setQParams}
            customForm={customForm}
          /> */}

          {/* for filter open */}
        </div>
      </div>
      {/* table */}
      <div className="max-h-[510px] overflow-y-scroll mt-5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              S.no
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Report Name
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Description
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Created By
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Created Date
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Generate
            </th>
          </tr>
        </thead>
        <tbody className=" divide-gray-200 dark:divide-gray-700">
          <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              1
            </td>

            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              ATBT
            </td>

            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              Something
            </td>
            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              bhavitha
            </td>
            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              20-05-2024
            </td>
            <td
              className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

            </td>
          </tr>
        </tbody>
      </table>
      </div>

      {/* pagination */}
      {/* <div className="inset-x-0 bottom-0 mt-5">
        <div className="md:flex md:justify-between block text-end">
          <div className="">
            {!users?.users || users?.users?.length === 0 ? (
              "no data to show"
            ) : users.loading ? (
              "Loading..."
            ) : (
              <p className="text-sm text-gray-700">
                Showing {users.startUser} to {users.endUser} of{" "}
                <span className="font-medium">{users.totalUsers}</span>
                <span className="font-medium"> </span> results
              </p>
            )}
          </div>

          <section
            className="isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0"
            aria-label="Pagination"
          >
            <select
              value={Qparams?.pageSize}
              onChange={handlePerPageChange}
              className="focus:outline-none me-3 rounded-md bg-[#f8fafc]  px-1 py-1.5 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm  text-gray-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
 
            <button
              disabled={
                navigation?.state === "loading"
                  ? true
                  : false || users.currentPage === 1
              }
              onClick={() => handlePage(users.currentPage - 1)}
              href="#"
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                navigation?.state === "loading"
                  ? "cursor-wait"
                  : users.currentPage === 1
                  ? "cursor-not-allowed"
                  : "cursor-auto"
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
   
            <button
              disabled={
                navigation?.state === "loading"
                  ? true
                  : false || users.currentPage === users.totalPages
              }
              onClick={() => handlePage(users.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                navigation?.state === "loading"
                  ? "cursor-wait"
                  : users.currentPage === users.totalPages
                  ? "cursor-not-allowed"
                  : "cursor-auto"
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
      </div> */}
    </div>
  );
}

export default Reports;
