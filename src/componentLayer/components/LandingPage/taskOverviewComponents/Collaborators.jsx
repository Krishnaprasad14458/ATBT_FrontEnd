import React, { useState } from "react";
import Select from "react-select";
const Collaborators = ({
  members,
  task,
  handleOverviewTaskChange,
  handleSubmit,
}) => {
  let [isCollaboratorsEditing, setIsCollaboratorsEditing] = useState(false);
  const handleRemoveCollaborator = (collaboratorId) => {
    let updatedCollaborators = task?.collaborators.map(
      (collaborat) => collaborat.id
    );
        updatedCollaborators = updatedCollaborators.filter(
      (e) => e != collaboratorId
    );
    console.log("mem", updatedCollaborators);
    handleSubmit(task?.id, "collaborators", updatedCollaborators);
 
  };
  return (
    <div className="px-3 py-1">
      <div className="me-2 flex items-center gap-2">
        <p className="text-sm ">Collaborators</p>
        {task?.collaborators?.length > 0 &&
          task?.collaborators.map((collaborator) => (
            <div key={collaborator.id} className="relative group">
              {/* Collaborator */}
              <div className="collaborator-container bg-orange-600 text-white py-1.5 w-8 h-8 rounded-full relative hover:bg-orange-700">
                <span className="flex justify-center items-center text-sm">
                  {collaborator.name.split("")[0]}
                </span>

                {/* Remove icon */}
                <span className="absolute top-0 left-4 p-1 hidden group-hover:flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white hover:bg-black"
                    onClick={() => handleRemoveCollaborator(collaborator.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>

              <div className="absolute -top-5 bottom-0 right-4 ml-4 mt-2 w-52 h-60 p-2 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out transform translate-x-1/2 -translate-y-full group-hover:opacity-100 group-hover:-translate-y-full z-10 text-black">
                {/* Image */}
                <img
                  src="https://img.freepik.com/premium-photo/headshot-photos-indian-women-dynamic-professions-occassions-indian-girl_978786-292.jpg"
                  alt={collaborator.name}
                  className="w-full h-40 rounded-t-lg object-cover"
                />

                {/* Details */}
                <div className="inline-block p-2">
                  {/* Name */}
                  <p className="font-semibold">{collaborator.name}</p>

                  {/* Email */}
                  <p className="text-sm text-gray-600 pt-1">{collaborator.email}</p>
                </div>
              </div>
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
            onChange={(selectedOption) => {
              let updatedCollaborators = task?.collaborators.map(
                (collaborat) => collaborat.id
              );
              updatedCollaborators = [
                ...updatedCollaborators,
                selectedOption.value,
              ];
              console.log("asdf", updatedCollaborators);
              // handleOverviewTaskChange("collaborators", updatedCollaborators);
              handleSubmit(task?.id, "collaborators", updatedCollaborators);

              setIsCollaboratorsEditing(false);
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
