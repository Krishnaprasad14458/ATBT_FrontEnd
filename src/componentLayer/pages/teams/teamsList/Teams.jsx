import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Swal from "sweetalert2";
import GateKeeper from "../../../../rbac/GateKeeper";
import { debounce, caseLetter } from "../../../../utils/utils";
import CustomColumn from "../../../../componentLayer/components/tableCustomization/CustomColumn";
import CustomFilter from "../../../../componentLayer/components/tableCustomization/CustomFilter";
import atbtApi from "../../../../serviceLayer/interceptor";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import { PermissionsContext } from "../../../../rbac/PermissionsProvider";
const userData = JSON.parse(localStorage.getItem("data"));

export async function TeamsLoader({ request, params }) {
  try {
    let url = new URL(request.url);
    const [teams, teamFormData] = await Promise.all([
      atbtApi.post(`team/list${url?.search ? url?.search : ""}`, {}),
      atbtApi.get(`form/list?name=teamform`),
    ]);
    console.log(teams, teamFormData, "team data");
    const combinedResponse = {
      teams: teams?.data,
      tableViewData: teamFormData?.data?.Tableview,
      customForm: teamFormData?.data?.Data,
    };
    console.log(combinedResponse, "teams response", request, params);
    return combinedResponse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
export async function TeamsAction({ request, params }) {
  switch (request.method) {
    case "DELETE": {
      const id = (await request.json()) || null;
      console.log(id, "json", id);
      return await atbtApi.delete(`team/delete/${id}`);
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}
function Teams() {
  const { permissions, loading } = useContext(PermissionsContext);

  document.title = "ATBT | Team";
  const navigation = useNavigation();
  let submit = useSubmit();
  let fetcher = useFetcher();
  const data = useLoaderData();
  const { teams, tableViewData, customForm } = data;
  const [Qparams, setQParams] = useState({
    search: "",
    page: 1,
    pageSize: 10,
  });
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    debouncedParams(Qparams);
  }, [Qparams]);
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: "get", action: "." });
    }, 500),
    []
  );
  console.log("Qparams", Qparams);
  function handleSearch(event) {
    setQParams({
      ...Qparams,
      search: event.target.value,
    });
  }
  function handlePage(page) {
    setQParams({
      ...Qparams,
      page,
    });
  }
  const handlePerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(selectedValue, "sv");
    setQParams({
      ...Qparams,
      page: 1,
      pageSize: selectedValue,
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(".");
    }
  }, [fetcher, navigation]);
  const handleDeleteTeam = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#fff",
      confirmButtonText: "Delete",
      customClass: {
        popup: "custom-swal2-popup",
        title: "custom-swal2-title",
        content: "custom-swal2-content",
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        fetcher.submit(id, { method: "DELETE", encType: "application/json" });
      } catch (error) {
        Swal.fire("Error", "Unable to delete team 🤯", "error");
      }
    }
  };
  const [tableView, setTableView] = useState(tableViewData);
  const [visibleColumns, setvisibleColumns] = useState();
  useEffect(() => {
    let visibleColumns = Object.keys(tableView || {}).filter(
      (key) => tableView[key]?.value
    );
    setvisibleColumns(visibleColumns);
  }, [tableView]);
  function formatTime(timeString) {
    const [hourStr, minuteStr] = timeString.split(":");
    const hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    if (isNaN(hours) || isNaN(minutes)) {
      return "Invalid time";
    }
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Handles midnight
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Ensures minutes are two digits
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  }
  return (
    <div className="overflow-x-auto p-3">
      {/* search & filter */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2 items-center">
        <h1 className="font-semibold text-lg grid1-item">
          {/* Teams {teams.loading ? "..." : null} */}
          <BreadCrumbs />
        </h1>
        <div className="grid1-item text-start">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center p-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
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
              onChange={handleSearch}
              value={Qparams?.search}
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-8 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none placeholder:text-sm"
              placeholder="Search here..."
              required
            />
          </div>
        </div>
        <div className="grid1-item text-end md:flex md:justify-end filter_pagination">
          <div className="grid1-item text-end flex justify-end filter_pagination divide-x-2 h-7 mt-2">
            <CustomColumn
              tableView={tableView}
              setTableView={setTableView}
              form="teamform"
            />
            <CustomFilter
              Qparams={Qparams}
              setQParams={setQParams}
              customForm={customForm}
            />
          </div>
        </div>
      </div>
      {/* table */}
      <div className="max-h-[457px] overflow-y-auto mt-5">
        {visibleColumns && tableView && teams?.Teams && (
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
            <thead>
              <tr>
                {visibleColumns.map((key) => (
                  <th
                    key={key}
                    className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                  >
                    {tableView[key].label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Total Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  To-Do Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  In-Progress Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Overdue Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Completed Decisions
                </th>
                <th
                  scope="col"
                  className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teams?.Teams &&
                teams?.Teams?.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-100 dark:hover:bg-gray-700"
                  >
                    {visibleColumns.map((key) => {
                      let value = row[key];
                      if (tableView[key].type === "multiselect" && row[key]) {
                        value = row[key].join(", ");
                      }
                      if (tableView[key].type === "time" && row[key]) {
                        value = formatTime(row[key]);
                      }
                      if (tableView[key].type === "date" && row[key]) {
                        value = new Date(row[key]);
                        const day = value.getUTCDate();
                        const monthIndex = value.getUTCMonth();
                        const year = value.getUTCFullYear();

                        const monthAbbreviations = [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ];

                        // Formatting the date
                        value = `${day < 10 ? "0" : ""}${day}-${
                          monthAbbreviations[monthIndex]
                        }-${year}`;
                      }
                      if (key === "name") {
                        let meetingPermission = permissions?.find(
                          (permission) => permission.module === "meeting"
                        );
                        return (
                          <td
                            key={key}
                            className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                            style={{ maxWidth: "160px" }}
                            title={row[key]}
                          >
                            {meetingPermission?.canRead ? (
                              <GateKeeper
                                permissionCheck={(permission) =>
                                  permission.module === "meeting" &&
                                  permission.canRead
                                }
                              >
                                <Link
                                  className="hover:text-orange-500"
                                  to={{
                                    pathname: `${row.id}/teamboardmeetings`,
                                    search: `?search=&page=1&pageSize=10`,
                                  }}
                                >
                                  <p className="truncate text-xs"> {value}</p>
                                </Link>
                              </GateKeeper>
                            ) : (
                              <p className="truncate text-xs"> {value}</p>
                            )}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={key}
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                          style={{ maxWidth: "160px" }}
                          title={row[key]}
                        >
                          <p className="truncate text-xs">
                            {caseLetter(value)}
                          </p>
                        </td>
                      );
                    })}
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ width: "9rem" }}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row?.taskCounts?.totalTaskCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ width: "10rem" }}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row?.taskCounts?.toDoCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row?.taskCounts?.inProgressCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row?.taskCounts?.overDueCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      title=""
                    >
                      <p className="truncate text-xs">
                        {" "}
                        {row?.taskCounts?.completedCount}
                      </p>
                    </td>
                    <td
                      className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                      style={{ width: "8rem" }}
                      title=""
                    >
                      <div className="flex justify-start gap-4">
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "team" && permission.canRead
                          }
                        >
                          <button
                            type="button"
                            title="View"
                            className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <Link to={`${row.id}`}>
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
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "team" && permission.canUpdate
                          }
                        >
                          <button
                            type="button"
                            title="Edit"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <Link to={`${row.id}/edit`}>
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
                        </GateKeeper>
                        <GateKeeper
                          permissionCheck={(permission) =>
                            permission.module === "team" && permission.canDelete
                          }
                        >
                          <button
                            type="button"
                            title="Delete"
                            onClick={() => handleDeleteTeam(row.id)}
                            className=" inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 delete-button"
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
                        </GateKeeper>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* pagination */}
      <div className="inset-x-0 bottom-0 mt-5">
        <div className="md:flex md:justify-between block text-end">
          <div className="">
            {!teams?.Teams || teams?.Teams?.length === 0 ? (
              "no data to show"
            ) : teams.loading ? (
              "Loading..."
            ) : (
              <p className="text-sm text-gray-700">
                Showing {teams.startTeam} to {teams.endTeam} of{" "}
                <span className="text-sm">{teams.totalTeams}</span> teams
              </p>
            )}
          </div>
          <section
            className="isolate inline-flex rounded-md  ms-4 mt-2 md:mt-0"
            aria-label="Pagination"
          >
            <select
              defaultValue="10"
              onChange={handlePerPageChange}
              className="focus:outline-none me-3 gap-x-1.5 rounded-md bg-gray-50 px-1 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
            <button
              disabled={teams.currentPage === 1}
              onClick={() => handlePage(teams?.currentPage - 1)}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                teams.loading
                  ? "cursor-wait"
                  : teams.currentPage === 1
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
            {/* <button className="border w-8 border-gray-300">
              {teams.currentPage}
            </button> */}
            <button
              disabled={teams.currentPage === teams.totalPages}
              onClick={() => handlePage(teams?.currentPage + 1)}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                teams.loading
                  ? "cursor-wait"
                  : teams.currentPage === teams.totalPages
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
  );
}

export default Teams;
