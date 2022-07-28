import * as actions from './post.actions';

export const INITIAL_STATE = {
  post: null,
  language: null,
  isLoading: false,
  error: false,
};

const postReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {

    case actions.POST_DETAIL: {
      return { ...state, post: payload };
    }

    case actions.POST_LANGUAGE: {
      return { ...state, language: payload };
    }

    default: {
      return state;
    }
  }
}

export default postReducer;