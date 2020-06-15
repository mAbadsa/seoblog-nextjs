import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { createBlog } from "../../actions/blog";
import { isAuth, getCookie } from "../../actions/auth";
import { categories } from "../../actions/category";
import { tags } from "../../actions/tag";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: true });
import "../../node_modules/react-quill/dist/quill.snow.css";
import "./createBlog.css";

const CreateBlog = ({ router }) => {
  const getLocalStorageItem = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (window.localStorage.getItem("blog")) {
      return JSON.parse(window.localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(getLocalStorageItem());

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
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const publishBlog = () => {
    e.preventDefault();
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.taget.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const CreateBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Body:</label>
          <ReactQuill
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
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
      <div className="row py-5 bg-form-box ">
        <div className="col-md-8 offset-2 pb-5">
          <h1 className="text-center">Create New Blog</h1>
          {CreateBlogForm()}
          {JSON.stringify(title)}
        </div>
      </div>
    </React.Fragment>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(CreateBlog);
