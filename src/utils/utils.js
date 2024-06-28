export function getDate() {
  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate
}

export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const formatDate = (createdAt) => {
  const parsedDate = new Date(createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return parsedDate.toLocaleDateString(undefined, options);
};

export function caseLetter(string) {
  // Check if the string is defined and has a value
  if (typeof string !== 'string' || string.trim() === '') {
      return ''; // Return an empty string if the input is invalid
  }

  return string.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
}

 export const formatDateandTime = (dateString) => {
  let date = new Date(dateString);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const ISTOffset = 330; // 5 hours 30 minutes in minutes
  const indianDateTime = new Date(
    date.getTime() + ISTOffset * 60000
  );

  const hours = indianDateTime.getUTCHours();
  const minutes = indianDateTime.getUTCMinutes();
  const seconds = indianDateTime.getUTCSeconds();
  const monthAbbreviations = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let ordinalsText = "";
  if (day == 1 || day == 21 || day == 31) {
    ordinalsText = "st";
  } else if (day == 2 || day == 22) {
    ordinalsText = "nd";
  } else if (day == 3 || day == 23) {
    ordinalsText = "rd";
  } else {
    ordinalsText = "th";
  }
  // Formatting the date
  date = ` ${monthAbbreviations[monthIndex]} ${
    day < 10 ? "0" : ""
  }${day}${ordinalsText}, ${year}`;

  const amPM = hours >= 12 ? "PM" : "AM";
  const hour12Format = hours % 12 || 12; // Convert midnight (0) to 12
  const time = `${hour12Format}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPM}`;
  // const time = `${hour12Format}:${
  //   minutes < 10 ? "0" : ""
  // }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${amPM}`;

  return (
    <span
      className="w-full truncate text-sm"
      title={date ? date : "No Date"}
    >
      
      {date ? date : "No Date"} at &nbsp;
      {time ? time : "No Time"}
    </span>
  );
};

export const dateFormat = (date)=>{
   
 let value = new Date(date);
  const day = value.getUTCDate();
  const monthIndex = value.getUTCMonth();
  const year = value.getUTCFullYear();

  const monthAbbreviations = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let ordinalsText = "";
  if (day == 1 || day == 21 || day == 31) {
    ordinalsText = "st";
  } else if (day == 2 || day == 22) {
    ordinalsText = "nd";
  } else if (day == 3 || day == 23) {
    ordinalsText = "rd";
  } else {
    ordinalsText = "th";
  }

  // Formatting the date
 return value = ` ${monthAbbreviations[monthIndex]} ${
    day < 10 ? "0" : ""
  }${day}${ordinalsText}, ${year}`;
}