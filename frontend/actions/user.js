import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { handleResponse } from "./auth";

const getPublicProfile = async (username) => {
  try {
    const user = await fetch(`${API}/user/p/${username}`);
    return await user.json();
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (token) => {
  try {
    const res = await fetch(`${API}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // handleResponse(res);
    console.log(token);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const getPhoto = async (username, token) => {
  try {
    const res = await fetch(`${API}/user/photo/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // handleResponse(res);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userData, token) => {
  try {
    const updatedUser = await fetch(`${API}/user/update`, {
      method: "PUT",
      headers: {
        // "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
        // Accept: "application/json",
        // "Content-Type": "application/json",
      },
      body: userData,
    });
    // handleResponse(res);
    return await updatedUser.json();
  } catch (error) {
    console.log(error);
  }
};

export { getPublicProfile, getPhoto, updateUser, getProfile };
