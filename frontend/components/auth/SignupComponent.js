import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setValues({
    //   [e.target.name]: e.target.value,
    // });
    console.log(values);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const signupForm = () => {
    return (
      <div className="container">
        <h1 className="my-3 pb-3">Signup</h1>
        <div className="row">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name: </label>
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
                <label>Email: </label>
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
                <label>Password: </label>
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
                <button className="btn btn-primary">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return <React.Fragment>{signupForm()}</React.Fragment>;
};
export default SignupComponent;
