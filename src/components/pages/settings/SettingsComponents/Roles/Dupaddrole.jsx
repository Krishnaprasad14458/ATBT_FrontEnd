import React, { useEffect, useState } from 'react'

const Dupaddrole = () => {
    const [permission, setPermission] = useState(
        [{
            name: "user", all: false, create: false, read: false, update: false, delete: false, submenu: [{
                name: "createuser", all: false, create: false, read: false, update: false, delete: false
            }, {
                name: "user Details", all: false, create: false, read: false, update: false, delete: false
            }]
        }, {
            name: "task", all: false, create: false, read: false, update: false, delete: false, submenu: [{
                name: "createtask", all: false, create: false, read: false, update: false, delete: false
            }, {
                name: "Task Details", all: false, create: false, read: false, update: false, delete: false
            }]
        }, {
            name: "Board Meeting", all: false, create: false, read: false, update: false, delete: false, submenu: [{
                name: "create Board Meeting", all: false, create: false, read: false, update: false, delete: false
            }, {
                name: "Board Meeting Details", all: false, create: false, read: false, update: false, delete: false
            }]
        }]
    )

    return (
        <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse border border-[#e5e7eb] rounded-md ">
            <thead className='sticky top-0 z-10'>
                <tr>
                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb] ">Name</th>
                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb]">All</th>
                    <th scope="col" className="px-6 py-2 text-center text-sm  text-white bg-orange-600 border-collapse border border-[#e5e7eb]" colSpan={4}>Access</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                <tr>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"></td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > All</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Create</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Read</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Update</td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]" > Delete</td>
                </tr>
            </tbody>
            <thead>
                {permission && permission.map((item, index) => (
                    <tr key={item}>
                        <td className="px-6 flex py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]"> {item.name}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mt-1">
                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg></td>
                        <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="all" value={item.all}
                                />
                                <div className="bg-orange-600peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600                              " ></div>

                            </label>
                        </td>
                        <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="all" value={item.create}
                                />
                                <div className="bg-orange-600peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600

                               " ></div>

                            </label>
                        </td>
                        <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="all" value={item.read}
                                />
                                <div className="bg-orange-600peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600

                               " ></div>

                            </label>
                        </td>
                        <td className="px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="all" value={item.update}
                                />
                                <div className="bg-orange-600peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600

                               " ></div>

                            </label>
                        </td>
                    </tr>

                )

                )}
            </thead>
        </table>
    )
}



export default Dupaddrole