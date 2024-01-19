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