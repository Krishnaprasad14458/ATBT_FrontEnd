import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData, useSubmit, useFetcher } from "react-router-dom";
import atbtApi from "../../../serviceLayer/interceptor";
import * as XLSX from "xlsx";
import Select from "react-select";
import { debounce } from "../../../utils/utils";
import { useReactToPrint } from "react-to-print";


let reportType = [
  { label: "ATBT", value: "To-Do" },
  { label: "ATR", value: "In-Progress" },
  { label: "ATBT MASTER", value: "Master" },
];

let moduleList = [
  // { label: "User", value: "user" },
  { label: "Entity", value: "entity" },
  { label: "Team", value: "team" },
];

export async function loader({ request, params }) {
  try {
    let url = new URL(request.url);
    // let moduleName =
    const moduleName = url.searchParams.get("moduleName");
    const listID = url.searchParams.get("listID");
    const meetingId = url.searchParams.get("meetingId");
    const reportType = url.searchParams.get("reportType");
    const userData = JSON.parse(localStorage.getItem("data"));
    const userId = userData?.user?.id;
    let idOF;
    if (moduleName === "user") {
      idOF = "userId";
    } else if (moduleName === "entity") {
      idOF = "entityId";
    } else if (moduleName === "team") {
      idOF = "teamId";
    }
    const [reportsData, selectedModuleList, meetings] = await Promise.all([
      meetingId !== "all" && reportType !== "Master"
        ? atbtApi.get(`task/list?meetingId=${meetingId}&status=${reportType}`)
        : meetingId !== "all" && reportType === "Master"
          ? atbtApi.get(`task/list?meetingId=${meetingId}`)
          : meetingId === "all" && reportType !== "Master"
            ? atbtApi.get(`task/list?${idOF}=${listID}&status=${reportType}`)
            : meetingId === "all" && reportType === "Master"
              ? atbtApi.get(`task/list?${idOF}=${listID}`)
              : null,
      moduleName === "user"
        ? atbtApi.post(`public/list/user`)
        : moduleName === "entity"
          ? atbtApi.post(`public/list/entity`)
          : moduleName === "team"
            ? atbtApi.post(`public/list/team`)
            : null,
      moduleName &&
      listID &&
      atbtApi.get(`boardmeeting/list?${moduleName}=${listID}`),
    ]);
    console.log("selectedModuleList890", reportsData);
    let selectedModuleLists;
    if (moduleName === "user") {
      selectedModuleLists = selectedModuleList?.data?.users.map((user) => ({
        label: user.name,
        value: user.id,
      }));
    } else if (moduleName === "entity") {
      selectedModuleLists = selectedModuleList?.data?.Entites.map((entity) => ({
        label: entity.name,
        value: entity.id,
      }));
    } else if (moduleName === "team") {
      selectedModuleLists = selectedModuleList?.data?.Teams.map((entity) => ({
        label: entity.name,
        value: entity.id,
      }));
    }
    let meetingsLists = meetings?.data?.Meetings?.map((meeting) => ({
      label: meeting.meetingnumber,
      value: meeting.id,
    }));

    if (meetings?.data?.Meetings && meetings?.data?.Meetings.length > 0) {
      meetingsLists?.unshift({ label: "All Meetings", value: "all" });
    }

    console.log(selectedModuleLists, meetingsLists, "EntitiesListuoi");
    const CombinedResponse = {
      reportsData: reportsData.data.tasks,
      selectedModuleList: selectedModuleLists,
      meetingsList: meetingsLists,
    };

    console.log(userId, CombinedResponse, "jdskfsjf");

    return CombinedResponse;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

function Reports() {
  document.title = "ATBT | Report";

  let fetcher = useFetcher();
  const [Qparams, setQParams] = useState({});
  console.log(Qparams, "Qparams");

  useEffect(() => {
    debouncedParams(Qparams);
  }, [Qparams]);
  const debouncedParams = useCallback(
    debounce((param) => {
      console.log(param);
      submit(param, { method: "get", action: "." });
    }, 500),
    []
  );

  let [report, setReport] = useState({
    selectedReport: "",
    selectedModule: "",
    selectedIdFromList: null,
    selectedMeetingId: null,
  });

  console.log(report, "reportreport");

  let submit = useSubmit();

  const data = useLoaderData();
  const { selectedModuleList, meetingsList, reportsData } = data;

  console.log(reportsData, "EntitiesListsss");

  const [ReportData, setReportData] = useState();
  console.log(ReportData, "ReportDatahere");

  useEffect(() => {
    if (reportsData) {
      setReportData(
        reportsData.map((report, index) => ({
          ...report,
          serialNO: index + 1,
        }))
      );
    }
  }, [reportsData]);

  const headersAtbt = [
    { label: "S.NO", key: "serialNO" },
    { label: "Date of Board meeting", key: "date" },
    { label: "Initial Decision Taken", key: "decision" },
    { label: "Person Responsible for implementation", key: "memberdata" },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" },
  ];

  const headerMaster = [
    { label: "S.NO", key: "serialNO" },
    { label: "Date of Board meeting", key: "date" },
    { label: "Decision Taken", key: "decision" },
    { label: "Person Responsible for implementation", key: "memberdata" },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" },
    { label: "Ageing of the Decision as per Latest Board Meeting", key: "age" },
    { label: "Updated Decision", key: "updatedbyuser" },
    // { label: "Updated Person Responsible", key: "memberdata" },
  ];

  const headerATR = [
    { label: "S.NO", key: "serialNO" },
    { label: "Date of Board meeting", key: "date" },
    { label: "Initial Decision Taken", key: "decision" },
    { label: "Person Responsible for implementation", key: "memberdata" },
    { label: "DueDate", key: "dueDate" },
    { label: "Meeting ID", key: "meetingNumber" },
    { label: "Ageing of the Decision as per Latest Board Meeting", key: "age" },
    { label: "Updated Decision", key: "updatedbyuser" },
    // { label: "Updated Person Responsible", key: "memberdata" },
  ];

  const reportdata = [
    {
      date: "24-06-2024",
      decision: "task-2 ready",
      meetingId: 454,
      comments: [
        {
          upadatedDecision: "table content",
          personResponble: "krishna",
          date: "24-09-2024",
        },
        {
          upadatedDecision: "content",
          personResponble: "sita",
          date: "14-05-2024",
        },
        {
          upadatedDecision: "reporst",
          personResponble: "david",
          date: "24-03-2024",
        },
        {
          upadatedDecision: "refund ",
          personResponble: "sai",
          date: "04-04-2024",
        },
        {
          upadatedDecision: "teams",
          personResponble: "venu",
          date: "2-05-2024",
        },
        {
          upadatedDecision: "tasks",
          personResponble: "ram",
          date: "23-09-2024",
        },
      ],
    },
  ];

  // Extract dynamic   ATR headers
  const dynamicATRHeaders = reportdata[0]?.comments.flatMap(
    (comment, index) => [
      {
        label: `Updated Decision on ${comment.date}`,
        key: `updatedDecision${index + 1}`,
      },
      { label: `Person Responsible`, key: `personResponsible${index + 1}` },
    ]
  );
  const HeadersATR = [...headerATR, ...dynamicATRHeaders];
  console.log(HeadersATR, "HeadersATR");


  const masterPersonResHeaders = ReportData && ReportData.length > 0 ? ReportData?.flatMap((data, index) =>
    [
      {
        label: `Person Responsible for implementation`,
        key: `PersonResponce${index + 1}`,
      },
    ]
  ) : [];



  // Extract dynamic headers
  const dynamicmasterHeaders = reportdata[0]?.comments.flatMap(
    (comment, index) => [
      {
        label: `Updated Decision on ${comment.date}`,
        key: `updatedDecision${index + 1}`,
      },
      { label: `Person Responsible`, key: `personResponsible${index + 1}` },
    ]
  );


  const HeadersMaster = [...headerMaster, ...dynamicmasterHeaders, ...masterPersonResHeaders];

  console.log(HeadersMaster, "HeadersMaster");

  // Transform data to match headers
  const transformData = (data) => {
    return data?.map((item, index) => {
      const transformedItem = {
        serialNO: index + 1,
        date: item?.date,
        decision: item?.decision,
        members: item?.members,
        dueDate: item?.dueDate,
        meetingNumber: item?.meetingId,
        meetingId: item?.meetingId,
        age: item?.age
      };

      item?.comments?.forEach((comment, commentIndex) => {
        console.log(comment, "comments");
        transformedItem[`updatedDecision${commentIndex + 1}`] =
          comment?.upadatedDecision;
        transformedItem[`personResponsible${commentIndex + 1}`] =
          comment?.personResponble;
      });

      return transformedItem;
    });
  };

  const masterTransformedData = transformData(ReportData);
  const atrTransformedData = transformData(ReportData);


  console.log(masterTransformedData, ReportData, "transformedReportData");

  const getMaxColumnWidth = (data, header) => {
    const headerLength = header.label.length;
    return headerLength + 5;
  };

  const handleDownload = (data, headers) => {
    const worksheetData = [
      headers.map((header) => header.label),
      ...data.map((row) => headers.map((header) => row[header.key])),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    // Apply styles to the header row
    headers.forEach((header, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: "s", v: header.label };
      }
      worksheet[cellAddress].s = {
        font: { bold: true, sz: 20 },
        alignment: { horizontal: "center", wrapText: true },
      };
    });
    const wscols = headers.map((header) => ({
      wch: getMaxColumnWidth(data, header),
    }));
    worksheet["!cols"] = wscols;
    const rowCount = worksheetData.length;
    for (let r = 0; r < rowCount; r++) {
      let maxCellHeight = 0;
      for (let c = 0; c < headers.length; c++) {
        const cellAddress = XLSX.utils.encode_cell({ r, c });
        const cell = worksheet[cellAddress];
        if (cell) {
          const cellTextLength = cell.v ? cell.v.toString().length : 0;
          const cellWidth = wscols[c].wch;
          const lines = Math.ceil(cellTextLength / cellWidth);
          const cellHeight = lines * 20;
          maxCellHeight = Math.max(maxCellHeight, cellHeight);
          cell.s = cell.s || {};
          cell.s.alignment = cell.s.alignment || {};
          cell.s.alignment.wrapText = true;
          worksheet[cellAddress] = cell;
        }
      }
      worksheet["!rows"] = worksheet["!rows"] || [];
      worksheet["!rows"][r] = { hpx: maxCellHeight };
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "reports.xlsx");
  };


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <div className="overflow-x-auto p-3">
      <h1 className="font-semibold text-lg grid1-item">Reports</h1>

      {/* table */}

      <div className=" mt-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                style={{ width: "12rem" }}>
                Report Name
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                style={{ width: "12rem" }}>
                Module
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                style={{ width: "20em" }}>
                List
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                style={{ width: "12rem" }}>
                Meetings ID's
              </th>
              <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" divide-gray-200 dark:divide-gray-700">
            <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
              >
                <Select
                  options={reportType}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                      width: "12rem"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "12px", // Adjust the font size of the placeholder text
                      color: "#a9a9a9",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                    }),
                    fontSize: "14px",
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  menuPortalTarget={document.body}

                  maxMenuHeight={150}
                  value={report.selectedReport}
                  onChange={(selectedOption) => {
                    setReport((prev) => ({
                      selectedReport: selectedOption,
                      selectedModule: "",
                      selectedIdFromList: null,
                      selectedMeetingId: null,
                    }));
                    setQParams((prev) => ({
                      reportType: selectedOption.value,
                    }));
                  }}
                />
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
              >
                <Select
                  options={moduleList}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,

                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                      width: "12rem"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "12px", // Adjust the font size of the placeholder text
                      color: "#a9a9a9",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                    }),
                    fontSize: "14px",
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  menuPortalTarget={document.body}

                  maxMenuHeight={150}
                  value={report.selectedModule}
                  onChange={(selectedOption) => {
                    setReport((prev) => ({
                      ...prev,
                      selectedModule: selectedOption,
                      selectedIdFromList: null,
                      selectedMeetingId: null,
                    }));
                    setQParams((prev) => ({
                      reportType: Qparams.reportType,
                      moduleName: selectedOption.value,
                    }));
                  }}
                />
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
              >
                <Select
                  options={selectedModuleList}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                      width: "20rem"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "12px", // Adjust the font size of the placeholder text
                      color: "#a9a9a9",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                    }),
                    fontSize: "14px",
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  menuPortalTarget={document.body}

                  maxMenuHeight={150}
                  value={report.selectedIdFromList}
                  onChange={(selectedOption) => {
                    setReport((prev) => ({
                      ...prev,
                      selectedIdFromList: selectedOption,
                      selectedMeetingId: null,
                    }));
                    setQParams((prev) => ({
                      reportType: Qparams.reportType,
                      moduleName: Qparams.moduleName,
                      listID: selectedOption?.value,
                    }));
                  }}
                />
              </td>
              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
              >
                <Select
                  options={meetingsList}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#f9fafb", // Change the background color of the select input
                      borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                      borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                      width: "12rem"
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "small", // Adjust the font size of the placeholder text
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isFocused ? "#fff" : "#000000",
                      backgroundColor: state.isFocused
                        ? "#ea580c"
                        : "transparent",

                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#ea580c",
                      },
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,

                      primary: "#fb923c",
                    },
                  })}
                  menuPortalTarget={document.body}


                  maxMenuHeight={200}
                  value={report.selectedMeetingId}
                  onChange={(selectedOption) => {
                    setReport((prev) => ({
                      ...prev,
                      selectedMeetingId: selectedOption,
                    }));
                    setQParams((prev) => ({
                      reportType: Qparams.reportType,
                      moduleName: Qparams.moduleName,
                      listID: Qparams.listID,
                      meetingId: selectedOption.value,
                    }));
                  }}
                />
              </td>

              <td
                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
              >
                {report?.selectedReport?.value == "To-Do" &&
                  ReportData &&
                  ReportData.length > 0 ? (
                  <>

                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(ReportData, headersAtbt)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      title="pdf"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={handlePrint}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clip-rule="evenodd" />
                      </svg>

                    </button>


                  </>
                ) : report?.selectedReport?.value == "In-Progress" &&
                  ReportData &&
                  ReportData.length > 0 ? (

                  <>
                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(ReportData, headerATR)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      title="pdf"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={handlePrint}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clip-rule="evenodd" />
                      </svg>

                    </button>
                  </>
                ) : report?.selectedReport?.value == "Master" &&
                  ReportData &&
                  ReportData.length > 0 ? (
                  <>


                    <button
                      type="button"
                      title="xlsx file"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={() => handleDownload(ReportData, headerMaster)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      title="pdf"
                      className=" inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg  text-[#475569] hover:text-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={handlePrint}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clip-rule="evenodd" />
                      </svg>

                    </button>

                  </>
                ) : (
                  "No Reports Found"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/*  table for reports printing */}

      <div style={{ display: "none", "@media print": { display: "block" } }}>
        <div className=" mt-5" ref={componentRef} >
          <div className="m-5" >
            <h1>{ReportData && ReportData[0]?.blongsTo}</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                    style={{ width: "12rem" }}>
                    S.NO
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                    style={{ width: "12rem" }}>
                    Date of Board Meeting
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                    style={{ width: "12rem" }}>
                    Initial Decision Taken
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                    style={{ width: "25rem" }}>
                    Person Responsible for implementation
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200"
                    style={{ width: "12rem" }}>
                    Due Date
                  </th>
                  <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                    Meetin Id
                  </th>

                  {
                    (report && (report?.selectedReport.label === "ATR" || report?.selectedReport.label === "ATBT MASTER")) && (
                      <>
                        <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                          Ageing of the Decision as per Latest Board Meeting
                        </th>
                        <th className="sticky top-0 bg-orange-600 text-white text-sm text-left px-3 py-2.5 border-l-2 border-gray-200">
                          Latest Updated Decision
                        </th>
                      </>
                    )
                  }

                </tr>
              </thead>
              <tbody className=" divide-gray-200 dark:divide-gray-700">

                {
                  ReportData && ReportData?.length > 0 && ReportData?.map((item, index) => {
                    return (
                      <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {index + 1}
                        </td>
                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {item.date}
                        </td>
                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {item.decision}
                        </td>
                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {item.memberdata}
                        </td>
                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {item.dueDate}
                        </td>

                        <td
                          className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                        >
                          {item.meetingNumber}
                        </td>


                        {
                          (report && (report?.selectedReport.label === "ATR" || report?.selectedReport.label === "ATBT MASTER")) && (
                            <>
                              <td
                                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                              >
                                {item.age}
                              </td>
                              <td
                                className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                              >
                                {item.updatedbyuser}
                              </td>
                            </>
                          )
                        }

                      </tr>
                    )
                  })
                }

                {/* <tr className={`hover:bg-slate-100 dark:hover:bg-gray-700 `}>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  1
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  03-06-2024
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  Welcome to the meeting
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  Bhavitha
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  05-06-2025
                </td>
  
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  09875
                </td>
                <td
                  className={`px-3 py-2 text-left border border-[#e5e7eb] text-xs font-medium   overflow-hidden`}
                >
                  In-Progress
                </td>
              </tr> */}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
