import React, { useEffect, useState } from "react";
function CustomFilter({
  fieldsDropDownData = {},
  Qparams,
  setQParams,
  customForm,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterableInputsInBox, setFilterableInputsInBox] = useState();
  useEffect(() => {
    const filterableInputsInBox = customForm
      .filter(
        (obj) =>
          obj.filterable &&
          (obj.type === "select" ||
            obj.type === "date" ||
            obj.type === "time" ||
            obj.type === "multiselect")
      )
      .map((obj) => ({
        inputname: obj.inputname,
        label: obj.label,
        type: obj.type,
        ...(obj.options && { options: obj.options }),
      }));
    const filterableInputsInSearch = customForm
      .filter(
        (obj) =>
          obj.filterable &&
          (obj.type === "text" ||
            obj.type === "email" ||
            obj.type === "number" ||
            obj.type === "phonenumber" ||
            obj.type === "textarea")
      )
      .map((obj) => ({
        inputname: obj.inputname,
        label: obj.label,
        type: obj.type,
      }));
    setFilterableInputsInBox(filterableInputsInBox);
  }, [customForm]);
  function handlefilters() {
    setQParams({
      ...Qparams,
      ...selectedFilters,
    });
    setFilterDrawerOpen(!filterDrawerOpen);
  }
  const handleFilterChange = (filterName, selectedValue) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterName]: selectedValue,
    }));
  };
  const handleFilterReset = () => {
    setSelectedFilters({});
    setQParams({
      search: Qparams?.search,
      page: Qparams?.page,
      pageSize: Qparams?.pageSize,
    });
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  const filterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };
  return (
    <>
      <button
        onClick={filterDrawer}
        className="focus:outline-none gap-x-1 px-4  text-sm font-[500] text-gray-500 hover:text-orange-600"
        title="Filter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {/* for filter open */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          filterDrawerOpen ? "" : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      >
        <div
          className="fixed inset-y-0 right-0 w-full md:w-4/12 lg:w-1/5 xl:w-1/5 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out  "
          style={{
            transform: `translateX(${filterDrawerOpen ? "0%" : "100%"})`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className=" bg-gray-100 px-5 py-4 flex justify-between z-[3] ">
            <h5 className="font-[500] "> Filters</h5>
            <button onClick={filterDrawer} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
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
            className="overflow-y-auto px-2 py-2.5 content relative"
            style={{ maxHeight: "calc(100vh - 7rem)" }}
          >
            <div className="text-start px-3 ">
              {/* {filter.label} */}
              {filterableInputsInBox?.map((filter, index) => (
                <div key={index} className="">
                  {!filter.options &&
                    (filter.type === "date" || filter.type === "time") && (
                      <div>
                        <label className="mb-4 text-sm text-[#878a99] font-medium">
                          {filter.label.charAt(0).toUpperCase() +
                            filter.label.slice(1)}
                        </label>
                        <input
                          type={filter.type}
                          id={filter.inputname}
                          name={filter.inputname}
                          className="px-3 py-1 mb-2 text-xs block w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6"
                          onChange={(e) =>
                            handleFilterChange(filter.inputname, e.target.value)
                          }
                          value={selectedFilters[filter.inputname] || ""}
                        />
                      </div>
                    )}
                  {filter.options &&
                    (filter.type === "multiselect" ||
                      filter.type === "select") && (
                      <div>
                        <label className="block text-sm font-medium leading-6 mt-2 text-gray-900">
                          {filter.label.charAt(0).toUpperCase() +
                            filter.label.slice(1)}
                        </label>

                        <div className="relative">
                          <select
                            id={filter.inputname}
                            name={filter.inputname}
                            className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-gray-400 appearance-none"
                            // px-2 py-2 my-2 text-sm w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6
                            onChange={(e) =>
                              handleFilterChange(
                                filter.inputname,
                                e.target.value
                              )
                            }
                            value={selectedFilters[filter.inputname] || ""}
                            style={{
                              fontSize: "0.8rem",
                              color: selectedFilters[filter.inputname]
                                ? "#111827"
                                : "#a1a1aa",
                            }}
                          >
                            <option value="" disabled defaultValue>
                              Select
                            </option>
                            {filter.options &&
                              filter.options.type === "custom" &&
                              filter.options.value &&
                              filter.options.value.map((option, index) => (
                                <option
                                  key={index}
                                  value={option}
                                  style={{ color: "#111827" }}
                                >
                                  {option}
                                </option>
                              ))}
                            {filter.options &&
                              filter.options.type === "predefined" &&
                              filter.options.value &&
                              fieldsDropDownData[filter.options.value]?.map(
                                (option, index) => (
                                  <option
                                    key={index}
                                    value={option.id}
                                    style={{ color: "#111827" }}
                                  >
                                    {option.name}
                                  </option>
                                )
                              )}
                            {/* {item.options.value &&
                            data?.fieldsDropDownData?.role &&
                            data?.fieldsDropDownData?.role.map(
                              (option, index) => (
                                <option key={index} value={option.id}>
                                  {option.name}
                                </option>
                              )
                            )} */}
                          </select>

                          <svg
                            className="w-3 h-3 text-gray-700 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 bg-gray-100 flex justify-between p-3 w-full ">
            <button
              onClick={handleFilterReset}
              className="mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white "
            >
              Clear
            </button>
            <button
              onClick={handlefilters}
              className="mr-3 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomFilter;
