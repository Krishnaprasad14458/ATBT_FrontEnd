import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useLoaderData,useSubmit,useNavigation,useFetcher,Link,} from 'react-router-dom';
import { toast } from 'react-toastify';
const AddRoles = () => {
  const submit = useSubmit();
  const response = useLoaderData();
  const navigation = useNavigation();
  const fetcher = useFetcher();
  console.log(response, 'yesss', navigation);
  const getInitialState = () => {
    if (!!response) {
      console.log(response.response, 'data');
      return {
        role: response?.response?.name,
        description: response?.response?.description,
        permissions: [...response?.response.Permissions],
      };
    } else {
      return {
        role: '',
        description: '',
        permissions: [
          {
            module: 'user',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'entity',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'meeting',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'task',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'team',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'report',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          {
            module: 'setting',
            all: false,
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
          },
          // {
          //   module: 'settings',
          //   all: false,
          //   canCreate: false,
          //   canRead: false,
          //   canUpdate: false,
          //   canDelete: false,
          //   submenus: [
          //     {
          //       module: 'organizationprofile',
          //       all: false,
          //       canCreate: false,
          //       canRead: false,
          //       canUpdate: false,
          //       canDelete: false,
          //     },
          //     {
          //       module: 'form',
          //       all: false,
          //       canCreate: false,
          //       canRead: false,
          //       canUpdate: false,
          //       canDelete: false,
          //     },
          //     {
          //       module: 'communication',
          //       all: false,
          //       canCreate: false,
          //       canRead: false,
          //       canUpdate: false,
          //       canDelete: false,
          //     },
          //     {
          //       module: 'role',
          //       all: false,
          //       canCreate: false,
          //       canRead: false,
          //       canUpdate: false,
          //       canDelete: false,
          //     },
          //     {
          //       module: 'integration',
          //       all: false,
          //       canCreate: false,
          //       canRead: false,
          //       canUpdate: false,
          //       canDelete: false,
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
        updatePermission.permissions[index].canCreate =
          updatePermission.permissions[index].canRead =
          updatePermission.permissions[index].canUpdate =
          updatePermission.permissions[index].canDelete =
            updatePermission.permissions[index].all;

        // If there are submenus, canUpdate their permissions as well
        if (updatePermission.permissions[index].submenus) {
          updatePermission.permissions[index].submenus.forEach((submenu) => {
            submenu.canCreate =
              submenu.canRead =
              submenu.canUpdate =
              submenu.canDelete =
                updatePermission.permissions[index].all;
          });
        }
      } else {
        // If any other permission is toggled, check if all permissions are selected, then set "All" to true
        const allSelected = [
          'canCreate',
          'canRead',
          'canUpdate',
          'canDelete',
        ].every(
          (permissionType) =>
            updatePermission.permissions[index][permissionType]
        );
        updatePermission.permissions[index].all = allSelected;

        // If create, update, or delete is true, set read to true and prevent toggling to false
        if (
          updatePermission.permissions[index].canCreate ||
          updatePermission.permissions[index].canUpdate ||
          updatePermission.permissions[index].canDelete
        ) {
          updatePermission.permissions[index].canRead = true;
        }
        if (
          updatePermission.permissions[index].canCreate === true &&
          updatePermission.permissions[index].canUpdate === true &&
          updatePermission.permissions[index].canDelete === true &&
          updatePermission.permissions[index].canRead === true
        ) {
          updatePermission.permissions[index].all = true;
        }
      }
    } else {
      // Toggle the selected permission for submenus
      let previosvalue =
        updatePermission.permissions[index].submenus[subindex][module];
      updatePermission.permissions[index].submenus[subindex][module] =
        !previosvalue;

      // If "All" for submenus is toggled, toggle other permissions accordingly
      if (module === 'all') {
        updatePermission.permissions[index].submenus[subindex].canCreate =
          updatePermission.permissions[index].submenus[subindex].canRead =
          updatePermission.permissions[index].submenus[subindex].canUpdate =
          updatePermission.permissions[index].submenus[subindex].canDelete =
            updatePermission.permissions[index].submenus[subindex].all;
      } else {
        // If any other permission for submenus is toggled, check if all permissions are selected, then set "All" to true
        const allSelected = [
          'canCreate',
          'canRead',
          'canUpdate',
          'canDelete',
        ].every(
          (permissionType) =>
            updatePermission.permissions[index].submenus[subindex][
              permissionType
            ]
        );
        updatePermission.permissions[index].submenus[subindex].all =
          allSelected;

        // If create, update, or delete is true, set read to true and prevent toggling to false
        if (
          updatePermission.permissions[index].submenus[subindex].canCreate ||
          updatePermission.permissions[index].submenus[subindex].canUpdate ||
          updatePermission.permissions[index].submenus[subindex].canDelete
        ) {
          updatePermission.permissions[index].submenus[subindex].canRead = true;
        }

        if (
          updatePermission.permissions[index].submenus[subindex].canCreate ===
            true &&
          updatePermission.permissions[index].submenus[subindex].canUpdate ===
            true &&
          updatePermission.permissions[index].submenus[subindex].canDelete ===
            true &&
          updatePermission.permissions[index].submenus[subindex].canRead ===
            true
        ) {
          updatePermission.permissions[index].submenus[subindex].all = true;
        }
      }
    }

    setPermission(updatePermission);
  };

  // const handletoggle = (module, index, subindex) => {
  //   let updatePermission = {
  //     ...permission,
  //     permissions: [...permission.permissions],
  //   };

  //   if (subindex === undefined) {
  //     // Toggle the selected permission
  //     let previosvalue = updatePermission.permissions[index][module];
  //     updatePermission.permissions[index][module] = !previosvalue;

  //     // If "All" is toggled, toggle other permissions accordingly
  //     if (module === 'all') {
  //       updatePermission.permissions[index].canCreate =
  //         updatePermission.permissions[index].canRead =
  //         updatePermission.permissions[index].canUpdate =
  //         updatePermission.permissions[index].canDelete =
  //           updatePermission.permissions[index].all;

  //       // If there are submenus, canUpdate their permissions as well
  //       if (updatePermission.permissions[index].submenus) {
  //         updatePermission.permissions[index].submenus.forEach((submenu) => {
  //           submenu.canCreate =
  //             submenu.canRead =
  //             submenu.canUpdate =
  //             submenu.canDelete =
  //               updatePermission.permissions[index].all;
  //         });
  //       }
  //     } else {
  //       // If any other permission is toggled, check if all permissions are selected, then set "All" to true
  //       const allSelected = [
  //         'canCreate',
  //         'canRead',
  //         'canUpdate',
  //         'canDelete',
  //       ].every(
  //         (permissionType) =>
  //           updatePermission.permissions[index][permissionType]
  //       );
  //       updatePermission.permissions[index].all = allSelected;
  //     }
  //   } else {
  //     // Toggle the selected permission for submenus
  //     let previosvalue =
  //       updatePermission.permissions[index].submenus[subindex][module];
  //     updatePermission.permissions[index].submenus[subindex][module] =
  //       !previosvalue;

  //     // If "All" for submenus is toggled, toggle other permissions accordingly
  //     if (module === 'all') {
  //       updatePermission.permissions[index].submenus[subindex].canCreate =
  //         updatePermission.permissions[index].submenus[subindex].canRead =
  //         updatePermission.permissions[index].submenus[subindex].canUpdate =
  //         updatePermission.permissions[index].submenus[subindex].canDelete =
  //           updatePermission.permissions[index].submenus[subindex].all;
  //     } else {
  //       // If any other permission for submenus is toggled, check if all permissions are selected, then set "All" to true
  //       const allSelected = [
  //         'canCreate',
  //         'canRead',
  //         'canUpdate',
  //         'canDelete',
  //       ].every(
  //         (permissionType) =>
  //           updatePermission.permissions[index].submenus[subindex][
  //             permissionType
  //           ]
  //       );
  //       updatePermission.permissions[index].submenus[subindex].all =
  //         allSelected;
  //     }
  //   }

  //   setPermission(updatePermission);
  // };

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

  // async function handleSubmit() {
  //   console.log(permission);
  //   if (!response?.response.id) {
  //     const result = await axios.post(
  //       'https://atbtbeta.infozit.com/rbac/create-role',
  //       {
  //         ...permission,
  //       }
  //     );
  //     fetcher.submit('added', { method: 'post' });
  //     console.log(result, 'added');
  //     // You may want to handle form submission here as well
  //   }
  //   if (!!response?.response?.id) {
  //     const result = await axios.put(
  //       `https://atbtbeta.infozit.com/rbac/update-role/${response?.response?.id}`,
  //       // `http://localhost:3000/rbac/update-role/${response?.id}`,
  //       {
  //         ...permission,
  //       }
  //     );
  //     fetcher.submit('updated', { method: 'post' });
  //     console.log(result, 'updated');
  //   }
  // }

  const [error, seterrors] = useState({
    role: '',
    description: '',
  });

  useEffect(() => {
    if (permission.role) {
      seterrors((prev) => ({
        ...prev,
        role: '',
      }));
    } else if (permission.role.length >= 3) {
      seterrors((prev) => ({
        ...prev,
        role: '',
      }));
    }

    if (permission.description) {
      seterrors((prev) => ({
        ...prev,
        description: '',
      }));
    } else if (permission.description.length >= 3) {
      seterrors((prev) => ({
        ...prev,
        description: '',
      }));
    }
  }, [permission.role, permission.description]);

  async function handleSubmit() {
    console.log(permission);
    // here the validation

    if (!permission.role) {
      seterrors((prev) => {
        return {
          ...prev,
          role: 'Role is required',
        };
      });
      return false;
    } else if (permission.role.length < 3) {
      seterrors((prev) => ({
        ...prev,
        role: 'Role must be at least 3 characters',
      }));
      return false;
    }

    if (!permission.description) {
      seterrors((prev) => ({
        ...prev,
        description: 'Description is required',
      }));
      return false;
    } else if (permission.description.length < 3) {
      seterrors((prev) => ({
        ...prev,
        description: 'Description should have atleast 3 characters',
      }));
      return false;
    }

    if (!response?.response.id) {
      const result = await toast.promise(
        axios.post(
          'https://atbtbeta.infozit.com/rbac/create-role',
          // 'http://localhost:3000/rbac/create-role',
          {
            ...permission,
          },
          {
            headers: {
              authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo',
            },
          }
        ),
        {
          pending: 'Creating Role...',
          success: {
            render({ data }) {
              return `${data?.data?.message || 'Role created'}`;
            },
          },
          error: {
            render({
              data: {
                response: { data },
              },
            }) {
              // When the promise reject, data will contains the error
              return `error: ${data || data?.message || ' creating role'}`;
              // return <MyErrorComponent message={data.message} />;
            },
          },
        }
      );

      fetcher.submit('added', { method: 'post' });
      console.log(result, 'added');
      // You may want to handle form submission here as well
    }
    if (!!response?.response?.id) {
      const result = await toast.promise(
        axios.put(
          `https://atbtbeta.infozit.com/rbac/update-role/${response?.response?.id}`,
          {
            ...permission,
          },
          {
            headers: {
              authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo',
            },
          }
        ),
        {
          pending: 'Editing Role...',
          success: {
            render({ data }) {
              return `Role edited`;
            },
          },
          error: 'Opps... unable to edit role 🤯',
        }
      );

      fetcher.submit('updated', { method: 'post' });
      console.log(result, 'updated');
    }
  }

  return (
    <div className=' p-3 bg-[#f8fafc] overflow-hidden'>
      <div className=' grid grid-cols-1 md:grid-cols-2 '>
        <p className='col-span-1 text-xl sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold'>
          {' '}
          Add Roles
        </p>
        <div className='col-span-1 text-end mt-4 sm:mt-0'>
          <Link to='..'>
            <button
              type='submit'
              className='create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
            >
              Back
            </button>
          </Link>
        </div>
      </div>
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
                value={permission.role}
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
                disabled={!!response?.response?.id ? true : false}
                // className='  p-2 block w-full rounded-md bg-gray-50 border-2 border-gray-200 py-1.5 text-gray-900 appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
                // placeholder:text-xs'
                className={` ${
                  !!response?.response?.id
                    ? 'text-[#d4d4d8] bg-gray-50'
                    : 'bg-gray-50 text-gray-900'
                } p-2 block w-full rounded-md  border-2 border-gray-200 py-1.5  appearance-none shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6
placeholder:text-xs`}
              />
              {error.role && error.role.length > 0 && <span>{error.role}</span>}
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
                value={permission.description}
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
              {error.description && error.description.length > 0 && (
                <span>{error.description}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className='text-md my-3 font-semibold'>Permissions</p>
      <div className='max-h-[457px] overflow-y-scroll '>
        <table className='w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-md'>
          <thead className=''>
            <tr>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-5 py-2.5 border-l-2 border-gray-200'
              >
                Name
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-5 py-2.5 border-l-2 border-gray-200'
              >
                All
              </th>
              <th
                scope='col'
                className='sticky top-0 bg-orange-600 text-white text-sm text-left px-5 py-2.5 border-l-2 border-gray-200'
                colSpan={4}
              >
                Access
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-700 '>
            <tr>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-[500] text-gray-800 border-collapse border border-[#e5e7eb]'></td>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-[500] text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                All
              </td>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Create
              </td>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Read
              </td>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Update
              </td>
              <td className='px-5 py-2.5 whitespace-nowrap  text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                {' '}
                Delete
              </td>
            </tr>
            {permission &&
              permission.permissions.map((item, index) => {
                return (
                  <>
                    {/* "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white */}
                    <tr key={item}>
                      <td className='px-5 py-2.5 whitespace-nowrap dark:text-white  text-sm font-semibold  text-gray-900 border-collapse border border-[#e5e7eb]'>
                        {item.module.charAt(0).toUpperCase() +
                          item.module.slice(1)}{' '}
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
                      <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
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
                            className={`w-7 h-4  ${
                              item.all ? 'bg-orange-600' : 'bg-slate-300'
                            } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.canCreate}
                            className='sr-only peer'
                            checked={item.canCreate}
                            onChange={() => handletoggle('canCreate', index)}
                          />
                          <div
                            className={`w-7 h-4  ${
                              item.canCreate ? 'bg-orange-600' : 'bg-slate-300'
                            } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.canRead}
                            className='sr-only peer'
                            checked={item.canRead}
                            onChange={() => handletoggle('canRead', index)}
                          />
                          <div
                            className={`w-7 h-4  ${
                              item.canRead ? 'bg-orange-600' : 'bg-slate-300'
                            } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.canUpdate}
                            className='sr-only peer'
                            checked={item.canUpdate}
                            onChange={() => handletoggle('canUpdate', index)}
                          />
                          <div
                            className={`w-7 h-4  ${
                              item.canUpdate ? 'bg-orange-600' : 'bg-slate-300'
                            } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                          ></div>
                        </label>
                      </td>
                      <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            value={item.canDelete}
                            className='sr-only peer'
                            checked={item.canDelete}
                            onChange={() => handletoggle('canDelete', index)}
                          />
                          <div
                            className={`w-7 h-4  ${
                              item.canDelete ? 'bg-orange-600' : 'bg-slate-300'
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
                            <td className=' py-2.5 whitespace-nowrap text-center  text-xs   text-gray-800 border-collapse '>
                              {subitem.module}
                            </td>
                            <td className='px-5 py-2.5 whitespace-nowrap text-center  text-xs   text-gray-800 border-collapse border border-[#e5e7eb]'>
                              {' '}
                            </td>
                            <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.canCreate}
                                  className='sr-only peer'
                                  checked={subitem.canCreate}
                                  onChange={() =>
                                    handletoggle('canCreate', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${
                                    subitem.canCreate
                                      ? 'bg-orange-600'
                                      : 'bg-slate-300'
                                  } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.canRead}
                                  className='sr-only peer'
                                  checked={subitem.canRead}
                                  onChange={() =>
                                    handletoggle('canRead', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${
                                    subitem.canRead
                                      ? 'bg-orange-600'
                                      : 'bg-slate-300'
                                  } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.canUpdate}
                                  className='sr-only peer'
                                  checked={subitem.canUpdate}
                                  onChange={() =>
                                    handletoggle('canUpdate', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${
                                    subitem.canUpdate
                                      ? 'bg-orange-600'
                                      : 'bg-slate-300'
                                  } peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-orange-600 checked:bg-orange-600`}
                                ></div>
                              </label>
                            </td>
                            <td className='px-5 py-2.5 whitespace-nowrap   text-xs font-medium text-gray-800 border-collapse border border-[#e5e7eb]'>
                              <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                  type='checkbox'
                                  value={subitem.canDelete}
                                  className='sr-only peer'
                                  checked={subitem.canDelete}
                                  onChange={() =>
                                    handletoggle('canDelete', index, subindex)
                                  }
                                />
                                <div
                                  className={`w-7 h-4  ${
                                    subitem.canDelete
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
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-5'>
        <button
          onClick={() => handleSubmit()}
          className='px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddRoles;
