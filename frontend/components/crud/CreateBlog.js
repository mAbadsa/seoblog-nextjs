import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { createBlog } from "../../actions/blog";
import { isAuth, getCookie } from "../../actions/auth";
import { categories } from "../../actions/category";
import { tags } from "../../actions/tag";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: true });
import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateBlog = ({ router }) => {
  const [blog, setBlog] = useState({
    title: "",
    body: "",
    slug: "",
    mtitle: "",
    mdesc: "",
    excerpt: "",
    photo: "",
    categories: [],
    tags: [],
  });
  return (
    <React.Fragment>
      <div className="row py-5">
        <div className="col-md-12 text-center pb-5">
          <h1>Create New Blog</h1>
        </div>
        <ReactQuill />
      </div>
      <div className="row py-5 px-5">
        <div className="col-md-12">
          <button className="btn btn-outline-primary">Add</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CreateBlog);
