import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth } from "./auth";

const createBlog = (blog, token) => {
  let createBlogEndPoint;
  if (isAuth() && isAuth().role === 1) {
    createBlogEndPoint = `${API}/blogs`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndPoint = `${API}/user/blogs`;
  }

  return fetch(createBlogEndPoint, {
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

const getSingleBlog = async (slug) => {
  try {
    const data = await fetch(`${API}/blogs/${slug}`, {});
    return await data.json();
  } catch (err) {
    return console.log(err);
  }
};

const getRelatedBlogs = async (blog) => {
  try {
    const blogs = await fetch(`${API}/blogs/relatedListBlogs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    return await blogs.json();
  } catch (err) {
    return console.log(err);
  }
};

const getBlogs = async () => {
  try {
    const blogs = await fetch(`${API}/blogs`);
    return await blogs.json();
  } catch (err) {
    return console.log(err);
  }
};

const updateBlog = async (slug, blog, token) => {
  try {
    const res = await fetch(`${API}/blogs/${slug}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const deleteBlog = async (slug, token) => {
  try {
    const res = await fetch(`${API}/blogs/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const searchList = async (params) => {
  let query = queryString.stringify(params);
  try {
    const blogs = await fetch(`${API}/blog/search?${query}`);
    if (blogs.ok) {
      return blogs.json();
    }
  } catch (err) {
    console.log(err);
  }
};

export {
  createBlog,
  listAllBlogsCategoriesTags,
  getSingleBlog,
  getRelatedBlogs,
  getBlogs,
  deleteBlog,
  updateBlog,
  searchList,
};
