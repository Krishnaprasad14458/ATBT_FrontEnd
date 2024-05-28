import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import CustomColumn from "../../../componentLayer/components/tableCustomization/CustomColumn";
import CustomFilter from "../../../componentLayer/components/tableCustomization/CustomFilter";
import atbtApi from "../../../serviceLayer/interceptor";
import { debounce } from "../../../utils/utils";
import { CSVLink } from "react-csv";

const userData = JSON.parse(localStorage.getItem("data"));
const userId = userData?.user?.id;



export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const statusName = url.searchParams.get("status");

    const [reports] = await Promise.all([
      // statusName === "master" ? atbtApi.get(`task/list?userId=191`) : atbtApi.get(`task/list?userId=191&status=${statusName}`)
      statusName === null || statusName === "master" ? atbtApi.get(`task/list?userId=${userId}`) : atbtApi.get(`task/list?userId=191&status=${statusName}`)
    ]);
    console.log(reports.data, statusName, "jdskfsjf")
    const combinedResponse = {
      reports: reports.data,
    }
    console.log(combinedResponse, "reportsresponse", request, params);
    return combinedResponse;
  }
  catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}


function Reports() {
  document.title = "ATBT | Report";
  const navigate = useNavigate();
  let submit = useSubmit();
  const data = useLoaderData();
  const { reports } = data;

  console.log(reports, "dsfjdsgjdgf")
  const [reportData, setReportData] = useState();

  console.log(reportData, "jhgvfdsffd")
  useEffect(() => {
    
      if (reports) {
        setReportData(reports.map((report, index) => ({
          ...report,
          'S.NO': index + 1 // Generate serial number
        })));
      }
  }, [reports])



  const handleSVGClick = async (newStatus) => {
    setQParams({ status: newStatus })
  };

  const [Qparams, setQParams] = useState({});
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: "get", action: "." });
    }, 500),
    [submit]
  );

  useEffect(() => {
    debouncedParams(Qparams);
  }, [Qparams, debouncedParams]);

  const headers = [
    //  { label: "COMPLETED DECISIONS - BVM & DAKSHIN", key: null, style: { bold: true, alignment: 'center' } },
    { label: 'S.NO', key: 'S.NO', style: { bold: true, alignment: 'center' } },
    { label: "Date of Board meeting", key: "createdAt", style: { bold: true, alignment: 'center' } },
    { label: 'Decision Taken', key: 'decision',  style: { bold: true, alignment: 'center' } },
    { label: 'Person Responsible for implementation', key: 'taskCreateby',  style: { bold: true, alignment: 'center' } },
    {label:"Date of Board Meeting in which the action is concluded" , key:"updatedAt",  style: { bold: true, alignment: 'center' }}
  ];


  const headerMaster =[
    { label: 'S.NO', key: 'S.NO', style: { bold: true, alignment: 'center' } },
    { label: "Date of Board meeting", key: "createdAt", style: { bold: true, alignment: 'center' } },
    { label: 'Decision Taken', key: 'decision',  style: { bold: true, alignment: 'center' } },
    { label: 'Person Responsible for implementation', key: 'taskCreateby',  style: { bold: true, alignment: 'center' } },
    {label:"Date of Board Meeting in which the action is concluded" , key:"updatedAt",  style: { bold: true, alignment: 'center' }}
  ]






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
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
          <thead>
            <tr>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Reports
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Download Csv File
              </th>

              {/* <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className=" divide-gray-200 dark:divide-gray-700">
            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >

                ATBT
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >

                {
                  reportData?.length > 0 ? (
                    <CSVLink data={reportData} headers={headers} filename="reports.csv">
                      <button
                        type="button"
                        title="CSV file"
                        className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

                        onClick={() => handleSVGClick("To-Do")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                      </button>
                    </CSVLink>
                  ) : (
                    "No Reports found"
                  )
                }



              </td>

            </tr>
            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >

                ATR
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >

                {
                  reportData?.length > 0 ? (
                    <CSVLink data={reportData} headers={headers} filename="reports.csv">
                      <button
                        type="button"
                        title="CSV file"
                        className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={() => handleSVGClick("In-Progress")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                      </button>
                    </CSVLink>
                  ) : (
                    "No Reports found"
                  )
                }


              </td>
            </tr>
            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                ATBT Master
              </td>

              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  hover:text-orange-500 overflow-hidden`}
                style={{ maxWidth: "160px" }}
              >
                {
                  reportData?.length > 0 ? (
                    <CSVLink data={reportData} headers={headers} filename="reports.csv">
                      <button
                        type="button"
                        title="CSV file"
                        className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={() => handleSVGClick("master")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                      </button>
                    </CSVLink>
                  ) : (
                    "No Reports found"
                  )
                }


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








{/* <td
                className={`px-2 py-2  border border-[#e5e7eb] text-xs font-medium text-center`}
                style={{ maxWidth: "160px" }}
              >
                <div className="flex justify-start gap-5">

                  <button
                    type="button"
                    title="View"
                    className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <Link to='#'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path
                          fill-rule="evenodd"
                          d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </button>

                  <button
                    type="button"
                    title="Edit"
                    className={`inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                  >
                    <Link to='#'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                      </svg>
                    </Link>
                  </button>
                  <button
                    type="button"
                    title="Delete"

                    className={` inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] disabled:opacity-50   dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                </div>
              </td> */}
