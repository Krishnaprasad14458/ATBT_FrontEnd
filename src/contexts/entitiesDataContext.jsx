import React, {
    createContext,
    useEffect,
    useReducer,
  } from "react";
import axios from "axios";
import entitiesDataReducer from "../reducers/entitiesDataReducer";
import { apiUrl } from "../utils/constants";
import { toast } from "react-toastify";

export const EntitiesDataContext = createContext();

const EntitiesDataProvider = ({ children }) => {
    const initialState = {
      entities:[],
      dashboard:{
        paginatedEntities:[],
        currentPage:1,
        totalPages: null,
        perPage: 5,
        loading: false,
        search: "",
      },
      pagination:{
        paginatedEntities:[],
        currentPage:1,
        totalPages: null,
        perPage: 10,
        loading: false,
        search: "",
      }
    };

    console.log(initialState.dashboard.loading)
  
    const [entitiesState, entitiesDispatch] = useReducer(
      entitiesDataReducer,
      initialState
    );
    const getDashboardEntitiesData = async (pageNo=1,search="",perPage=5) => {
      entitiesDispatch({
        type: "SET_LOADING",
        payload: {
          context: "DASHBOARD"
        }
      })
      try {
        const { data } = await axios.get(`${apiUrl}/entite/list`);
        const searchedEntities = data.Entites?.filter((entity) => {
          return entity.Entite_Name.toLowerCase().includes(search)
        },
        )
        const totalPages = Math.ceil(searchedEntities.length / perPage);
        const paginatedResults = searchedEntities.slice(
          (pageNo - 1) * perPage,
          pageNo * perPage,
        );
        entitiesDispatch({
          type: "SET_LOADING",
          payload: {
            context: "DASHBOARD"
          }
        })
      return entitiesDispatch({
          type: "SET_PAGINATED_ENTITIES",
          payload: {
            context: 'DASHBOARD',
              data: paginatedResults,
              currentPage: pageNo,
              totalPages: totalPages
          }
      })
      } catch (error) {
        console.error(error);
      }
      };

    const getpaginatedEntitiesData = async (pageNo=1,search="",perPage=10) => {
      entitiesDispatch({
        type: "SET_LOADING",
        payload: {
          context: "ENTITES"
        }
      })
      try {
        const { data } = await axios.get(`${apiUrl}/entite/list`);
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
            context: 'ENTITES',
              data: paginatedResults,
              currentPage: pageNo,
              totalPages: totalPages
          }
      })
      } catch (error) {
        console.error(error);
      }
      entitiesDispatch({
        type: "SET_LOADING",
        payload: {
          context: "ENTITES"
        }
      })
      };

      const deleteEntitybyId = async(id)=> {
        try {
          const data = await axios.delete(`${apiUrl}/entite/delete/${id}`)
          getpaginatedEntitiesData(entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage);
          console.log(data)
        } catch (error) {
         console.error(error) 
        }
      }

      const createEntity = async(entityData)=>{
        try{
          // const data = await axios.post("http://localhost:3001/entite/add",entityData);
          const {data, status} = await toast.promise(
            axios.post(`http://localhost:3001/entite/add`, entityData),
            {
              pending: 'verifying data',
              success: {
                render(data) {
                  return `Password Updated`
                }
              },
              error: 'unautorized Access 🤯',
            },
          )
          console.log(data);
          if (status === 201) {
            console.log(data);
            getpaginatedEntitiesData(entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage);
          }
        } catch (error) {
          console.error(error) 
        }
      }
    useEffect(() => {
      getpaginatedEntitiesData(entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage);
      getDashboardEntitiesData(entitiesState?.dashboard?.currentPage,entitiesState?.dashboard?.search,entitiesState?.dashboard?.perPage)
      // eslint-disable-next-line
    }, [entitiesDispatch,entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage,entitiesState?.dashboard?.currentPage,entitiesState?.dashboard?.search,entitiesState?.dashboard?.perPage]);
  
    return (
      <EntitiesDataContext.Provider
        value={{
          entitiesState,
          entitiesDispatch,
          getpaginatedEntitiesData,
          deleteEntitybyId,
          createEntity
        }}
      >
        {children}
      </EntitiesDataContext.Provider>
    );
};
  
export default EntitiesDataProvider;