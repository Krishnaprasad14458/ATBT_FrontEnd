import { useCallback, useState } from 'react';

export const useAsyncThrow = () => {
  const [, setError] = useState();
  return useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
