import fetch from "isomorphic-fetch";
import { API } from "../config";

const createCategory = (categoryName, token) => {
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryName),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};

const getCategory = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deleteCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { createCategory, getCategories, getCategory, deleteCategory };
