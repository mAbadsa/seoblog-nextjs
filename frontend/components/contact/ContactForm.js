import { useState } from "react";
import { sendContactEmail } from "../../actions/contact";

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    messgae: "",
    success: false,
    error: false,
    buttonText: "Send Message",
  });

  const { name, email, message, success, error, buttonText } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    sendContactEmail({ authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: data.success,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send message",
    });
  };

  const showSuccessMsg = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us</div>
    );

  const showErrorMsg = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <React.Fragment>
      {showSuccessMsg()}
      {showErrorMsg()}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="lead">Name: </label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label className="lead">Email: </label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="lead">Message: </label>
          <textarea
            className="form-control"
            value={message}
            onChange={handleChange("message")}
            required
            rows="5"
          ></textarea>
        </div>
        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ContactForm;
