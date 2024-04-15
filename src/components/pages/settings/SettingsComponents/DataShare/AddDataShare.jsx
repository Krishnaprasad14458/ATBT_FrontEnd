import React, { useEffect, useState } from "react";
import Select from "react-select";
import atbtApi from "../../../../../serviceLayer/interceptor";
import { Link,  } from 'react-router-dom';
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    const [users, entityList] = await Promise.all([
      atbtApi.post(`public/list/user`, {}),
      atbtApi.post(`public/list/entity`),
    ]);

    const combinedResponse = {
      users: users?.data?.users?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
      entities: entityList?.data?.Entites?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    };
    return combinedResponse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
const AddDataShare = () => {
  const data = useLoaderData();
  const [dataShareName, setDataShareName] = useState("")
  const [dataShareDescription, setDataShareDescription] = useState("")
let moduleOptions = [
    { value: "user", label: "user" },
    { value: "entity", label: "entity" },
  ];
  const [module, setModule] = useState("");
  const handleModuleChange = (selected) => {
    setModule(selected);
  };
  const [shareDataofOptions, setShareDataOfOptions] = useState([]);
  useEffect(() => {
    if (module?.value === "user") {
      setShareDataOfOptions(data.users);
      setShareDataOfSelectedOptions([]);
    } else if (module?.value === "entity") {
      setShareDataOfOptions(data.entities);
      setShareDataOfSelectedOptions([]);
    }
  }, [module]);
  const [shareDataOfSelectedOptions, setShareDataOfSelectedOptions] = useState(
    []
  );

  const handleShareDataOf = (selected) => {
    setShareDataOfSelectedOptions(selected);
  };
  const [shareDataWithOptions, setShareDataWithOptions] = useState(data.users);
  const [shareDataWithSelectedOptions, setShareDataWithSelectedOptions] =
    useState({});
  const handleShareDataWith = (selected) => {
    setShareDataWithSelectedOptions(selected);
  };
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (newValue) => {
    setSearchValue(newValue);
  };
  useEffect(() => {
    if (module?.value === "user") {
      let filteredData = data.users.filter(
        (item) =>
          !shareDataOfSelectedOptions.some(
            (filterItem) => filterItem.value === item.value
          )
      );
      setShareDataWithOptions(filteredData);
    }
  }, [shareDataOfSelectedOptions]);
  useEffect(() => {
    if (module?.value === "user") {
      let filteredData = data.users.filter(
        (item) => shareDataWithSelectedOptions.value !== item.value
      );
      setShareDataOfOptions(filteredData);
    }
  }, [shareDataWithSelectedOptions]);
  const handleSubmit = async () => {
    let moduleName = module.value;
    let shareDataOf = shareDataOfSelectedOptions.map((item) => item.value);
    let shareDataWith = shareDataWithSelectedOptions.value;
    let endpoint;
    if (moduleName === "user") {
      endpoint = "access/selected";
   
    } else if (moduleName === "entity") {
      endpoint = "access/entity";
    }
    await toast.promise(
      atbtApi.post(endpoint, { name: dataShareName,
         description: dataShareDescription, selectedUsers: shareDataOf,
            ...(moduleName === "user" ? { selectedUsers: shareDataOf } : { entityIds: shareDataOf }),
             userId: shareDataWithSelectedOptions.value }),
      {
        pending: {
          render() {
            return 'in progress';
          },
        },
        success: {
          render({
            data: {
              data: {message}
            },
          }) {
            return `Data Shared ${message}`;
          },
        },
        error: {
          render({
            data: {
              response: { data },
            },
          }) {
            // When the promise reject, data will contains the error
            return `error: Data share failed`;
            // return <MyErrorComponent message={data.message} />;
          },
        },
      }
    );
    };


  return (
    <div className="p-4 bg-[#f8fafc]">
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:gap-5 gap-y-4">
        <div className="col-span-1 ">
          <label className="block text-sm font-medium leading-6  text-gray-900 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="px-2 py-1.5 text-md block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400  placeholder-small"
            value={dataShareName}
            onChange={(event) => setDataShareName(event.target.value)}
          />
        </div>
        <div className="col-span-1 ">
          <label className="block text-sm font-medium leading-6  text-gray-900 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter Description"
            className="px-2 py-1.5 text-md block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder-small"
            value={dataShareDescription}
            onChange={(event) => setDataShareDescription(event.target.value)} />

        </div>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  gap-5 mt-2 ">
        <div className="col-span-1">
          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="col-span-1">
              <label className=" block text-sm font-medium leading-6 mt-2  text-gray-900 mb-1">
                Share data of
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5 gap-y-5">
            <div className="col-span-1">
              <Select
                options={moduleOptions}
                className="custom-select"


                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f8fafb", // Change the background color of the select input
                    borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small", // Adjust the font size of the placeholder text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? "#fff" : "#000000",
                    backgroundColor: state.isFocused
                      ? "#ea580c"
                      : "transparent",

                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#ea580c",
                    },
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,

                    primary: "#fb923c",
                  },
                })}

                value={module}
                onChange={handleModuleChange}
              />

            </div>
            <div className="col-span-2">
              <Select

                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb", // Change the background color of the select input
                    borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small", // Adjust the font size of the placeholder text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? "#fff" : "#000000",
                    backgroundColor: state.isFocused
                      ? "#ea580c"
                      : "transparent",

                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#ea580c",
                    },
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,

                    primary: "#fb923c",
                  },
                })}
                isMulti
                name="colors"
                options={shareDataofOptions}
                className="basic-multi-select "
                classNamePrefix="select"
                value={shareDataOfSelectedOptions}
                onChange={handleShareDataOf}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="lg:gap-5 gap-y-5 ">
            <div className="col-span-1">
              <label className=" block text-sm font-medium leading-6 lg:mt-2 text-gray-900 mb-1">
                Share data with
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5 gap-y-5 ">
            <div className="col-span-1">
              <div className="px-2 py-1.5  block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400">
                <span className="text-md"> User</span>
              </div>
            </div>
            <div className="col-span-2">
              <Select
                options={shareDataWithOptions}

                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb", // Change the background color of the select input
                    borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small", // Adjust the font size of the placeholder text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? "#fff" : "#000000",
                    backgroundColor: state.isFocused
                      ? "#ea580c"
                      : "transparent",

                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#ea580c",
                    },
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,

                    primary: "#fb923c",
                  },
                })}
                value={shareDataWithSelectedOptions}
                onChange={handleShareDataWith}
              />
            </div>
          </div>
        </div>
      </div>
     
      <div className="flex justify-end ">
      <Link to="/settings/datashare">
        <button
          className="mt-4 px-3 py-2  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white "
          onClick={handleSubmit}
        >
          Save
        </button>
        </Link>
      </div>
    
   
    </div>
  );
};
export default AddDataShare;
