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

const getPhoto = async (username, token) => {
  try {
    const res = await fetch(`${API}/user/profile/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (dataInput, token) => {
  try {
    const updatedUser = await fetch(`${API}/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: dataInput,
    });
    return await updatedUser.json();
  } catch (error) {
    console.log(error);
  }
};

export { getPublicProfile, getPhoto, updateUser };
