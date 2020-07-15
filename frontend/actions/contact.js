import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

const contact = (contactData) => {
  let conatctEndPoint;

  if (contactData.authorEmail) {
    conatctEndPoint = `${API}/contact-blog-author`;
  } else {
    conatctEndPoint = `${API}/conatct`;
  }

  return fetch(conatctEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export { contact };
