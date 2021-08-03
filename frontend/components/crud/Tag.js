import { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import { createTag, getTags, getTag, deleteTag } from "../../actions/tag";
import { isAuth, getCookie } from "../../actions/auth";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    alignContent: "start",
    minHeight: "8rem",
    flexWrap: "wrap",
    padding: "0.8rem",
    backgroundColor: "#8ac5ff",
    borderRadius: "1rem",
    "& > *": {
      margin: theme.spacing(0.1),
    },
  },
  MuiChipColorPrimary: {
    backgroundColor: "#007bff",
    margin: theme.spacing(0.2),
  },
}));

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
    message: "",
    condition: "",
  });

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const {
    name,
    error,
    success,
    tags,
    removed,
    reload,
    message,
    condition,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag({ name }, getCookie("token")).then((data) => {
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
    loadTag();
  }, [reload]);

  const loadTag = () => {
    return getTags().then((data) => {
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
          tags: data.tags,
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
      deleteTag(slug, getCookie("token")).then((data) => {
        if (data.error) {
          handleClick();
          setValues({
            ...values,
            error: data.error,
            success: false,
            message: "Delete tag is faild",
            condition: "error",
          });
        } else {
          handleClick();
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            tags: [],
            reload: !reload,
            removed: !removed,
            message: "Delete tag succesed",
            condition: "success",
          });
        }
      });
    }
  };

  let tagListItems = tags.map((tag) => {
    return (
      <Chip
        className={classes.MuiChipColorPrimary}
        onDelete={() => deleteConfirm(tag.slug)}
        label={tag.name}
        key={tag._id}
        color="primary"
      />
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
          className="btn btn-outline-primary mb-2"
        >
          Add tag
        </button>
      </form>
      <div className={classes.root}>{tagListItems}</div>
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

export default Tag;
