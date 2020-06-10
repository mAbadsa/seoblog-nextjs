import { useState, useEffect } from "react";
import { createCategory } from "../../actions/category";
import { isAuth, getCookie } from "../../actions/auth";
import Router from "next/router";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
    categories: [],
    removed: false,
  });
  const { name, error, success, categories, removed } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: "",
      removed: "",
    });
    createCategory({ name }, getCookie("token")).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: "" });
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
      removed: "",
    });
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
        <button type="submit" className="btn btn-outline-primary btn-block">
          Add
        </button>
      </form>
    </React.Fragment>
  );
};

export default Category;
