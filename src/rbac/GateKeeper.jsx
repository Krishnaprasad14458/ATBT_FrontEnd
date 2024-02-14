import React from 'react';
import usePermissionCheck from './usePermissionCheck';

const GateKeeper = ({ permissionCheck, fallback, loadingFallback, children }) => {

  console.log(permissionCheck, "chk pc")
  const { allowed, loading } = usePermissionCheck(permissionCheck);

  if (loading) {
    return loadingFallback || <div>Loading...</div>;
  }
  console.log(allowed, 'chk')
  return allowed ? children : null;
};

export default GateKeeper;


// GateKeeper.js
// import React from 'react';
// import usePermissionCheck from "./usePermissionCheck";

// const GateKeeper = ({ module, action, fallback, loadingComponent, children }) => {
//     const [loading, allowed] = usePermissionCheck(module, action);

//     if (loading) {
//         return <div>Loading</div>;
//     }

//     if (allowed) {
//         return <>{children}</>;
//     }

//     return <>{fallback}</>;
//     return <div>Fallback</div>;
// };

// export default GateKeeper;





// import React from 'react';
// import usePermissionCheck from "./usePermissionCheck";

// // This component is meant to be used everywhere a restriction based on user permission is needed
// const GateKeeper = ({to, fallback,loadingComponent, children}) => {

//     // We "connect" to the provider thanks to the PermissionContext
//     const [loading, allowed] = usePermissionCheck(to);

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

// export default GateKeeper;