import { useNavigate } from "react-router-dom";
import './notFound.css';
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div className="not-found">
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;