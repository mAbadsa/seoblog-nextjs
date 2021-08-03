import fetch from "isomorphic-fetch";
import { API } from "../config";

const sendContactEmail = (contactData) => {
  let contactEndPoint;

  if (contactData.authorEmail) {
    contactEndPoint = `${API}/contact-blog-author`;
  } else {
    contactEndPoint = `${API}/contact`;
  }

  return fetch(contactEndPoint, {
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
};

export { sendContactEmail };
