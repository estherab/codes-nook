import * as actions from './auth.actions';

export const INITIAL_STATE = {
  user: null,
  admin: false,
  isLoading: false,
  error: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case actions.SAVE_USER: {

      console.log(payload);

      return { 
        ...state,
         user: payload ? payload : false,
         admin: payload.rol === 'admin' ? true : false,
      };
    }

    case actions.LOGIN_ERROR: {
      return { ...state, error: payload };
    }

    case actions.LOGOUT_USER: {
      return { ...state, user: false };
    }

    default: {
      return state;
    }
  }
}

export default authReducer;