import { debounce } from '../../utils/utils';

function useDebounce(dispatch) {

  const debouncedSetPage = debounce((newPage) => {
    dispatch({
      type: "SET_CUSTOM_PAGE",
      payload: newPage
    });
  }, 300);

  const debouncedSetSearch = debounce((e) => {
    dispatch({
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