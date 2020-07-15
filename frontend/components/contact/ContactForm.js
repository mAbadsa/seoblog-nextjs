import { useState } from "react";
import Link from "next/link";

const ContactForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    messgae: "",
    success: false,
    error: false,
  });

  const { name, email, message, success, error } = values;

  return (
    <React.Fragment>
      <form>
        <div className="form-group">
          <label>Name: </label>
          <input className="form-control" type="text" value={name} />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input className="form-control" type="email" value={email} />
        </div>
        <div className="form-group">
          <label>Message: </label>
          <textarea className="form-control" value={message}></textarea>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ContactForm;
