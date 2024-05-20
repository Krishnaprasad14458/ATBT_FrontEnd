import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { EntitiesDataContext } from "../../../contexts/entitiesDataContext/entitiesDataContext";
import axios from "axios";
const Documents = () => {
  const {
    getEntitybyId,
    entitiesState: { entities },
  } = useContext(EntitiesDataContext);
  const { id } = useParams();

  let [customFormField, setCustomFormField] = useState();
  const userData = JSON.parse(localStorage.getItem("data"));
  const token = userData?.token;
  let response;
  let [predefinedImage, setPredefinedImage] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(`https://atbtbeta.infozit.com/entity/list/${id}`, {
  //       headers: {
  //         authorization: token,
  //       },
  //     })
  //     .then((res) => {
  //       // Handle the successful response
  //       response = res;
  //       console.log("response", response.data.image);
  //       setPredefinedImage(response.data.image);
  //       setCustomFormField(response.data.customFieldsData);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   console.log("customFormField", customFormField);
  // }, [customFormField]);
  return (
    <div className="mt-4">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md">
        <thead>
          <tr>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Meeting Id
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Date
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Decision Taken
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Person Responsibile
            </th>
            <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
              Download Attachment
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
              20-05-2024
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
