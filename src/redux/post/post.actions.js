
export const POST_DETAIL = "POST_DETAIL";
export const POST_LANGUAGE = "POST_LANGUAGE";

export const postDetail = (post) => dispatch => {
    const action = {
      type: POST_DETAIL,
      payload: post,
    }
  
    dispatch(action);
};

export const postLanguage = (language) => dispatch => {
    const action = {
      type: POST_LANGUAGE,
      payload: language,
    }
  
    dispatch(action);
};