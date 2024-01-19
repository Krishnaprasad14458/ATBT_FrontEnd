import React, {
    createContext,
    useEffect,
    useReducer,
  } from "react";
import axios from "axios";
import entitiesDataReducer from "../reducers/entitiesDataReducer";
import { items } from "../utils/db";

export const EntitiesDataContext = createContext();

const apiToken = process.env.REACT_APP_API_TOKEN;


const EntitiesDataProvider = ({ children }) => {
    const initialState = {
      entities:[],
      pagination:{
        paginatedEntities:[],
        currentPage:1,
        totalPages: null,
        perPage: 5,
        loading: false,
        search: "",
      }
    };
  
    const [entitiesState, entitiesDispatch] = useReducer(
      entitiesDataReducer,
      initialState
    );

    const getpaginatedEntitiesData = async (pageNo=1,search="",perPage=5) => {
      try {
        const { status, data } = await axios.get(`https://atbtmain.teksacademy.com/entite/list`);
        console.log(data.Entites);
        const searchedEntities = data.Entites?.filter((entity) => {
          return entity.Entite_Name.toLowerCase().includes(search)
        },
        )
        const totalPages = Math.ceil(searchedEntities.length / perPage);
        const paginatedResults = searchedEntities.slice(
          (pageNo - 1) * perPage,
          pageNo * perPage,
        );
      return entitiesDispatch({
          type: "SET_PAGINATED_ENTITIES",
          payload: {
              data: paginatedResults,
              currentPage: pageNo,
              totalPages: totalPages
          }
      })
      } catch (error) {
        console.error(error);
      }
      };

      const deleteEntitybyId = async(id)=> {
        try {
          const data = await axios.delete(`https://atbtmain.teksacademy.com/entite/delete/${id}`)
          console.log(data, "delete")
        } catch (error) {
         console.log(error) 
        }
      }
    useEffect(() => {
      getpaginatedEntitiesData(entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage);
      // eslint-disable-next-line
    }, [entitiesDispatch,entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage]);
  
    return (
      <EntitiesDataContext.Provider
        value={{
          entitiesState,
          entitiesDispatch,
          getpaginatedEntitiesData,
          deleteEntitybyId,
        }}
      >
        {children}
      </EntitiesDataContext.Provider>
    );
};
  
export default EntitiesDataProvider;