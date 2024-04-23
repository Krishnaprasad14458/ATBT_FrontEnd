import React, { useState, useEffect, useContext } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { EntitiesDataContext } from "../../../../contexts/entitiesDataContext/entitiesDataContext";
import axios from "axios";
const EntityLandingPage = () => {
  const moduleName = "entity";
  const {
    getEntitybyId,
    entitiesState: { entities },
  } = useContext(EntitiesDataContext);
  const { id } = useParams();
  // console.log()
  const [singleProduct, setSingleProduct] = useState({});
  // For tabs active
  const getSingleProduct = async () => {
    try {
      const entityById = entities?.Entites?.find(
        (element) => element.id === +id
      );
      if (!entityById) {
        const product = await getEntitybyId(id);
        setSingleProduct(product?.data?.Entites);
      } else {
        setSingleProduct(entityById);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);
  // for active tabs
  const location = useLocation();
  const currentURL = location.pathname.split("/");
  console.log("currentURL", currentURL);
  const [activeTab, setActiveTab] = useState(currentURL[3]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //  for active tabs close

  // ----toggleDrawer-------
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  // -------full screen----

  let [customFormField, setCustomFormField] = useState();
  const userData = JSON.parse(localStorage.getItem("data"));
  const token = userData?.token;
  let response;
  let [predefinedImage, setPredefinedImage] = useState("");
  useEffect(() => {
    axios
      .get(`https://atbtbeta.infozit.com/entity/list/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // Handle the successful response
        response = res;
        console.log("response", response.data.image);
        setPredefinedImage(response.data.image);
        setCustomFormField(response.data.customFieldsData);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("customFormField", customFormField);
  }, [customFormField]);
  return (
    <div className=" p-4 bg-[#f8fafc]">
      <div className="flex justify-between my-2">
        <p className="text-xl font-semibold">Entity Landing Page</p>
        <div className="flex justify-end gap-3 ">
          <Link to="/entities">
            <button
              type="submit"
              className="create-btn px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-orange-600 text-primary-foreground shadow hover:bg-primary/90 shrink-0 text-white gap-1"
            >
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="flex overflow-auto">
        <NavLink
          to="entity/boardmeetings"
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-md font-semibold"
              : isActive
              ? "border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold"
              : "cursor-pointer px-4 py-1 text-md font-semibold"
          }
        >
          Board Meetings
        </NavLink>
        <NavLink
          to="tasks"
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-md font-semibold"
              : isActive
              ? "border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold"
              : "cursor-pointer px-4 py-1 text-md font-semibold"
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="documents"
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-md font-semibold"
              : isActive
              ? "border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold"
              : "cursor-p px-4 py-1 text-md font-semibold"
          }
        >
          Documents
        </NavLink>

        <NavLink
          to="."
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-md font-semibold"
              : isActive
              ? "border-b-2 border-orange-600 text-black cursor-pointer px-4 py-1 text-md font-semibold"
              : "cursor-pointer px-4 py-1 text-md font-semibold"
          }
        >
          Overview
        </NavLink>
      </div>
      <hr />
      <Outlet context={moduleName} />
    </div>
  );
};
export default EntityLandingPage;
