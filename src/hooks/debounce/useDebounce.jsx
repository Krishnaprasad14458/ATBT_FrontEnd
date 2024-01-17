import { useContext } from 'react';
import { UserDataContext } from '../../contexts/usersDataContext';
import { debounce } from '../../utils/utils';

function useDebounce() {
  const { usersDispatch } = useContext(UserDataContext);

  const debouncedSetPage = debounce((newPage) => {
    usersDispatch({
      type: "SET_CUSTOM_PAGE",
      payload: newPage
    });
  }, 300);

  const debouncedSetSearch = debounce((e) => {
    usersDispatch({
      type: "SET_SEARCH",
      payload: e.target.value
    })
  }, 500);

  return {
    debouncedSetPage,
    debouncedSetSearch,
  };
}

export default useDebounce;
