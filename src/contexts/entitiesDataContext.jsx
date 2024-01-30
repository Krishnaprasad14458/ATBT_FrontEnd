import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import entitiesDataReducer from "../reducers/entitiesDataReducer";
import { apiUrl } from "../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const EntitiesDataContext = createContext();

const EntitiesDataProvider = ({ children }) => {
const navigate = useNavigate();
  const initialState = {
    entities:[],
    dashboard:{
      paginatedEntities:[],
      currentPage:1,
      totalPages: null,
      totalEntries: null,
      perPage: 5,
      loading: false,
      search: "",
    },
    pagination:{
      paginatedEntities:[],
      currentPage:1,
      totalPages: null,
      totalEntries: null,
      perPage: 10,
      loading: false,
      search: "",
    }
  };

  const [entitiesState, entitiesDispatch] = useReducer(
    entitiesDataReducer,
    initialState
  );
  console.log(entitiesState)
  const getDashboardEntitiesData = async () => {
    entitiesDispatch({
      type: "SET_LOADING",
      payload: {
        context: "DASHBOARD"
      }
    })
    try {
      const { data } = await axios.get(`${apiUrl}/entite/list?page=${entitiesState.dashboard.currentPage}&pageSize=5&sortBy=Entite_Name&search=${entitiesState.dashboard.search}`);
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
            data: data.Entites,
            totalPages: data.totalPages,
            totalEntries: data.totalEntries,
        }
    })
    } catch (error) {
      console.error(error);
    }
    };

  const getpaginatedEntitiesData = async () => {
    entitiesDispatch({
      type: "SET_LOADING",
      payload: {
        context: "ENTITES"
      }
    })
    try {
      const { data } = await axios.get(`${apiUrl}/entite/list?page=${entitiesState.pagination.currentPage}&pageSize=10&sortBy=${entitiesState?.pagination?.sortBy ?? 'Entite_Name'}&search=${entitiesState.pagination.search}`);
    return entitiesDispatch({
        type: "SET_PAGINATED_ENTITIES",
        payload: {
          context: 'ENTITES',
            data: data.Entites,
            totalPages: data.totalPages,
            totalEntries: data.totalEntries,
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
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
      } catch (error) {
       console.error(error) 
      }
    }

    const getEntitybyId = async(id)=> {
      try {
        const entityById = entitiesState?.entities?.find((element) => element.id === id) ?? null
        if(!entityById){
          const data = await axios.get(`${apiUrl}/entite/list/${id}`)
          getpaginatedEntitiesData();
          getDashboardEntitiesData();
          return data;
        } else {
          return entityById;
        }
      } catch (error) {
       console.error(error) 
      }
    }

    const createEntity = async(entityData)=>{
      try{
        const {data, status} = await toast.promise(
          axios.post(`${apiUrl}/entite/add`, entityData),
          {
            pending: 'verifying data',
            success: {
              render(data) {
                return `Entity created`
              }
            },
            error: 'Error in creating Entity 🤯',
          },
        )
        if (status === 201) {
          getpaginatedEntitiesData();
          getDashboardEntitiesData();
          navigate(`entitylandingpage/${data.Entites.id}`)
        }
      } catch (error) {
        console.error(error) 
      }
    }
  useEffect(() => {
    getpaginatedEntitiesData();
    getDashboardEntitiesData();
    // eslint-disable-next-line
  }, [entitiesDispatch,entitiesState?.pagination?.currentPage,entitiesState?.pagination?.search,entitiesState?.pagination?.perPage,entitiesState?.dashboard?.currentPage,entitiesState?.dashboard?.search,entitiesState?.dashboard?.perPage]);

  return (
    <EntitiesDataContext.Provider
      value={{
        entitiesState,
        entitiesDispatch,
        getpaginatedEntitiesData,
        deleteEntitybyId,
        createEntity,
        getEntitybyId
      }}
    >
      {children}
    </EntitiesDataContext.Provider>
  );
};

export default EntitiesDataProvider;