import { useLocation, useMatches } from "react-router-dom";

import React from "react";

const BreadCrumbs = () => {
  let matches = useMatches();
  let location = useLocation()
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));
  console.log("matches", matches);
  console.log("crumbs", crumbs);
  console.log("location", location);

  // 
///// reference net ninja https://www.youtube.com/watch?v=zy8rqihtvA8
  return (
    <div className="breadcrumbs">
      <ol className="crumb">
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCrumbs;
