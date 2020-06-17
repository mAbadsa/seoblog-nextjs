import fetch from "isomorphic-fetch";
import { API } from "../config";

const createBlog = (blog, token) => {
  return fetch(`${API}/blogs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { createBlog };
