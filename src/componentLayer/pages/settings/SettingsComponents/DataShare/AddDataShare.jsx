import React, { useEffect, useState } from "react";
import Select from "react-select";
import atbtApi from "../../../../../serviceLayer/interceptor";
import { Link, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader({ request, params }) {
  try {
    const [users, entityList] = await Promise.all([
      atbtApi.post(`public/list/user`, {}),
      atbtApi.post(`public/list/entity`),
    ]);
    console.log("Loader users", users);
    const combinedResponse = {
      users: users?.data?.users?.map((item) => ({
        value: item.id,
        label: item.name,
        entityId: parseInt(item.EntityId),
      })),
      entities: entityList?.data?.Entites?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    };
    console.log("combinedResponse add data share", combinedResponse);
    return combinedResponse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

const AddDataShare = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const [dataShareName, setDataShareName] = useState(""); // name
  const [dataShareDescription, setDataShareDescription] = useState(""); // description
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [shareUsersDataOfOptions, setShareUsersDataOfOptions] = useState([]);
  const [selectedDataShareofUsers, setSelectedDataShareofUsers] = useState([]);
useEffect(()=>{
  setShareUsersDataOfOptions([])
  setSelectedDataShareofUsers([])
},[selectedUser])
  const handleValidationsErrors = () => {
    let isErrorsPresent = false;
    const newErrors = {};

    if (dataShareName.length === 0) {
      newErrors.dataShareName = "Name is Required";
      isErrorsPresent = true;
    } else if (dataShareName.length < 3) {
      newErrors.dataShareName = "Name should be greater than 3 characters";
      isErrorsPresent = true;
    }

    if (selectedDataShareofUsers.length === 0) {
      newErrors.selectedDataShareofUsers = "Select at least one user";
      isErrorsPresent = true;
    }

    setErrors(newErrors);
    return isErrorsPresent;
  };

  useEffect(() => {
    if (saveButtonClicked) {
      handleValidationsErrors();
    }
  }, [dataShareName, selectedDataShareofUsers]);

  const handleSubmit = async () => {
    setSaveButtonClicked(true);
    if (!handleValidationsErrors()) {
      let moduleName = "user";
      let endpoint ="access/selected";;
      // if (moduleName === "user") {
      //   endpoint = "access/selected";
      // } else if (moduleName === "entity") {
      //   endpoint = "access/entity";
      // }
      await toast.promise(
        atbtApi.post(endpoint, {
          name: dataShareName,
          description: dataShareDescription,
          ...(moduleName === "user"
            ? {
                selectedUsers: selectedDataShareofUsers.map(
                  (item) => item.value
                ),
                selectedUsersNames: JSON.stringify(
                  selectedDataShareofUsers.map((item) => item.label)
                ),
              }
            : {
                entityIds: selectedDataShareofUsers.map((item) => item.value),
                entityNames: JSON.stringify(
                  selectedDataShareofUsers.map((item) => item.label)
                ),
              }),
          userId: selectedUser.value,
          userName: selectedUser.label,
        }),
        {
          pending: "In progress...",
          success: {
            render({ data: { message } }) {
              navigate("/settings/datashare");
              return `Data Shared Successfully`;
            },
          },
          error: {
            render({ data }) {
              return `Error: Data share failed`;
            },
          },
        }
      );
    }
  };

  const handleShareDataWith = (selected) => {
    setSelectedUser(selected);
  };

  const handleShareDataOf = (selected) => {
    console.log("selectedDataShareofUsers", selected);
    setSelectedDataShareofUsers(selected);
  };

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const response = await atbtApi.post(
          `entity/User/list/${selectedUser?.entityId}`
        );
        let UsersList = response?.data
          .map((item) => ({
            value: item.id,
            label: item.name,
          }))
          .filter((item) => item.value !== selectedUser.value);
        console.log("UsersList", UsersList);
        setShareUsersDataOfOptions(UsersList);
      } catch (error) {
        console.error("Error fetching users list:", error);
      }
    };

    if (selectedUser && selectedUser?.entityId) {
      fetchUsersList();
    }
  }, [selectedUser]);

  console.log("selectedUser", selectedUser, selectedDataShareofUsers);

  return (
    <div className="p-4 bg-[#f8fafc]">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:gap-5 gap-y-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="px-2 py-1.5 text-md block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
            value={dataShareName}
            onChange={(event) => setDataShareName(event.target.value)}
          />
          <div className="h-2 text-red-500 text-xs">
            {errors.dataShareName}
          </div>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter Description"
            className="px-2 py-1.5 text-md block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
            value={dataShareDescription}
            onChange={(event) => setDataShareDescription(event.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-2">
        <div className="col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="col-span-1">
              <label className="block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1">
                Share data with <span className="text-red-600">*</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5 gap-y-5">
            <div className="col-span-1">
              <div className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400">
                <span className="text-md">User</span>
              </div>
            </div>
            <div className="col-span-2">
              <Select
                options={data?.users}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb",
                    borderWidth: state.isFocused ? "1px" : "1px",
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small",
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
                value={selectedUser}
                onChange={handleShareDataWith}
              />
              <div className="h-2 text-red-500 text-xs">
                {/* {errors.selectedDataShareofUsers} */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="lg:gap-5 gap-y-5">
            <div className="col-span-1">
              <label className="block text-sm font-medium leading-6 lg:mt-2 text-gray-900 mb-1">
                Share data of
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 lg:gap-5 gap-y-5">
            <div className="col-span-1">
              <div className="px-2 py-1.5 block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400">
                <span className="text-md">User</span>
              </div>
            </div>
            <div className="col-span-2">
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb",
                    borderWidth: state.isFocused ? "1px" : "1px",
                    borderColor: state.isFocused ? "#orange-400" : "#d1d5db",
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "small",
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
                options={shareUsersDataOfOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedDataShareofUsers}
                onChange={handleShareDataOf}
              />
              <div className="h-2 text-red-500 text-xs">
                {errors.selectedDataShareofUsers}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Link to="/settings/datashare/">
          <button className="mt-4 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white">
            Back
          </button>
        </Link>
        <button
          className="mt-4 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddDataShare;
