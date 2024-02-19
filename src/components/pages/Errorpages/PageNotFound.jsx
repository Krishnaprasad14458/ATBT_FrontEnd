import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-gray-100 px-10 py-2 sm:px-20 sm:py-5 md:px-40 md:py-10 shadow-lg">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-orange-600">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-4xl sm:text-6xl md:text-8xl text-center text-orange-600 font-light mt-1 sm:mt-3 md:mt-5">404</div>
        <div className="text-lg sm:text-2xl md:text-3xl text-center text-orange-600 mt-1 sm:mt-3 md:mt-5">Page Not Found</div>
        <div className="flex justify-center mt-5 sm:mt-8 md:mt-10">
          <button className="border border-1 border-gray-100 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-orange-600 text-white rounded-md" onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </div>

  );
};

export default PageNotFound