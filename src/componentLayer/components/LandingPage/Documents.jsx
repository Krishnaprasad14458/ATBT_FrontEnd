import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { EntitiesDataContext } from "../../../contexts/entitiesDataContext/entitiesDataContext";
import axios from "axios";
const Documents = () => {
  const {
    getEntitybyId,
    entitiesState: { entities },
  } = useContext(EntitiesDataContext);
  const { id } = useParams();
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
    <div>
      <div className="mt-4">
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Documents;
