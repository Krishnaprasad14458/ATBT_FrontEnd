// Restricted.js
import React from 'react';
import usePermission from "./usePermission";

const Restricted = ({ module, action, fallback, loadingComponent, children }) => {
    const [loading, allowed] = usePermission(module, action);

    if (loading) {
        return <div>Loading</div>;
    }

    if (allowed) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};

export default Restricted;





// import React from 'react';
// import usePermission from "./usePermission";

// // This component is meant to be used everywhere a restriction based on user permission is needed
// const Restricted = ({to, fallback,loadingComponent, children}) => {

//     // We "connect" to the provider thanks to the PermissionContext
//     const [loading, allowed] = usePermission(to);

//     if(loading){
//         return <>{loadingComponent}</>;
//     }

//     // If the user has that permission, render the children
//     if(allowed){
//         return <>{children}</>;
//     }

//     // Otherwise, render the fallback
//     return <>{fallback}</>;
// };

// export default Restricted;