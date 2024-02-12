import React, { createContext, useEffect, useState } from 'react';
import faker from '../utils/faker';

const defaultBehaviour = {
    isAllowedTo: () => Promise.resolve(false)
};

export const PermissionContext = createContext(defaultBehaviour);

const PermissionProvider = ({ children }) => {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        // Fetch permissions from fake API
        const fetchPermissions = async () => {
            try {
                const response = await faker.getPermissions();
                setPermissions(response.data.permissions);
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        };

        fetchPermissions();
    }, []);

    // const permissions = [
    //     {
    //         module:"dashboard",
    //         all: false,
    //         create: false,
    //         read: true,
    //         update: false,
    //         delete: false
    //     },
    //     {
    //        module:"user",
    //        all: false,
    //        create: true,
    //        read: true,
    //        update: false,
    //        delete: false
    //     },
    //     {
    //        module:"entity",
    //        all: false,
    //        create: false,
    //        read: true,
    //        update: false,
    //        delete: false
    //     },
    //     {
    //         module:"meeting",
    //         all: false,
    //         create: false,
    //         read: false,
    //         update: false,
    //         delete: false
    //     },
    //     {
    //         module:"task",
    //         all: false,
    //         create: false,
    //         read: false,
    //         update: false,
    //         delete: false
    //     },
    //     {
    //         module:"team",
    //         all: false,
    //         create: true,
    //         read: true,
    //         update: false,
    //         delete: false
    //     },
    //     {
    //         module:"report",
    //         all: false,
    //         create: false,
    //         read: true,
    //         update: false,
    //         delete: false
    //     },
    //     {
    //         module:"setting",
    //         all: false,
    //         create: false,
    //         read: true,
    //         update: false,
    //         delete: false
    //     }   
    // ]
    const cache = {};

    const isAllowedTo = async (module, action) => {
        const permission = permissions.find(perm => perm.module === module);
        if (!permission) return false;
        return permission[action];
    };

    return (
        <PermissionContext.Provider
            value={{
                isAllowedTo
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;






// import React from 'react';
// import { createContext } from 'react';

// const defaultBehaviour = {
//     isAllowedTo: () => Promise.resolve(false)
// };

// export const PermissionContext = createContext(defaultBehaviour);

// const PermissionProvider = ({ fetchPermission, children }) => {
//     const cache = {};

//     const isAllowedTo = async (permission) => {
//         if (cache.hasOwnProperty(permission)) {
//             return cache[permission];
//         }
//         const isAllowed = await fetchPermission(permission);
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
