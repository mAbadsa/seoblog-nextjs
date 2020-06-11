import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
} from "../../actions/category";
import { isAuth, getCookie } from "../../actions/auth";
import Router from "next/router";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
    message: "",
    condition: "",
  });

  const [open, setOpen] = useState(false);

  const {
    name,
    error,
    success,
    categories,
    removed,
    reload,
    message,
    condition,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, getCookie("token")).then((data) => {
      if (data.error) {
        handleClick();
        setValues({
          ...values,
          error: data.error,
          success: false,
          reload: false,
          removed: false,
          message: "Add category is faild",
          condition: "error",
        });
      } else {
        handleClick();
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: !removed,
          reload: !reload,
          message: "Add category is success",
          condition: "success",
        });
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
      removed: false,
    });
  };

  useEffect(() => {
    loadCategory();
  }, [reload]);

  const loadCategory = () => {
    return getCategories().then(({ data }) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          message: "Get category is faild",
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          categories: [...data],
          removed: false,
        });
      }
    });
  };

  const deleteConfirm = (slug) => {
    const answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug, getCookie("token")).then((data) => {
        if (data.error) {
          handleClick();
          setValues({
            ...values,
            error: data.error,
            success: false,
            message: "Delete category is faild",
            condition: "error",
          });
        } else {
          handleClick();
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            categories: [],
            reload: !reload,
            removed: !removed,
            message: "Delete category succesed",
            condition: "success",
          });
        }
      });
    }
  };

  let categoryListItems = categories.map((category) => {
    return (
      <button
        onDoubleClick={() => deleteConfirm(category.slug)}
        className="btn btn-outline-primary mr-1 my-1"
        key={category._id}
      >
        {category.name}
      </button>
    );
  });

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name: </label>
          <input
            value={name}
            onChange={handleChange}
            className="form-control"
            type="text"
            placeholder="Type category name"
            name="name"
          />
        </div>
        <button
          //   onClick={handleClick}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Add category
        </button>
      </form>
      <div className="">{categoryListItems}</div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
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

export default Category;
