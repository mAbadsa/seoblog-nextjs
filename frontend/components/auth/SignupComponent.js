import { useState, useEffect } from "react";
import { preSignup, isAuth } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });

    preSignup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <div className="container">
        <h1 className="my-3 pb-3 text-center text-primar">Signup</h1>
        <div className="row">
          <div className="col-md-6 offset-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Name: </label>
                <input
                  value={name}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder="Type your name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Email: </label>
                <input
                  value={email}
                  onChange={handleChange}
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Password: </label>
                <input
                  value={password}
                  onChange={handleChange}
                  className="form-control"
                  type="password"
                  placeholder="Type your password"
                  name="password"
                />
              </div>
              <div>
                <button className="btn btn-outline-primary btn-block">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};
export default SignupComponent;
