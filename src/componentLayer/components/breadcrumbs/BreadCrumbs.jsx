import React from 'react'
import { useMatches } from "react-router-dom";
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

