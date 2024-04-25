import { useMatches } from "react-router-dom";
import React from 'react'
export default function BreadCrumbs() {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));
  return (
    <ol className="breadcrumbs ">
      {crumbs.map((crumb, index) => (
        <li className="crumb" key={index}>{crumb}</li>
      ))}
    </ol>
  );
}




// import React from 'react'
// import { useLocation,Link } from 'react-router-dom'

// const BreadCrumbs = () => {
//   const location = useLocation()
//   let currentLink = ""
//   const crumbs = location.pathname.split('/').filter(crumb=>crumb !=='').map(crumb =>{
//     currentLink +=`/${crumb}`
//     return (
//       <div className='crumb' key={crumb}>
//         <Link to={currentLink}>{crumb}</Link>
//       </div>
//     )
//   })
//   return (
//     <div className='breadcrumbs'>{crumbs}</div>
//   )
// }

// export default BreadCrumbs