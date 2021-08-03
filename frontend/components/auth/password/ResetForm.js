import { useState } from "react";
import { resetPassword } from "../../../actions/auth";

const ResetForm = ({ router }) => {
  const [values, setValues] = useState({
    newPassword: "",
    message: "",
    error: false,
  });

  const { newPassword, message, error } = values;

  const handleChange = (e) => {
    const password = e.target.value;
    setValues({ ...values, newPassword: password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", message: "" });
    resetPassword(router.query.token, newPassword).then((data) => {
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
          newPassword: "",
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
            <h2 className="text-primary text-center py-5">Reset password</h2>
            {showError()}
            {showSuccess()}
            <form className="py-2" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="lead">Password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Reset password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetForm;
