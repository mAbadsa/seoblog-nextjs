import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { getProfile, updateUser } from "../../actions/user";
import Router from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ProfileUpdate = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    photo: "",
    userData: "",
    error: false,
    success: false,
    loading: false,
    about: "",
    condition: "",
    message: ""
  });

  const token = getCookie("token");

  const {
    username,
    email,
    name,
    password,
    photo,
    userData,
    success,
    loading,
    error,
    about,
    condition,
    message
  } = values;

  const getInitProfileData = async () => {
    try {
      const data = await getProfile(token);
      setValues({
        ...values,
        username: data.username,
        email: data.email,
        name: data.name,
        about: data.about,
      });
    } catch (error) {
      setValues({ ...values, error });
    }
  };

  useEffect(() => {
    getInitProfileData();
  }, []);

  const handleChange = (name) => (e) => {
    let userDataForm = new FormData();
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    userDataForm.set(name, value);
    setValues({ ...values, [name]: value, userData: userDataForm });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    try {
      const userDataUpdated = await updateUser(userData, token);

      setValues({
        ...values,
        success: true,
        error: false,
        username: userDataUpdated.username,
        email: userDataUpdated.email,
        name: userDataUpdated.name,
        about: userDataUpdated.about,
        password: "",
        sucess: true,
        condition: "success",
        messgae: "Update successed",
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
      setValues({
        ...values,
        success: false,
        error: true,
        condition: "error",
        message: error,
      });
      setOpen(true);
    }
  };

  const profileUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="btn btn-outline-primary btn-block">
            Profile Photo
            <input
              onChange={handleChange("file")}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={handleChange("username")}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>About</label>
          <textarea
            value={about}
            onChange={handleChange("about")}
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-primary">
            Save Update
          </button>
        </div>
      </form>
    );
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>User Avatar Image</h5>
            <img src="" alt="Avatar" />
          </div>
          <div className="col-md-8">{profileUpdateForm()}</div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={`${condition}`}
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ProfileUpdate;
