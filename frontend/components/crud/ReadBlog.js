import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getBlogs, deleteBlog } from "../../actions/blog";
import { isAuth, getCookie } from "../../actions/auth";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";

import moment from "moment";

const ReadBlog = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const blogsList = await getBlogs(username);
      setBlogs(blogsList.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Blog from DataBase
  const deleteConfirm = async (slug) => {
    const answer = window.confirm(
      "Are you sure you want to delete your blogs?"
    );
    if (answer) {
      try {
        const deletedBlog = await deleteBlog(slug, token);
        handleClick();
        setMessage(deletedBlog.message);
        loadBlogs();
      } catch (err) {
        handleClick();
        console.log(err);
      }
    }
  };

  // Show update blog button in DOM
  function showUpdateButton(slug) {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${slug}`}>
          <a className="btn btn-sm btn-warning mt-2">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${slug}`}>
          <a style={{ width: "60px" }} className="btn btn-sm btn-warning mt-2">
            Update
          </a>
        </Link>
      );
    }
  }

  // Show Blogs in DOM
  const showBlogs = () => {
    return blogs
      .map((blog, i) => {
        return (
          <li key={i} className="list-group-item">
            <div className="float-left">
              <h3 className="text-md-left">{blog.title}</h3>
              <p className="text-sm-left my-0 font-italic">
                Publish on:{" "}
                <span className="text-primary">
                  {moment(blog.updatedAt).fromNow()}
                </span>
              </p>
              <p className="text-sm-left my-0 font-italic">
                Written by:{" "}
                <span className="text-primary">{blog.postedBy.name}</span>
              </p>
            </div>
            <div className="float-right d-flex align-items-center flex-column">
              <button
                className="btn btn-sm btn-danger mt-2"
                style={{ width: "60px" }}
                onClick={() => deleteConfirm(blog.slug)}
              >
                Delete
              </button>
              {showUpdateButton(blog.slug)}
            </div>
          </li>
        );
      })
      .reverse();
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
      <div className="row py-5 bg-light">
        <div className="col-md-12">
          <ul className="list-group">{showBlogs()}</ul>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ReadBlog;
