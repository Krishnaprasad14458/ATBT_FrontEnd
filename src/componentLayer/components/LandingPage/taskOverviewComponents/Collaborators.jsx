import React, { useState } from "react";
import Select from "react-select";

const Collaborators = ({ members }) => {
  let [collaborators, setCollaborators] = useState([]);
  let [isCollaboratorsEditing, setIsCollaboratorsEditing] = useState(false);
  const handleRemoveCollaborator = (collaborator) => {
    let updatedCollaborators = [...collaborators];
    updatedCollaborators = updatedCollaborators.filter(
      (e) => e != collaborator
    );
    setCollaborators(updatedCollaborators);
  };
  console.log("mem", collaborators);
  return (
    <div className="px-3 py-1">
      <div className="me-2 flex items-center gap-2">
        <p className="text-sm ">Collaborators</p>

        {collaborators.length > 0 &&
          collaborators.map((collaborator) => (
            <div className="collaborator-container bg-orange-500 text-white py-1.5 w-8 h-8 rounded-full relative">
              <span className="flex justify-center items-center text-sm">
                {collaborator}
              </span>
              <span className="absolute top-0 left-4 p-1 hidden group-hover:flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-white hover:bg-black"
                  onClick={() => handleRemoveCollaborator(collaborator)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>

                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
                // onClick={() => handleRemoveCollaborator(collaborator)}
              >
                <path
                  fillRule="evenodd"
                  d="M9.95 10L.707.757A1 1 0 0 1 2.12-.657L10 7.122 17.879-.757a1 1 0 1 1 1.415 1.415L11.95 10l8.343 8.243a1 1 0 1 1-1.415 1.414L10 11.95l-7.879 7.707a1 1 0 1 1-1.415-1.414L8.05 10 .707 1.757A1 1 0 1 1 2.12.343L10 8.122l7.879-7.707a1 1 0 0 1 1.415 1.414L11.95 10z"
                />
              </svg> */}
              </span>
            </div>
          ))}

        {isCollaboratorsEditing && (
          <Select
            options={members}
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "#white-50", // Change the background color of the select input
                borderWidth: state.isFocused ? "1px" : "1px", // Decrease border width when focused
                borderColor: state.isFocused ? "#orange-400" : "#d1d5db", // Change border color when focused
                boxShadow: state.isFocused ? "none" : provided.boxShadow, // Optionally remove box shadow when focused
                cursor: "pointer",
              }),
              placeholder: (provided) => ({
                ...provided,
                fontSize: "small",
                color: "#A0AEC0", // Lighter color for placeholder
              }),
              option: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#fff" : "#000000",
                backgroundColor: state.isFocused ? "#ea580c" : "transparent",

                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#ea580c",
                },
              }),

              singleValue: (provided) => ({
                ...provided,
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
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
            //   onChange={(selectedOption) => {
            //     handleOverviewTaskChange("members", selectedOption.value);
            //     handleSubmit(task?.id, "members", selectedOption.value);
            //   }}
            //   value={
            //     task?.members === null || task?.members === "" || task?.members === undefined
            //     ? ''
            //     : members?.find(person => person.value === task?.members)
            // }
            onChange={(selectedOption) => {
              setCollaborators((prev) => [...prev, selectedOption.value]);
              setIsCollaboratorsEditing(!isCollaboratorsEditing);
            }}
            menuPlacement="auto"
            className="date_type"
          />
        )}

        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
            onClick={() => setIsCollaboratorsEditing(!isCollaboratorsEditing)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default Collaborators;
