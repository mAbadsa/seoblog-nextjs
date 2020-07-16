import Layout from "../../../../components/Layout";
import { signup } from "../../../../actions/auth";
import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { set } from "js-cookie";

const ActivationAccount = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
    erorr: false,
    message: "",
    success: false,
    loading: false,
  });

  const {
    name,
    email,
    password,
    token,
    message,
    error,
    success,
    loading,
  } = values;

  useEffect(() => {
    let token = router.query.token;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setValues({ ...values, name: "", email: "", password: "" });
    signup({ token }).then((data) => {
      if (data.erorr) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          success: false,
        });
      } else {
        setValues({
          ...values,
          name,
          message: data.message,
          success: true,
          error: false,
          loading: false,
        });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showSuccess = () =>
    success ? <div className="alert alert-success">{message}</div> : "";

  return (
    <Layout>
      <div className="conatiner-fluid">
        <div className="row">
          <div className="col-md-8 offset-2 pt-3 mt-3">
            {showLoading()}
            {showError()}
            {showSuccess()}
            <button
              className="btn btn-outline-primary mt-3"
              type="submit"
              onClick={handleSignup}
            >
              Activation account
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(ActivationAccount);
