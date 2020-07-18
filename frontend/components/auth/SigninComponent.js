import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import LoginByGoogle from "./LoginWithGoogle";

const SigninComponent = ({ redirectMessage }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });

    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save suer token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
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

  const showRedirctMessage = () => {
    if (redirectMessage) {
      return <div className="alert alert-danger">{redirectMessage}</div>;
    } else {
      return;
    }
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <div className="container">
        <h1 className="my-3 pb-3 text-center text-primary">Signin</h1>
        <div className="row">
          <div className="col-md-6 offset-3">{showRedirctMessage()}</div>
        </div>
        <div className="row pt-3">
          <div className="col-md-6 offset-3">
            <LoginByGoogle />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6 offset-3">
            <form onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <label>Name: </label>
                <input
                  value={name}
                  onChange={handleChange}
                  className="form-control"
                  type="text"
                  placeholder="Type your name"
                  name="name"
                />
              </div> */}
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
                  Signin
                </button>
              </div>
            </form>
            <div className="text-center pt-4">
              <Link href="auth/password/forget">
                <a className="text-primary">Forget password</a>
              </Link>
            </div>
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
      {showForm && signinForm()}
    </React.Fragment>
  );
};
export default SigninComponent;
