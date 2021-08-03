import { useState } from "react";
import { forgetPassword } from "../../../actions/auth";

const ForgetForm = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: false,
  });

  const { email, message, error } = values;

  const handleChange = (e) => {
    const email = e.target.value;
    setValues({ ...values, email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", message: "" });
    forgetPassword(email).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          message: "",
        });
      } else {
        setValues({
          ...values,
          error: "",
          message: data.message,
          email: "",
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showSuccess = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-2">
            <h2 className="text-primary text-center py-5">Forget password</h2>
            {showError()}
            {showSuccess()}
            <form className="py-2" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="lead">Email: </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Send reset link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgetForm;
