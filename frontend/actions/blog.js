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

const listAllBlogsCategoriesTags = async (limit = 10, skip = 0) => {
  try {
    const res = await fetch(`${API}/blogs-categories-tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit,
        skip,
      }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export { createBlog, listAllBlogsCategoriesTags };
