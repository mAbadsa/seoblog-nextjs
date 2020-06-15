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

  const [values, setValues] = useState({
    error: "",
    errorSize: "",
    formData: "",
    success: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    errorSize,
    formData,
    success,
    // title,
    hidePublishButton,
  } = values;

  const {
    title,
    body,
    slug,
    mtitle,
    mdesc,
    excerpt,
    photo,
    categories,
    tags,
  } = blog;

  const publishBlog = () => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    name = e.target.value;
  };

  const handleBody = (e) => {};

  const CreateBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Body:</label>
          <ReactQuill
            placeholder="Write blog content..."
            value={body}
            onChange={handleBody}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Publish
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="row py-5">
        <div className="col-md-8 offset-2 pb-5">
          <h1 className="text-center">Create New Blog</h1>
          <CreateBlogForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CreateBlog);
