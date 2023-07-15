export const initialState = {
  user: null,
  loading: false,
  isError: false,
  errorText: null,
  user_id: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_ID':
      return {
        ...state,
        user_id: action.payload,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'ERROR':
      return {
        ...state,
        isError: true,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_DONE':
      return {
        ...state,
        loading: false,
      };

    default:
      break;
  }
};
