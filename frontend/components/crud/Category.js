import { useState, useEffect } from "react";
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
  });

  const { name, error, success, categories, removed, reload } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setValues({
    //   ...values,
    //   [e.target.name]: e.target.value,
    //   error: false,
    //   success: false,
    //   removed: false,
    //   reload: false,
    // });
    createCategory({ name }, getCookie("token")).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          reload: false,
          removed: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: !removed,
          reload: !reload,
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
        setValues({ ...values, error: data.error, success: false });
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

  const successMsg = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const errorMsg = () => {
    if (error) {
      return <p className="text-danger">Category is exist!</p>;
    }
  };

  const removedMsg = () => {
    if (removed) {
      return <p className="text-danger">Category is removed!</p>;
    }
  };

  //   const handleListOfCategories = () => {
  //     getCategories().then((data) => {
  //       if (data.data.error) {
  //         setValues({ ...values, error: data.data.error, success: false });
  //       } else {
  //         setValues({
  //           ...values,
  //           error: false,
  //           success: true,
  //           name: "",
  //           categories: [...data.data],
  //         });
  //       }
  //     });
  //   };

  const deleteConfirm = (slug) => {
    const answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug, getCookie("token")).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            categories: [],
            reload: !reload,
            removed: !removed,
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

  return (
    <React.Fragment>
      {successMsg()}
      {errorMsg()}
      {removedMsg()}
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
        <button type="submit" className="btn btn-primary mb-2">
          Add category
        </button>
      </form>
      <div className="">{categoryListItems}</div>
    </React.Fragment>
  );
};

export default Category;
