import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import Router from "next/router";
import { signout, isAuth } from "../actions/auth";
import Search from "./blog/Search";
import NProgress from "nprogress";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import "../node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink style={{ cursor: "pointer" }} className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <>
              <NavItem>
                <Link href="/blogs">
                  <NavLink style={{ cursor: "pointer" }}>Blogs</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/contact">
                  <NavLink style={{ cursor: "pointer" }}>Contact</NavLink>
                </Link>
              </NavItem>
            </>
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink style={{ cursor: "pointer" }}>
                    {`${isAuth().name}'s`} Dashboard
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink style={{ cursor: "pointer" }}>
                    {`${isAuth().name}'s`} Dashboard
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() ? (
              <>
                <NavItem>
                  {/* <Link href="/signin"> */}
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => Router.replace("/signin"))}
                  >
                    Signout
                  </NavLink>
                  {/* </Link> */}
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            <NavItem>
              <a
                href="/user/crud/blog"
                className="btn btn-primary text-white"
                style={{ cursor: "pointer" }}
              >
                Write a blog
              </a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;
