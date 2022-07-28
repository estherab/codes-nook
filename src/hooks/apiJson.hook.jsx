import axios from "axios";

const useApiJson = () => {
  const url = "http://localhost:3003/";

  const getCategory = async (category, type) => {
    try {
      const postsCategory = await axios.get(`${url}${category}__${type}`);
      console.log(category, type, postsCategory);
      return postsCategory;
    } catch (error) {
      console.error("error", error);
    }
  };

  const getPost = async (category, type, id) => {
    try {
      const postSingle = await axios.get(`${url}${category}__${type}/${id}`);
      console.log(category, type, postSingle);
      return postSingle;
    } catch (error) {
      console.error("error", error);
    }
  };

  const postCategory = async (category, type, newData) => {
    return axios.post(`${url}${category}__${type}`, newData);
  };

  const postSolution = async (category, postID, newSolution) => {
    const urlPost = `${url}${category}__challenges/${postID}`;
    const currentPost = await axios.get(urlPost);
    currentPost.data.solutions.push(newSolution);
    return axios.put(urlPost, currentPost.data);
  };

  const postRate = async (category, postID, user, newRate) => {
    const urlPost = `${url}${category}__challenges/${postID}`;
    const currentPost = await axios.get(urlPost);
    // console.log(currentPost.data.solutions);
    const solutionsMaped = currentPost.data.solutions.map((solution) => {
      if (solution.user === user) solution.rates = newRate;
      return solution;
    });
    // console.log({...currentPost.data, solutions: solutionsMaped});
    return axios.put(urlPost, {
      ...currentPost.data,
      solutions: solutionsMaped,
    });
  };

  return {
    getCategory,
    postCategory,
    postSolution,
    postRate,
    getPost,
  };
};

export default useApiJson;
