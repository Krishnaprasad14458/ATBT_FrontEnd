import { useRef } from 'react';

const useInitializePerPage = (entitiesDispatch, defaultValue) => {
  const isInitialRender = useRef(true);

  if (isInitialRender.current) {
    entitiesDispatch({
      type: 'SET_PER_PAGE',
      payload: defaultValue
    });
    isInitialRender.current = false;
  }
};

export default useInitializePerPage;