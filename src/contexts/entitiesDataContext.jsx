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
        const searchedEntities = items?.filter((entity) => {
            return entity.entity.toLowerCase().includes(search)
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
      };
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
        }}
      >
        {children}
      </EntitiesDataContext.Provider>
    );
};
  
export default EntitiesDataProvider;