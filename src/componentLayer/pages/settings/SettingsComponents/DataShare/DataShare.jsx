import { React, useEffect, useState, useContext } from "react";
import { Link, useLoaderData,  useFetcher, } from "react-router-dom";
import atbtApi from "../../../../../serviceLayer/interceptor";
import Swal from 'sweetalert2';

export async function DataShareloader() {
  try {
    const [dataShare] = await Promise.all([atbtApi.get(`access/view`)]);
    const combinedResponse = {
      dataShareList: dataShare.data,
    };
    console.log("combinedResponse", combinedResponse);
    return combinedResponse;
  } catch (error) {
    throw error;
  }
}
export async function DataShareDeleteAction({ request, params }) {
  switch (request.method) {
    case 'DELETE': {
      const id = (await request.json()) || null;
      console.log(id, 'json', id);
      return await atbtApi.delete(`access/remove/${id}`);
    }
    default: {
      throw new Response('', { status: 405 });
    }
  }
}
const DataShare = () => {
  const data = useLoaderData();
  let fetcher = useFetcher();
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Data Share!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#fff',
      confirmButtonText: 'Delete',
      customClass: {
        popup: 'custom-swal2-popup',
        title: 'custom-swal2-title',
        content: 'custom-swal2-content',
      },

    });

    if (confirmDelete.isConfirmed) {
      try {
        // const result = await deleteUser(id);
        fetcher.submit(id, { method: 'DELETE', encType: 'application/json' });
      } catch (error) {
        Swal.fire('Error', 'Unable to delete  data share 🤯', 'error');
      }
    }


  };
  console.log("datay", data);
  return (
    <div className=" p-3 bg-[#f8fafc] overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-3 gap-2 mt-2">
        <h1 className="font-semibold text-lg grid1-item">Data Share</h1>
        <div className="grid1-item  text-start">
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
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-10 text-sm border-2 border-gray-200  rounded-2xl bg-gray-50  focus:outline-none "
              placeholder="Search here..."
              required
              // onChange={(event) => {
              //   console.log(event.target.value);
              //   params(`search=${event.target.value}`);
              // }}
              // onChange={handleSearch}
            />
          </div>
        </div>
        <div className="grid1-item  sm:text-start md:text-end lg:text-end xl:text-end flex justify-end">
          <Link to="adddatashare">
            <button className="mt-1 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 "
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Add
            </button>
          </Link>
        </div>
      </div>
      {/* table */}
      <div className="mt-8">
        <div className="max-h-[457px] overflow-y-scroll">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
            <thead>
              <tr>
                {/* <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Id
                </th> */}
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Name
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Description
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Data of Users
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Data of Entities
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                  Shared with
                </th>
                <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200 ">
                  Actions{" "}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data?.dataShareList?.map(
                (data, index) =>
                  data.id !== 1 && (
                    <tr key={index}>
                      {/* <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ maxWidth: "3rem" }}
                        title={data.id}
                      >
                        {data.id}
                      </td> */}
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ width: "15rem" }}
                        title={data.name}
                      >
                        {data.name}
                      </td>
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden `}
                        style={{ width: "32rem" }}
                        title={data.description}
                      >
                        {data.description}
                      </td>
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ width: "15rem" }}
                        title=""
                      >
                        {data.selectedUsersNames ? 
                          data.selectedUsersNames.join(", ") : "No Data Shared"}
                      </td>
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ width: "15rem" }}
                        title=""
                      >
                        {data.entityNames ? data.entityNames.join(", ") : "No Data Shared"}
                      </td>
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ width: "15rem" }}
                        title=""
                      >
                      
                        {data.userName}
                      </td>
                      <td
                        className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium  overflow-hidden`}
                        style={{ maxWidth: "3rem" }}
                        title=""
                      >
                        <div className="flex justify-start gap-3 cursor-pointer">
                         
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-5 h-5"
                            onClick={()=>handleDelete(data.id)}
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataShare;
