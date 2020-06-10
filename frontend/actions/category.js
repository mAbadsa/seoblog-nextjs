import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";

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

export { createCategory };
