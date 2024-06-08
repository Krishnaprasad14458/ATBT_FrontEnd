import React, { useEffect, useState } from "react";
import "./Home.css";
import { getDate } from "../../../utils/utils";
import HomeUser from "./homeUser/HomeUser";
import HomeEntity from "./homeEntity/HomeEntity";
import GateKeeper from "../../../rbac/GateKeeper";
import atbtApi from "../../../serviceLayer/interceptor";
import {
  useActionData,
  useFetcher,
  useFetchers,
  useLoaderData,
} from "react-router-dom";
export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    let user = url.searchParams.get("user[search]") || "";
    let userPage = url.searchParams.get("userPage") || "1";
    let team = url.searchParams.get("team") || "";
    let meeting = url.searchParams.get("meeting") || "";
    let entity = url.searchParams.get("entity") || "";
    console.log(user, team, meeting, entity, "dloader", request, url);
    const requests = [
      atbtApi.post(`/user/list?search=${user}&page=${userPage}`, {}),
      atbtApi.post(`/entity/list?search=${entity}`, {}),
      atbtApi.post(`/team/list?search=${team}`, {}),
      atbtApi.post(`/boardmeeting/list?search=${meeting}`, {}),
      atbtApi.get(`/task/taskcount`),
    ];

    const results = await Promise.allSettled(requests);

    const successfulResults = [];
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successfulResults[index] = result.value.data; // Save successful data
      } else {
        if (result.reason.response && result.reason.response.status === 403) {
          console.error(
            `Request ${index + 1} failed with a 403 error:`,
            result.reason.response.statusText
          );
        } else {
          console.error(`Request ${index + 1} failed:`, result.reason.message);
        }
      }
    });

    const [userList, entityList, teamList, meetingList, count] =
      successfulResults;
    const combinedResponse = {
      userList,
      entityList,
      teamList,
      meetingList,
      count,
    };
    console.log(combinedResponse, "allSettled");
    return combinedResponse;
  } catch (error) {
    if (!error.response.status === 403) {
      console.error("Error occurred:", error);
      throw error;
    }
    return null;
  }
}

export async function action({ request, params }) {
  try {
    const data = await request.json();
    console.log(data, "daction");
    const requests = [
      atbtApi.post(
        `/user/list`,
        {},
        {
          params: data,
        }
      ),
      atbtApi.post(`/entity/list`, {}),
      atbtApi.post(`/team/list`, {}),
      atbtApi.post(`/boardmeeting/list`, {}),
    ];

    const results = await Promise.allSettled(requests);

    const successfulResults = [];
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successfulResults[index] = result.value.data; // Save successful data
      } else {
        if (result.reason.response && result.reason.response.status === 403) {
          console.error(
            `Request ${index + 1} failed with a 403 error:`,
            result.reason.response.statusText
          );
        } else {
          console.error(`Request ${index + 1} failed:`, result.reason.message);
        }
      }
    });

    const [userList, entityList, teamList, meetingList] = successfulResults;
    const combinedResponse = { userList, entityList, teamList, meetingList };
    console.log(combinedResponse, "allSettledt");
    return combinedResponse;
  } catch (error) {
    if (!error.response.status === 403) {
      console.error("Error occurred:", error);
      throw error;
    }
    return null;
  }
}

function Home() {
  document.title = "ATBT | Home";
  const fetchers = useFetchers();
  const fetcher = useFetcher();
  let actionData = useActionData();
  let data = useLoaderData();
  console.log("data", data);
  const localStorageData = JSON.parse(localStorage.getItem("data"));
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(".");
    }
  }, [fetcher]);
  console.log(fetchers, "ftrs", fetcher, actionData);
  const queryParams = useState({
    user: {
      search: "",
      page: 1,
    },
    entity: {
      search: "",
      page: 1,
    },
    meeting: {
      search: "",
      page: 1,
    },
    team: {
      search: "",
      page: 1,
    },
  });
  return (
    <div className="  p-4 bg-[#f8fafc] ">
      {/* <h1 className="lg:m-2 font-semibold sm:text-xs md:text-base lg:text-lg xl:text-xl">
        Home
      </h1> */}
      <div className="text-center pt-5">
        <h6 className="text-sm date_time">{getDate()}</h6>
        <h4 className=" text-2xl font-normal dark:text-white welcome_user">
          Welcome {localStorageData?.user?.name ?? "user"}
        </h4>
        <div className=" md:flex-wrap mt-2 justify-center block md:flex">
          <div className="tota_tasks border-r-2 border-black-100 bg-gray-100 p-2 rounded-s-full">
            <p className="mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]">
              Total Tasks
            </p>
            <p className="mr-4 lg:ml-4 px-2 font-semibold">
              {data?.count?.allTasksCount}
            </p>
          </div>
          <div className=" todo_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <p className="mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]">
              To-Do Tasks
            </p>
            <p className="mr-4 lg:ml-4 px-2 font-semibold">{data?.count?.toDoCount}</p>
          </div>
          <div className=" in_progress_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <p className="mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]">
              In-Progress Tasks
            </p>
            <p className="mr-4 lg:ml-4 px-2 font-semibold">
              {data?.count?.inProgressCount}
            </p>
          </div>
          <div className="  overdue_tasks border-r-2 border-black-100 bg-gray-100 p-2">
            <p className="mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]">
              Overdue Tasks
            </p>
            <p className="mr-4 lg:ml-4 px-2 font-semibold">
              {data?.count?.overdueCount}
            </p>
          </div>
          <div className=" completed_tasks border-black-100 bg-gray-100 p-2 rounded-e-full">
            <p className="mr-4 lg:ml-4 px-2 pt-1 text-xs text-[#929297]">
              Completed Tasks
            </p>
            <p className="mr-4 lg:ml-4 px-2 font-semibold">
              {data?.count?.completedCount}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-col-2 gap-10 px-7 dashboard-main">
          <GateKeeper
            permissionCheck={(permission) =>
              permission.module === "entity" && permission.canRead
            }
          >
            <HomeEntity
              data={actionData?.entityList ?? fetcher?.data?.entityList ?? []}
              params={queryParams}
            />
          </GateKeeper>
          <GateKeeper
            permissionCheck={(permission) =>
              permission.module === "user" && permission.canRead
            }
          >
            <HomeUser
              data={actionData?.userList ?? fetcher?.data?.userList ?? []}
              params={queryParams}
            />
          </GateKeeper>
        </div>
      </div>
    </div>
  );
}

export default Home;
