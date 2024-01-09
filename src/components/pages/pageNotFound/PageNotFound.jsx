import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Oops! It looks like the page you're trying to access doesn't exist.</p>
        <p>Don't worry, you can navigate back to the home page or try another route.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;