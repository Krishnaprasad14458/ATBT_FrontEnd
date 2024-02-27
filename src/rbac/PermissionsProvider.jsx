import React, { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';
import { AuthContext } from '../contexts/authContext/authContext';
import { permissionsDb } from '../utils/db';

export const PermissionsContext = createContext();

const handlePermissionsUpdate = async (setPermissions, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch('your_api_endpoint');
    if (!response.ok) {
      throw new Error('Failed to fetch permissions');
    }
    const newPermissions = await response.json();
    setPermissions(newPermissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
  } finally {
    setLoading(false);
  }
};

const PermissionsProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const initialPermissions = authState?.role?.Permissions || [];
  const [permissions, setPermissions] = useState([...initialPermissions]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const socket = io('your_socket_server_url');
    // socket.on('permissionsUpdate', () => handlePermissionsUpdate(setPermissions, setLoading));

    setPermissions(authState?.role?.Permissions);
    return () => {
      // socket.off('permissionsUpdate');
    };
  }, [authState]);

  return (
    <PermissionsContext.Provider value={{ permissions, loading }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;

// export const usePermissions = () => useContext(PermissionsContext);

// import React, { createContext, useEffect, useState } from 'react';
// import faker from '../utils/faker';

// const defaultBehaviour = {
//     isAllowedTo: () => Promise.resolve(false)
// };

// export const PermissionContext = createContext(defaultBehaviour);

// const fetchPermission = async () => {
//     try {
//         console.log("getting permissions")
//         const response = await faker.getPermissions();
//         console.log(response.data?.permissions, "is empty")
//         return response.data?.permissions;
//     } catch (error) {
//         console.error('Error fetching permissions:', error);
//         return []; // Return empty array if there's an error
//     }
// };

// const PermissionProvider = ({ children }) => {
//     const [permissions, setPermissions] = useState(null);

//     const isAllowedTo = async (permission) => {
//         try {
//             if(!permissions || permissions.length === 0){
//             const fetchedPermissions = await fetchPermission();
//             setPermissions(fetchedPermissions);
//             }
//             // Check if the permission is granted in the fetched permissions
//             const isAllowed = permissions.some(p => p.module === permission && p.read);
//             return isAllowed;
//         } catch (error) {
//             console.error('Error checking permission:', error);
//             return false; // Return false if there's an error
//         }
//     };

//     return (
//         <PermissionContext.Provider
//             value={{
//                 isAllowedTo
//             }}
//         >
//             {children}
//         </PermissionContext.Provider>
//     );
// };

// export default PermissionProvider;

// const defaultBehaviour = {
//     isAllowedTo: () => Promise.resolve(false)
// };

// export const PermissionContext = createContext(defaultBehaviour);

// const fetchPermission = async () => {
//     try {
//         console.log("getting permissions")
//         const response = await faker.getPermissions();
//         console.log(response.data?.permissions, "is empty")
//         setPermissions(response.data?.permissions);
//     } catch (error) {
//         console.error('Error fetching permissions:', error);
//     }
// };

// const PermissionProvider = ({ children }) => {
//     const cache = {};

//     const isAllowedTo = async (permission) => {
//         if (cache.hasOwnProperty(permission)) {
//             return cache[permission];
//         }
//         const isAllowed = await fetchPermission();
//         cache[permission] = isAllowed;
//         return isAllowed;
//     };

//     return (
//     <PermissionContext.Provider
//     value={{
//         isAllowedTo
//     }}
//     >
//         {children}
//     </PermissionContext.Provider>
//     )
// };

// export default PermissionProvider;

// const defaultBehaviour = {
//     isAllowedTo: () => Promise.resolve(false)
// };

// export const PermissionContext = createContext(defaultBehaviour);

// const PermissionProvider = ({ children }) => {
//     const [permissions, setPermissions] = useState([]);

//     // console.log(permissions, "permissions")

//     useEffect(() => {
//         // Fetch permissions from fake API
//         const fetchPermissions = async () => {
//             try {
//                 console.log("getting permissions")
//                 const response = await faker.getPermissions();
//                 console.log(response.data?.permissions, "is empty")
//                 setPermissions(response.data?.permissions);
//             } catch (error) {
//                 console.error('Error fetching permissions:', error);
//             }
//         };

//         fetchPermissions();
//     }, []);

//     const cache = {};

//     const isAllowedTo = async (module, action) => {
//         console.log(permissions, "why false")
//         const permission = permissions?.find(perm => perm.module === module);
//         if (!permission) return false;
//         return permission[action];
//     };

//     return (
//         <PermissionContext.Provider
//             value={{
//                 isAllowedTo
//             }}
//         >
//             {children}
//         </PermissionContext.Provider>
//     );
// };

// export default PermissionProvider;
