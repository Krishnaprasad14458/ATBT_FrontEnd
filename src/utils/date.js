export function getDate() {
    const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    return formattedDate
}

// Debounce function
export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};