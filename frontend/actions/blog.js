import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

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
    .then((res) => {
      handleResponse(res);
      return res.json();
    })
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

const getBlogs = async (username) => {
  let getBlogsEndPoint;
  if (username) {
    getBlogsEndPoint = `${API}/${username}/blogs`;
  } else {
    getBlogsEndPoint = `${API}/blogs`;
  }
  try {
    const blogs = await fetch(getBlogsEndPoint);
    return await blogs.json();
  } catch (err) {
    return console.log(err);
  }
};

const updateBlog = async (slug, blog, token) => {
  let updateBlogEndPoint;
  if (isAuth() && isAuth().role === 1) {
    updateBlogEndPoint = `${API}/blogs/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndPoint = `${API}/user/blogs/${slug}`;
  }

  try {
    const res = await fetch(updateBlogEndPoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });

    handleResponse(res);
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const deleteBlog = async (slug, token) => {
  let deleteBlogEndPoint;
  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndPoint = `${API}/blogs/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndPoint = `${API}/user/blogs/${slug}`;
  }

  try {
    const res = await fetch(deleteBlogEndPoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    handleResponse(res);
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
