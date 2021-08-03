import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { createBlog } from "../../actions/blog";
import { isAuth, getCookie } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { QuillModules, QuillFormats } from "../../helpers/quill";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: true });
import "../../node_modules/react-quill/dist/quill.snow.css";
// import "./createBlog.css";

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
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setCheckCat] = useState([]);
  const [checkedTag, setCheckTag] = useState([]);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    error: "",
    errorSize: "",
    formData: "",
    success: false,
    title: "",
    hidePublishButton: false,
    message: "",
    condition: "",
  });

  const {
    error,
    errorSize,
    success,
    formData,
    title,
    hidePublishButton,
    message,
    condition,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    return getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data.categories);
      }
    });
  };

  const initTags = () => {
    return getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data.tags);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, getCookie("token")).then((data) => {
      if (data.error) {
        handleClick();
        setValues({
          ...values,
          error: data.error,
          message: data.error,
          success: false,
          condition: "error",
        });
      } else {
        handleClick();
        setValues({
          ...values,
          title: "",
          error: "",
          success: true,
          message: `A new blog titled ${data.blog.title} is created`,
          condition: "success",
        });
        setBody("");
        // setCategories([]);
        // setTags([]);
        setCheckTag([]);
        setCheckCat([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    console.log(typeof formData);
    formData.set("body", e);
    if (window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleCatToggle = (id) => () => {
    setValues({ ...values, error: "" });

    // check category is exist
    const catCheckedExistIndex = checkedCat.indexOf(id);

    const all = [...checkedCat];

    if (catCheckedExistIndex === -1) {
      all.push(id);
    } else {
      all.splice(catCheckedExistIndex, 1);
    }
    if (all.length === 0) {
      setValues({
        ...values,
        condition: "error",
        message: "Add one category at least",
      });
    }
    setCheckCat(all);

    formData.set("categories", all);
  };

  const handleTagToggle = (id) => () => {
    setValues({ ...values, error: "" });

    // check category is exist
    const tagCheckedExistIndex = checkedTag.indexOf(id);

    const all = [...checkedTag];

    if (tagCheckedExistIndex === -1) {
      all.push(id);
    } else {
      all.splice(tagCheckedExistIndex, 1);
    }
    if (all.length === 0) {
      setValues({
        ...values,
        condition: "error",
        message: "Add one tag at least",
      });
    }
    setCheckTag(all);

    formData.set("tags", all);
  };

  // Snackbar handling
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            modules={QuillModules}
            formats={QuillFormats}
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

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => {
        return (
          <li className="list-unstyled" key={i}>
            <input
              onChange={handleCatToggle(c._id)}
              type="checkbox"
              className="mr-2"
            />
            <label className="form-check-label">{c.name}</label>
          </li>
        );
      })
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => {
        return (
          <li className="list-unstyled" key={i}>
            <input
              onChange={handleTagToggle(t._id)}
              type="checkbox"
              className="mr-2"
            />
            <label className="form-check-label">{t.name}</label>
          </li>
        );
      })
    );
  };

  return (
    <React.Fragment>
      <div className="row py-5 bg-form-box px-2">
        <div className="col-md-8 pb-5">
          <h1 className="text-center">Create New Blog</h1>
          {CreateBlogForm()}
        </div>
        <div className="col-md-4 bg-light rounded">
          <div className="form-group pt-3">
            <h5>Featured image</h5>
            <Divider />
            <small className="text-info">Max size: 1mb</small>
            <label className="btn btn-outline-primary mt-2">
              Upload featured image
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div className="pt-2">
            <h5>Categories</h5>
            <Divider />
            <ul
              className="pt-2"
              style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
              {showCategories()}
            </ul>
          </div>
          <h5>Tags</h5>
          <Divider />
          <ul
            className="pt-2"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
          >
            {showTags()}
          </ul>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={`${condition}`}
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default withRouter(CreateBlog);
