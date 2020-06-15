import fetch from "isomorphic-fetch";
import { API } from "../config";
import Blog from "../../backend/models/Blog";

const createBlog = (blog, token) => {
  return fetch(`${API}/blogs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: Blog,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { createBlog };
