import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
const AllTasks = () => {
  const { id } = useParams();

  return (
    <div className="mt-4">
      <div className="flex overflow-x-auto mb-2">
        <div className={`cursor-pointer px-4 py-1 text-sm  `}>Active</div>

        <div
          className={`cursor-pointer px-4 py-1 text-sm     `}
          //  ${
          //   activeTab === 2 ? "border-b-2 border-orange-600 text-black" : ""
          // }
        >
          Due
        </div>
        <div className={`cursor-pointer px-4 py-1 text-sm  `}>Completed</div>
      </div>

      <>
        <div className="overflow-x-auto">
          <table className="w-full  mt-1 table-auto">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] whitespace-nowrap "
                >
                  Decision Taken
                </th>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb]
                                  whitespace-nowrap"
                >
                  Person Responsible
                </th>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600 border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
                >
                  Date of Board Meeting
                </th>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse  border-[#e5e7eb]
                                  whitespace-nowrap"
                >
                  Board Meeting No.
                </th>

                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="py-2  px-2  text-sm text-white bg-orange-600    border border-collapse border-[#e5e7eb] 
                                  whitespace-nowrap"
                >
                  Updated By User
                </th>
                <th
                  scope="col"
                  className="py-2 px-2  text-sm text-white bg-orange-600   border border-collapse border-[#e5e7eb] whitespace-nowrap"
                >
                  Updated by Admin{" "}
                </th>
              </tr>
            </thead>
            <tbody className=""></tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default AllTasks;
