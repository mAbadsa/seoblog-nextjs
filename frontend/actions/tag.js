import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";
import { handleResponse } from "./auth";

const createTag = (tagName, token) => {
  return fetch(`${API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tagName),
  })
    .then((res) => {
      // handleResponse(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

const getTags = () => {
  return fetch(`${API}/tags`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const getTag = (slug) => {
  return fetch(`${API}/tag/${slug}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deleteTag = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      // handleResponse(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export { createTag, getTags, getTag, deleteTag };
