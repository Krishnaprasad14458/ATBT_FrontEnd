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
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
const EntityLandingPage = () => {
  
  const {
    getEntitybyId,
    entitiesState: { entities },
  } = useContext(EntitiesDataContext);
  const { id,BMid  } = useParams();
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
        {/* <p className="text-xl font-semibold">User Landing Page</p> */}
        <BreadCrumbs />
      </div>

      <div className="flex overflow-auto">
    
       
        {!BMid && (
          <NavLink
            to="entityboardmeetings"
            end
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Board Meetings
          </NavLink>
        )}
        {BMid && (
          <NavLink
            to={`entityboardmeetings/${BMid}`}
            end
            isActive={(match, location) =>
              match ||
              location.pathname.startsWith(`/users/${id}/boardmeetings`)
            }
            className={({ isActive, isPending, isTransitioning }) =>
              isPending
                ? "cursor-pointer px-4 py-1 text-sm text-[#0c0a09]"
                : isActive
                ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
                : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
            }
          >
            Board Meetings - Tasks
          </NavLink>
        )}

<NavLink
          to="tasks"
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
              : isActive
              ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
              : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="documents"
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
              : isActive
              ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
              : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
          }
        >
          Documents
        </NavLink>

        <NavLink
          to="."
          end
          className={({ isActive, isPending, isTransitioning }) =>
            isPending
              ? "cursor-pointer px-4 py-1 text-sm  text-[#0c0a09]"
              : isActive
              ? "border-b-2 border-orange-600 text-[#0c0a09] cursor-pointer px-4 py-1 text-sm font-[500]"
              : "cursor-pointer px-4 py-1 text-sm font-[500] text-[#0c0a09]"
          }
        >
          Overview
        </NavLink>
      </div>
      <hr />
      <Outlet  />
    </div>
  );
};
export default EntityLandingPage;
