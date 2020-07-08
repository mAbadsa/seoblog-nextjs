import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";

const getPublicProfile = async (username) => {
  try {
    const user = await fetch(`${API}/user/${username}`);
    return await user.json();
  } catch (error) {
    console.log(error);
  }
};

export { getPublicProfile };
