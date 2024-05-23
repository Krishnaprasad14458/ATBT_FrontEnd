import React, { useState } from "react";
import axios from "axios";
function CustomColumn({ tableView, setTableView, form }) {
  console.log(tableView, "custom tableView");
  const [dupTableView, setDupTableView] = useState(tableView);
  console.log(tableView, dupTableView, "tdv");
  const handleColumnsCheckboxChange = (columnName) => {
    setDupTableView((prevColumns) => ({
      ...prevColumns,
      [columnName]: {
        ...prevColumns[columnName],
        value: !prevColumns[columnName].value,
      },
    }));
  };
  const [columnsDrawerOpen, setColumnsDrawerOpen] = useState(false);
  const columnsDrawer = () => {
    setColumnsDrawerOpen(!columnsDrawerOpen);
  };
  const handleColumnsApply = () => {
    setTableView(dupTableView);
    return columnsDrawer();
  };
  const handleColumnsSave = () => {
    if (true) {
      try {
        axios
          .put(
            `https://atbtbeta.infozit.com/form/tableUpdate?name=${form}`,
            dupTableView
          )
          .then((response) => {
            console.log("Update successful:", response.data);
            axios
              .get(`https://atbtbeta.infozit.com/form/list?name=${form}`)
              .then((response) => {
                setTableView(response.data.Tableview);
                setDupTableView(response.data.Tableview);
              })
              .catch((error) => {
                throw new Error("Error fetching data:", error);
              });
          })
          .catch((error) => {
            throw new Error("Error fetching data:", error);
          });
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
    return columnsDrawer();
  };
  return (
    <>
      <button
        onClick={columnsDrawer}
        className=" focus:outline-none gap-x-1 px-4  text-sm font-[500] text-gray-500 hover:text-orange-600"
        title="Columns"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path d="M14 17h2.75A2.25 2.25 0 0 0 19 14.75v-9.5A2.25 2.25 0 0 0 16.75 3H14v14ZM12.5 3h-5v14h5V3ZM3.25 3H6v14H3.25A2.25 2.25 0 0 1 1 14.75v-9.5A2.25 2.25 0 0 1 3.25 3Z" />
        </svg>
      </button>
      {/* for coloumns open */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          columnsDrawerOpen ? "" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        <div
          className="fixed inset-y-0 right-0 w-full md:w-4/12 lg:w-1/5 xl:w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out "
          style={{
            transform: `translateX(${columnsDrawerOpen ? "0%" : "100%"})`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className=" bg-gray-100 px-5 py-4 flex justify-between z-[3] ">
            <h5 className="font-[500]">Columns</h5>
            <button onClick={columnsDrawer} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="overflow-y-auto px-4 py-2.5 content relative"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
          >
            {dupTableView &&
              Object.keys(dupTableView).map((columnName) => (
                <div key={columnName} className=" text-start ">
                  <input
                    className={`${
                      dupTableView[columnName].value
                        ? "bg-gray-100 text-gray-700 hover:text-black"
                        : "text-gray-700 bg-gray-100 hover:text-black"
                    } appearance-none border border-gray-300 hover:border-gray-900 checked:hover:border-white rounded-md checked:bg-orange-600 checked:border-transparent w-4 h-4 cursor-pointer hover:text-black absolute mt-1`}
                    type="checkbox"
                    id={columnName}
                    checked={dupTableView[columnName].value}
                    onChange={() => handleColumnsCheckboxChange(columnName)}
                  />
                  <label
                    htmlFor={columnName}
                    className="cursor-pointer text-md py-1 ms-6 w-3/4 truncate "
                    title={dupTableView[columnName].label}
                  >
                    {dupTableView[columnName].label}
                  </label>
                </div>
              ))}
          </div>
          <div className="absolute bottom-0 bg-gray-100 flex justify-between p-3 w-full ">
            <button
              className="px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white "
              onClick={handleColumnsApply}
            >
              Apply
            </button>
            {true && (
              <button
                className="px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white"
                onClick={handleColumnsSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomColumn;
