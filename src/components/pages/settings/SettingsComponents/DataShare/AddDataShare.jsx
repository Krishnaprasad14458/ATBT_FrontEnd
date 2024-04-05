import React, { useState } from "react";
import Select from "react-select";
import atbtApi from '../../../../../serviceLayer/interceptor';

import { useLoaderData } from "react-router-dom";
export async function loader({ request, params }) {
    try {
        let url = new URL(request.url);
        const [users, entityList] = await Promise.all([
            atbtApi.post(`user/list${url?.search ? url?.search : ''}`, {}),
            atbtApi.post(`public/list/entity`),
        ]);

        const combinedResponse = {
            users: users?.data?.users?.map((item) => ({ value: item.id, label: item.name })),
            entities: entityList?.data?.Entites?.map((item) => ({ value: item.id, label: item.name })),
        };
        return combinedResponse;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}
const AddDataShare = () => {
    const data = useLoaderData();
    console.log("dataa", data)
    const [selectedOptions, setSelectedOptions] = useState([]);
    let userOptions = data.users
    let entityOptions = data.entities

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };
    console.log("selectedOptions", selectedOptions);
    return (
        <div className=" p-4 bg-[#f8fafc]">
            <div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 ">
                <div className="col-span-1 ">
                    <label className=" block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                    />
                </div>
                <div className="col-span-1 ">
                    <label className=" block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1">
                        Description
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Description"
                        className="px-2 py-2 text-sm block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400 placeholder:text-xs"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-2 ">
                <div className="col-span-1 ">
                    <div className="grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
                        <div className="col-span-1">
                            <label className=" block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1">
                                Share data of
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
                        <div className="col-span-1">
                            <Select
                                options={userOptions}
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: state.isFocused ? "#FFFFFF" : "#000000", // Change text color based on focus
                                        backgroundColor: state.isFocused
                                            ? "#ea580c"
                                            : "transparent", // Change background color based on focus
                                        "&:hover": {
                                            color: "#FFFFFF", // Change text color on hover
                                            backgroundColor: "#ea580c", // Change background color on hover
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
                            />
                        </div>
                        <div className="col-span-2">
                            <Select
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: state.isFocused ? "#FFFFFF" : "#000000", // Change text color based on focus
                                        backgroundColor: state.isFocused
                                            ? "#ea580c"
                                            : "transparent", // Change background color based on focus
                                        "&:hover": {
                                            color: "#FFFFFF", // Change text color on hover
                                            backgroundColor: "#ea580c", // Change background color on hover
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
                                options={userOptions}
                                className="basic-multi-select "
                                classNamePrefix="select"
                                value={selectedOptions}
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 ">
                    <div className="grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
                        <div className="col-span-1">
                            <label className=" block text-sm font-medium leading-6 mt-2 text-gray-900 mb-1">
                                Share data with
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-3  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
                        <div className="col-span-1">
                            <div className="px-2 py-1.5  block w-full rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-orange-400">
                                <span className="text-sm"> User</span>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Select
                                options={userOptions}
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: state.isFocused ? "#FFFFFF" : "#000000", // Change text color based on focus
                                        backgroundColor: state.isFocused
                                            ? "#ea580c"
                                            : "transparent", // Change background color based on focus
                                        "&:hover": {
                                            color: "#FFFFFF", // Change text color on hover
                                            backgroundColor: "#ea580c", // Change background color on hover
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
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end ">
                <button className="mt-4 px-3 py-2  whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white ">
                    Save
                </button>
            </div>
        </div>
    );
};
export default AddDataShare;
