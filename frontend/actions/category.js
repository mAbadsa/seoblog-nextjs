import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

const createCategory = (name) => {
  return fetch(`${API}/admin/crud/category-tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(name),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export { createCategory }