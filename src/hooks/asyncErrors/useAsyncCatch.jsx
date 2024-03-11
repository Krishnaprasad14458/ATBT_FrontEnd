import { useAsyncThrow } from './useAsyncThrow';

export const useAsyncCatch = () => {
  const throwError = useAsyncThrow();

  const handleApiError = (error) => {
    if (error?.response?.status === 500) {
      throwError(error);
    } else if (error?.response?.status === 401) {
      // Handle 401 unauthorized error here (e.g., redirect to login page)
      // For example:
      // history.push('/login');
    } else if (error?.response?.status === 403) {
      // Handle 403 forbidden error here (e.g., show a message to the user)
      // For example:
      console.warn(`Forbidden: ${error?.message}`);
    }
  };

  return handleApiError;
};
