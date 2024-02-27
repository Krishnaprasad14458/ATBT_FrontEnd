import React, { createContext, useEffect, useReducer } from 'react';
import * as actions from './utils/entitiesActions';
import * as api from './utils/entitiesApis';
import entitiesDataReducer from './entitiesDataReducer';
import { useNavigate } from 'react-router-dom';
import { initialState } from './utils/entitiesConfig';

export const EntitiesDataContext = createContext();

const EntitiesDataProvider = ({ children }) => {
  // const navigate = useNavigate();

  const [entitiesState, entitiesDispatch] = useReducer(
    entitiesDataReducer,
    initialState
  );

  const getAllEntities = async () => {
    try {
      const { data, status } = await api.getAllEntities();
      if (status === 200) {
        entitiesDispatch(actions.setEntities(data));
      } else {
        return null;
      }
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  const getDashboardEntitiesData = async () => {
    const { currentPage, perPage, sortBy, search } =
      entitiesState.dashboardEntities;
    entitiesDispatch(actions.setLoading('DASHBOARD'));
    try {
      const { data, status } = await api.getEntities(
        currentPage,
        perPage,
        sortBy,
        search
      );
      if (status === 200) {
        entitiesDispatch(actions.setPaginatedEntities('DASHBOARD', data));
      } else {
        return null;
      }
    } catch (error) {
      console.error(`the error is: ${error}`);
    } finally {
      entitiesDispatch(actions.setLoading('DASHBOARD'));
    }
  };

  const getpaginatedEntitiesData = async () => {
    const { currentPage, perPage, sortBy, search } = entitiesState.entitiesList;
    entitiesDispatch(actions.setLoading('ENTITES'));
    try {
      const { data, status } = await api.getEntities(
        currentPage,
        perPage,
        sortBy,
        search
      );
      if (status === 200) {
        entitiesDispatch(actions.setPaginatedEntities('ENTITES', data));
      } else {
        return null;
      }
    } catch (error) {
      console.error(`the error is ${error}`);
    } finally {
      entitiesDispatch(actions.setLoading('ENTITES'));
    }
  };

  const deleteEntitybyId = async (id) => {
    try {
      const { status } = await api.deleteEntity(id);
      if (status === 200) {
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
        getAllEntities();
      } else {
        return null;
      }
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  const getEntitybyId = async (id) => {
    try {
      const data = await api.getEntityById(id);
      getpaginatedEntitiesData();
      getDashboardEntitiesData();
      return data;
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  const createEntity = async (entityData) => {
    try {
      const { data, status } = await api.createEntity(entityData);
      if (status === 201) {
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
        getAllEntities();
        // navigate(`entitylandingpage/${data.Entites.id}`)
      }
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  useEffect(() => {
    getpaginatedEntitiesData();
    getDashboardEntitiesData();
    getAllEntities();
    // eslint-disable-next-line
  }, [
    entitiesDispatch,
    entitiesState?.entitiesList?.currentPage,
    entitiesState?.entitiesList?.search,
    entitiesState?.entitiesList?.perPage,
    entitiesState?.dashboardEntities?.currentPage,
    entitiesState?.dashboardEntities?.search,
    entitiesState?.dashboardEntities?.perPage,
  ]);

  return (
    <EntitiesDataContext.Provider
      value={{
        entitiesState,
        entitiesDispatch,
        getpaginatedEntitiesData,
        deleteEntitybyId,
        createEntity,
        getEntitybyId,
      }}
    >
      {children}
    </EntitiesDataContext.Provider>
  );
};

export default EntitiesDataProvider;
