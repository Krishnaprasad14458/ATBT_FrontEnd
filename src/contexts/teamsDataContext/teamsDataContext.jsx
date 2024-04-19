import React, { createContext, useContext, useEffect, useReducer } from "react";
import * as actions from "./utils/teamsActions";
import * as api from "./utils/teamsApis";
import teamsDataReducer from "./teamsDataReducer";
import { useNavigate } from "react-router-dom";
import { initialState } from "./utils/teamsConfig";
import { AuthContext } from "../authContext/authContext";
import { useAsyncThrow } from "../../hooks/asyncErrors/useAsyncThrow";
import { useAsyncCatch } from "../../hooks/asyncErrors/useAsyncCatch";
export const TeamsDataContext = createContext();
const TeamsDataProvider = ({ children }) => {
  const throwError = useAsyncCatch();

  const [teamsState, teamsDispatch] = useReducer(
    teamsDataReducer,
    initialState
  );

  const { authState } = useContext(AuthContext);

  const getAllTeams = async () => {
    try {
      const { data, status } = await api.getAllTeams(authState?.token);
      console.log(data, status, "teams");
      if (status === 200) {
        teamsDispatch(actions.setTeams(data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getDashboardTeamsData = async () => {
    const { currentPage, perPage, sortBy, search, filters } =
      teamsState.dashboardTeams;
    teamsDispatch(actions.setLoading("DASHBOARD"));
    try {
      const { data, status } = await api.getTeams(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token,
        filters
      );
      console.log(data, status, "teams");
      if (status === 200) {
        teamsDispatch(actions.setPaginatedTeams("DASHBOARD", data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is: ${error}`);
      throwError(error);
    } finally {
      teamsDispatch(actions.setLoading("DASHBOARD"));
    }
  };

  const getpaginatedTeamsData = async () => {
    const { currentPage, perPage, sortBy, search, filters } =
      teamsState.teamsList;
    teamsDispatch(actions.setLoading("TEAMS"));
    try {
      const { data, status } = await api.getTeams(
        currentPage,
        perPage,
        sortBy,
        search,
        authState?.token,
        filters
      );
      console.log(data, status, "teams");
      if (status === 200) {
        teamsDispatch(actions.setPaginatedTeams("TEAMS", data));
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    } finally {
      teamsDispatch(actions.setLoading("TEAMS"));
    }
  };

  const deleteTeambyId = async (id) => {
    try {
      const { status } = await api.deleteTeam(id, authState?.token);
      if (status === 200) {
        getpaginatedTeamsData();
        getDashboardTeamsData();
        getAllTeams();
      } else {
        return null;
      }
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const getTeambyId = async (id) => {
    try {
      const data = await api.getTeamById(id, authState?.token);
      getpaginatedTeamsData();
      getDashboardTeamsData();
      return data;
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };

  const createTeam = async (teamData) => {
    try {
      const { data, status } = await api.createTeam(teamData, authState?.token);
      if (status === 201) {
        getpaginatedTeamsData();
        getDashboardTeamsData();
        getAllTeams();
      }
      return { data, status };
    } catch (error) {
      // console.error(`the error is ${error}`);
      throwError(error);
    }
  };
  const updateTeam = async (teamData, id) => {
    console.log(
      `${authState.token} token is present in updateTeam ${teamData}`
    );
    for (var pair of teamData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      console.log("navig");
      const { data, status } = await api.updateTeam(
        teamData,
        id,
        authState?.token
      );
      console.log(data, status, "navig");
      getDashboardTeamsData();
      getpaginatedTeamsData();
      getAllTeams();
      if (status === 200) {
        getDashboardTeamsData();
        getpaginatedTeamsData();
        getAllTeams();
      }
      return { data, status };
    } catch (error) {
      throwError(error);
    }
  };
  useEffect(() => {
    if (authState?.token) {
      getpaginatedTeamsData();
      getDashboardTeamsData();
      getAllTeams();
    }
    // eslint-disable-next-line
  }, [
    teamsDispatch,
    teamsState?.teamsList?.currentPage,
    teamsState?.teamsList?.search,
    teamsState?.teamsList?.perPage,
    teamsState?.teamsList?.filters,
    teamsState?.dashboardTeams?.currentPage,
    teamsState?.dashboardTeams?.search,
    teamsState?.dashboardTeams?.perPage,
    teamsState?.dashboardTeams?.filters,
    authState?.token,
  ]);

  return (
    <TeamsDataContext.Provider
      value={{
        teamsState,
        teamsDispatch,
        getpaginatedTeamsData,
        deleteTeambyId,
        createTeam,
        getTeambyId,
        updateTeam,
        setFilters: actions.setFilters,
      }}
    >
      {children}
    </TeamsDataContext.Provider>
  );
};

export default TeamsDataProvider;
