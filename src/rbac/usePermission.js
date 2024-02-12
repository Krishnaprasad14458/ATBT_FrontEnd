// usePermission.js
import { useContext, useState, useEffect } from 'react';
import { PermissionContext } from './PermissionProvider';

const usePermission = (module, action) => {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    const { isAllowedTo } = useContext(PermissionContext);

    useEffect(() => {
        isAllowedTo(module, action).then((allowed) => {
            setLoading(false);
            setAllowed(allowed);
        });
    }, [module, action, isAllowedTo]);

    return [loading, allowed];
};

export default usePermission;





// import { useContext, useState } from 'react';
// import { PermissionContext } from './PermissionProvider';

// const usePermission = (permission) => {
//     const [loading, setLoading] = useState(true);
//     const [allowed, setAllowed] = useState();

//     const { isAllowedTo } = useContext(PermissionContext);

//     isAllowedTo(permission).then((allowed) => {
//         setLoading(false);
//         setAllowed(allowed);
//     })
//     return [loading, allowed]
// }

// export default usePermission;