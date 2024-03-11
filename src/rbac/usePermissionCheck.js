import { useContext } from 'react';
import { PermissionsContext } from './PermissionsProvider';

const usePermissionCheck = (permissionCheck) => {
    const { permissions, loading } = useContext(PermissionsContext);

    const allowed = !loading && permissions?.some(permissionCheck);

    return { allowed, loading };
};

export default usePermissionCheck;

// usePermissionCheck.js
// import { useContext, useState, useEffect } from 'react';
// import PermissionsProvider from './PermissionsProvider';

// const usePermissionCheck = (module, action) => {
//     const [loading, setLoading] = useState(true);
//     const [allowed, setAllowed] = useState(false);

//     // console.log(module, action)

//     const { isAllowedTo } = useContext(PermissionsProvider);

//     console.log(allowed)

//     useEffect(() => {
//         isAllowedTo(module, action).then((allowed) => {
//             setLoading(false);
//             setAllowed(allowed);
//         });
//     }, [module, action, isAllowedTo]);

//     return [loading, allowed];
// };

// export default usePermissionCheck;





// import { useContext, useState } from 'react';
// import { PermissionContext } from './PermissionProvider';

// const usePermissionCheck = (permission) => {
//     const [loading, setLoading] = useState(true);
//     const [allowed, setAllowed] = useState();

//     const { isAllowedTo } = useContext(PermissionContext);

//     isAllowedTo(permission).then((allowed) => {
//         setLoading(false);
//         setAllowed(allowed);
//     })
//     return [loading, allowed]
// }

// export default usePermissionCheck;