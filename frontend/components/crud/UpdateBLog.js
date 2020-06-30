import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import { withRouter } from "next/router";
import { getSingleBlog, updateBlog } from "../../actions/blog";
import { isAuth, getCookie } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { API } from "../../config";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

const Spiner = () => {
  return (
    <div className="text-center">
      <p>LOADING...</p>
    </div>
  );
};

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: true,
  loading: () => <Spiner />,
});
import "../../node_modules/react-quill/dist/quill.snow.css";

const UpdateBlog = ({ router }) => {
  const [values, setValues] = useState({
    error: "",
    success: false,
    title: "",
    formData: "",
    message: "",
  });
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setCheckCat] = useState([]);
  const [checkedTag, setCheckTag] = useState([]);

  const { error, success, title, formData, message } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    getInitBlog();
    initCategories();
    initTags();
  }, [router]);

  const getInitBlog = async () => {
    if (router.query.slug) {
      try {
        const { blog } = await getSingleBlog(router.query.slug);
        setValues({ ...values, title: blog.title });
        setBody(blog.body);
        setCategoriesArray(blog.categories);
        setTagsArray(blog.tags);
      } catch (err) {
        console.log(err);
        setValues({ ...values, error: err, message: "Error occurred" });
      }
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let categoriesIdArray = [];
    blogCategories.map((c, i) => {
      categoriesIdArray.push(c._id);
    });
    setCheckCat(categoriesIdArray);
  };
  const setTagsArray = (blogTags) => {
    let tagsIdArray = [];
    blogTags.map((t, i) => {
      tagsIdArray.push(t._id);
    });
    setCheckTag(tagsIdArray);
  };

  const initCategories = async () => {
    const data = await getCategories();
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setCategories(data.categories);
    }
  };

  const initTags = async () => {
    try {
      const data = await getTags();
      setTags(data.tags);
    } catch (error) {
      console.log(error);
      setValues({ ...values, error: data.error });
    }
  };

  const editBlog = (e) => {
    e.preventDefault();
    try {
      const updatedBlog = updateBlog(router.query.slug, formData, token);
      setValues({
        ...values,
        message: `Update blog with title ${updatedBlog.title} successed`,
        success: true,
      });
      handleClick();
      if (isAuth() && isAuth().role === 1) {
        Router.replace(`/admin/crud/blogs`);
      } else if (isAuth() && isAuth().role === 0) {
        Router.replace(`/user/crud/${router.query.slug}`);
      }
    } catch (err) {
      setValues({
        ...values,
        error: err,
        message: "Error occurred",
        success: false,
      });
      handleClick();
    }
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, formData, [name]: value, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
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

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => {
        return (
          <li className="list-unstyled" key={i}>
            <input
              onChange={handleCatToggle(c._id)}
              checked={checkedCat.indexOf(c._id) === -1 ? false : true}
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
              checked={checkedTag.indexOf(t._id) === -1 ? false : true}
              type="checkbox"
              className="mr-2"
            />
            <label className="form-check-label">{t.name}</label>
          </li>
        );
      })
    );
  };

  const UpdateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            onChange={handleBody}
            placeholder="Write blog content..."
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Update
        </button>
      </form>
    );
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
  return (
    <React.Fragment>
      <div className="row py-5 bg-form-box px-2">
        <div className="col-md-8 pb-5">
          <h1 className="text-center">Update Blog</h1>
          {UpdateBlogForm()}
        </div>
        <div className="col-md-4 bg-light rounded">
          <div className="form-group pt-3">
            <h5>Featured image</h5>
            <Divider />
            <div>
              <small className="text-info">Max size: 1mb</small>
            </div>
            <label className="btn btn-outline-primary mt-2">
              Upload featured image
              <input
                onChange={handleChange("photo")}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
            <label className="d-block">
              <img
                className=""
                style={{ maxHeight: "50px" }}
                src={`${API}/blogs/photo/${router.query.slug}`}
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
        <pre style={{ backgroundColor: "#852532" }}>
          {JSON.stringify(categories, null, 2)}
        </pre>
        <pre style={{ backgroundColor: "#159592" }}>
          {JSON.stringify(tags, null, 2)}
        </pre>
        <pre style={{ backgroundColor: "#ff2532" }}>
          {JSON.stringify(tags, null, 2)}
        </pre>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default withRouter(UpdateBlog);
