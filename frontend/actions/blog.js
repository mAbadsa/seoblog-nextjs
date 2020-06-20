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

const listAllBlogsCategoriesTags = async (limit, skip) => {
  try {
    const res = await fetch(`${API}/blogs-categoies-tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        limit,
        skip,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { createBlog, listAllBlogsCategoriesTags };
