import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  useLoaderData,
  useSubmit,
  useNavigation,
  useFetcher,
} from 'react-router-dom';

const AddRoles = () => {
  const submit = useSubmit();
  const data = useLoaderData();
  const navigation = useNavigation();
  const fetcher = useFetcher();
  console.log(data?.response, 'yesss', navigation);
  const getInitialState = () => {
    if (!!data?.response) {
      return {
        role: 'you decide',
        description: 'you decide',
        permissions: [...data?.response],
      };
    } else {
      return {
        role: '',
        description: '',
        permissions: [
          {
            module: 'dashboard',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'user',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'entity',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'meeting',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'task',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'team',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'report',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          {
            module: 'setting',
            all: false,
            create: false,
            read: false,
            update: false,
            delete: false,
          },
          // {
          //   module: 'settings',
          //   all: false,
          //   create: false,
          //   read: false,
          //   update: false,
          //   delete: false,
          //   submenus: [
          //     {
          //       module: 'organizationprofile',
          //       all: false,
          //       create: false,
          //       read: false,
          //       update: false,
          //       delete: false,
          //     },
          //     {
          //       module: 'form',
          //       all: false,
          //       create: false,
          //       read: false,
          //       update: false,
          //       delete: false,
          //     },
          //     {
          //       module: 'communication',
          //       all: false,
          //       create: false,
          //       read: false,
          //       update: false,
          //       delete: false,
          //     },
          //     {
          //       module: 'role',
          //       all: false,
          //       create: false,
          //       read: false,
          //       update: false,
          //       delete: false,
          //     },
          //     {
          //       module: 'integration',
          //       all: false,
          //       create: false,
          //       read: false,
          //       update: false,
          //       delete: false,
          //     },
          //   ],
          // },
        ],
      };
    }
  };
  // submit({ key: 'value' });
  const [permission, setPermission] = useState(() => getInitialState());
  console.log(permission, 'yess perm');
  useEffect(() => {
    console.log('permissions', permission);
  });

  //    for toggle active and inactive
  // const handletoggle = (module, index, subindex) => {
  //   if (subindex == undefined) {
  //     let updatePermission = {
  //       ...permission,
  //       permissions: [...permission.permissions],
  //     };
  //     // [...permission];
  //     let previosvalue = updatePermission.permissions[index][module];
  //     updatePermission.permissions[index][module] = !previosvalue;
  //     setPermission(updatePermission);
  //   }
  //   if (subindex != undefined) {
  //     let updatePermission = {
  //       ...permission,
  //       permissions: [...permission.permissions],
  //     };
  //     // [...permission];
  //     let previosvalue =
  //       updatePermission.permissions[index].submenus[subindex][module];
  //     updatePermission.permissions[index].submenus[subindex][module] =
  //       !previosvalue;
  //     setPermission(updatePermission);
  //   }
  // };

  const handletoggle = (module, index, subindex) => {
    let updatePermission = {
      ...permission,
      permissions: [...permission.permissions],
    };

    if (subindex === undefined) {
      // Toggle the selected permission
      let previosvalue = updatePermission.permissions[index][module];
      updatePermission.permissions[index][module] = !previosvalue;

      // If "All" is toggled, toggle other permissions accordingly
      if (module === 'all') {
        updatePermission.permissions[index].create =
          updatePermission.permissions[index].read =
          updatePermission.permissions[index].update =
          updatePermission.permissions[index].delete =
          updatePermission.permissions[index].all;

        // If there are submenus, update their permissions as well
        if (updatePermission.permissions[index].submenus) {
          updatePermission.permissions[index].submenus.forEach((submenu) => {
            submenu.create =
              submenu.read =
              submenu.update =
              submenu.delete =
              updatePermission.permissions[index].all;
          });
        }
      } else {
        // If any other permission is toggled, check if all permissions are selected, then set "All" to true
        const allSelected = ['create', 'read', 'update', 'delete'].every(
          (permissionType) =>
            updatePermission.permissions[index][permissionType]
        );
        updatePermission.permissions[index].all = allSelected;
      }
    } else {
      // Toggle the selected permission for submenus
      let previosvalue =
        updatePermission.permissions[index].submenus[subindex][module];
      updatePermission.permissions[index].submenus[subindex][module] =
        !previosvalue;

      // If "All" for submenus is toggled, toggle other permissions accordingly
      if (module === 'all') {
        updatePermission.permissions[index].submenus[subindex].create =
          updatePermission.permissions[index].submenus[subindex].read =
          updatePermission.permissions[index].submenus[subindex].update =
          updatePermission.permissions[index].submenus[subindex].delete =
          updatePermission.permissions[index].submenus[subindex].all;
      } else {
        // If any other permission for submenus is toggled, check if all permissions are selected, then set "All" to true
        const allSelected = ['create', 'read', 'update', 'delete'].every(
          (permissionType) =>
            updatePermission.permissions[index].submenus[subindex][
            permissionType
            ]
        );
        updatePermission.permissions[index].submenus[subindex].all =
          allSelected;
      }
    }

    setPermission(updatePermission);
  };

  // for submenu opens
  const [selected, setSelected] = useState();
  const handleSubmenuOpen = (module) => {
    if (selected == module) {
      setSelected('');
    }
    if (selected != module) {
      setSelected(module);
    }
  };

  async function handleSubmit() {




    if (!data?.id) {
      const result = await axios.post(
        'https://atbtmain.teksacademy.com/rbac/create-role',
        { ...permission }
      );
      // Log the result and indicate that a role was added
      console.log(result, 'added');
      // You may want to handle form submission here as well
    }
    if (!!data?.id) {
      const result = await axios.put(
        `https://atbtmain.teksacademy.com/rbac/update-role/${data?.id}`,
        { ...permission }
      );
      // Log the result and indicate that a role was updated
      console.log(result, 'updated');
    }
  }


  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <h1 className='font-semibold text-lg grid1-item'> Add Roles</h1>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-col-2 gap-2 mt-2'>
        <div className='col-span-1 text-start  xl:w-96 '>
          <div>
            <label
              htmlFor='role'
              className='block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900'
            >
              Name
            </label>
            <div className=''>
              <input
                onChange={(e) => {
                  setPermission({
                    ...permission,
                    role: e.target.value,
                  });
                }}
                id='role'
                name='role'
                type='text'
                autoComplete='role'
                required
                className='  p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                placeholder:text-xs'
              />
            </div>
          </div>
        </div>
        <div className='col-span-1 text-start xl:w-96 '>
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium leading-6 mt-4 mb-2 text-gray-900'
            >
              Description
            </label>
            <div className=''>
              <input
                onChange={(e) => {
                  setPermission({
                    ...permission,
                    description: e.target.value,
                  });
                }}
                id='description'
                name='description'
                type='text'
                autoComplete='description'
                required
                className=' p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                placeholder:text-xs '
              />
            </div>
          </div>
        </div>
      </div>
      <p className='text-md my-3 font-semibold'>Permissions</p>
      <div className="max-h-[410px] overflow-y-scroll ">
        <table className=' w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md '>
          <thead className=''>
            <tr>
              <th

                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                Name
              </th>
              <th

                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
              >
                All
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-6 py-2.5 border-l-2 border-gray-200'
                colSpan={4}
              >
                Access
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700 '>
            <tr>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'></td>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                All
              </td>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Create
              </td>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Read
              </td>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Update
              </td>
              <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Delete
              </td>
            </tr>
            {permission &&
              permission.permissions.map((item, index) => {
                return (
                  <>
                    <tr key={item}>
                      <td className='px-6  py-2.5 whitespace-nowrap text-left  text-sm font-semibold  text-gray-800 border-collapse border border-[#e5e7eb]'>
                        {item.module}{' '}
                        {!!item.submenus && (
                          <svg
                            onClick={() => handleSubmenuOpen(item.module)}
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 16 16'
                            fill='currentColor'
                            className='w-4 h-4 mt-1'
                          >
                            <path
                              fill-rule='evenodd'
                              d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z'
                              clip-rule='evenodd'
                            />
                          </svg>
                        )}
                      </td>
                      <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            name='all'
                            value={item.all}
                            className='sr-only peer'
                            checked={item.all}
                            onChange={() => handletoggle('all', index)}
                          />
                          <div
                            className={`w-7 h-4  ${item.all ? 'bg-orange-600' : 'bg-slate-300'
                              } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.create}
                            className='sr-only peer'
                            checked={item.create}
                            onChange={() => handletoggle('create', index)}
                          />
                          <div
                            className={`w-7 h-4  ${item.create ? 'bg-orange-600' : 'bg-slate-300'
                              } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.read}
                            className='sr-only peer'
                            checked={item.read}
                            onChange={() => handletoggle('read', index)}
                          />
                          <div
                            className={`w-7 h-4  ${item.read ? 'bg-orange-600' : 'bg-slate-300'
                              } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.update}
                            className='sr-only peer'
                            checked={item.update}
                            onChange={() => handletoggle('update', index)}
                          />
                          <div
                            className={`w-7 h-4  ${item.update ? 'bg-orange-600' : 'bg-slate-300'
                              } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-6 py-2.5 whitespace-nowrap text-left text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.delete}
                            className='sr-only peer'
                            checked={item.delete}
                            onChange={() => handletoggle('delete', index)}
                          />
                          <div
                            className={`w-7 h-4  ${item.delete ? 'bg-orange-600' : 'bg-slate-300'
                              } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                    </tr>
                    {item.module == selected &&
                      item.submenus.length > 0 &&
                      item.submenus.map((subitem, subindex) => {
                        return (
                          <tr>
                            <td className=' py-2.5 whitespace-nowrap text-left  text-xs   text-gray-800 border-collapse '>
                              {subitem.module}
                            </td>
                            <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs   text-gray-800 border-collapse border border-[#e5e7eb]'>
                              {' '}
                            </td>
                            <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.create}
                                  className='sr-only peer'
                                  checked={subitem.create}
                                  onChange={() =>
                                    handletoggle('create', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${subitem.create
                                    ? 'bg-orange-600'
                                    : 'bg-slate-300'
                                    } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.read}
                                  className='sr-only peer'
                                  checked={subitem.read}
                                  onChange={() =>
                                    handletoggle('read', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${subitem.read
                                    ? 'bg-orange-600'
                                    : 'bg-slate-300'
                                    } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-6 py-2.5 whitespace-nowrap text-left  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.update}
                                  className='sr-only peer'
                                  checked={subitem.update}
                                  onChange={() =>
                                    handletoggle('update', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${subitem.update
                                    ? 'bg-orange-600'
                                    : 'bg-slate-300'
                                    } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-6 py-2.5 whitespace-nowrap text-center  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.delete}
                                  className='sr-only peer'
                                  checked={subitem.delete}
                                  onChange={() =>
                                    handletoggle('delete', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${subitem.delete
                                    ? 'bg-orange-600'
                                    : 'bg-slate-300'
                                    } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                );
              })}
            {/* <div className={item.all ? "w-7 h-4 bg-orange-600 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600" : ""}

            ></div> */}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>
        <button onClick={() => handleSubmit()} className='px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'>Submit</button>
      </div>

    </div>
  );
};

export default AddRoles;
