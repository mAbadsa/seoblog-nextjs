import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import GoogleLogin from "react-google-login";

const LoginByGoogle = () => {
  const responseGoogle = (response) => {
    const tokenId = response.tokenId;
    const user = { tokenId };
    loginWithGoogle(user).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        authenticate(data, () => {
          if (isAuth && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };
  return (
    <React.Fragment>
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </React.Fragment>
  );
};

export default LoginByGoogle;
