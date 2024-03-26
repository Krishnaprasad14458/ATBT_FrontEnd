import React, { useEffect, useState } from 'react';

function CustomFilter({ fieldsDropDownData, Qparams, setQParams, customForm }) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterableInputsInBox, setFilterableInputsInBox] = useState();

  useEffect(() => {
    const filterableInputsInBox = customForm
      .filter(
        (obj) =>
          obj.filterable &&
          (obj.type === 'select' ||
            obj.type === 'date' ||
            obj.type === 'time' ||
            obj.type === 'multiselect')
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
          (obj.type === 'text' ||
            obj.type === 'email' ||
            obj.type === 'number' ||
            obj.type === 'phonenumber' ||
            obj.type === 'textarea')
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
        className='transition-opacity duration-500 focus:outline-none me-3 gap-x-1.5 mt-1 md:mt-0 rounded-md bg-orange-600 px-4 py-2 text-sm font-[500] text-white shadow-md  hover:shadow-lg'
      >
        Filters
      </button>

      {/* for filter open */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 ${
          filterDrawerOpen ? '' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      >
        <div
          className='fixed inset-y-0 right-0 w-11/12 md:w-4/12 lg:w-1/5 xl:w-w-1/5   bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out h-screen overflow-scroll'
          style={{
            transform: `translateX(${filterDrawerOpen ? '0%' : '100%'})`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div className=' flex justify-between px-5 py-4 bg-gray-100'>
            <h5 className='font-[500] '> Filters</h5>
            <button
              onClick={filterDrawer}
              className=''
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-5 h-5 text-gray-500'
              >
                <path
                  fillRule='evenodd'
                  d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='h-[615px] overflow-auto'>
            <div className='text-start p-3 '>
              {/* {filter.label} */}
              {filterableInputsInBox?.map((filter, index) => (
                <div
                  key={index}
                  className=''
                >
                  {!filter.options &&
                    (filter.type === 'date' || filter.type === 'time') && (
                      <div>
                        <label className='mb-4 text-sm text-[#878a99] font-medium'>
                          {' '}
                          {filter.label.charAt(0).toUpperCase() +
                            filter.label.slice(1)}
                        </label>
                        <input
                          type={filter.type}
                          id={filter.inputname}
                          name={filter.inputname}
                          className='px-3 py-2 my-2 text-xs block w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'
                          onChange={(e) =>
                            handleFilterChange(filter.inputname, e.target.value)
                          }
                          value={selectedFilters[filter.inputname] || ''}
                        />
                      </div>
                    )}
                  {filter.options &&
                    (filter.type === 'multiselect' ||
                      filter.type === 'select') && (
                      <div>
                        <label className='mb-4 text-sm text-[#878a99] font-medium'>
                          {' '}
                          {filter.label.charAt(0).toUpperCase() +
                            filter.label.slice(1)}
                        </label>

                        <select
                          id={filter.inputname}
                          name={filter.inputname}
                          className='px-3 py-2 my-2 text-xs block w-full bg-gray-50 rounded-md text-gray-900 border border-1 border-[#e9ebec] placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-xs sm:leading-6'
                          onChange={(e) =>
                            handleFilterChange(filter.inputname, e.target.value)
                          }
                          value={selectedFilters[filter.inputname] || ''}
                        >
                          <option
                            value=''
                            disabled
                            defaultValue
                          >
                            Please select
                          </option>
                          {filter.options &&
                            filter.options.type === 'custom' &&
                            filter.options.value &&
                            filter.options.value.map((option, index) => (
                              <option
                                key={index}
                                value={option}
                              >
                                {option}
                              </option>
                            ))}
                          {filter.options &&
                            filter.options.type === 'predefined' &&
                            filter.options.value &&
                            fieldsDropDownData[filter.options.value]?.map(
                              (option, index) => (
                                <option
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className='bg-gray-100 flex justify-between px-3 pt-2 pb-1 w-full'>
            <button
              onClick={handleFilterReset}
              className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
            >
              Clear
            </button>
            <button
              onClick={handlefilters}
              className='mr-3 px-3 py-2 inline-flex  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white '
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
