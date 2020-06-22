import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import { getSingleBlog } from "../../actions/blog";
import { APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";
import Chip from "@material-ui/core/Chip";

const singleBlog = ({ router }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section></section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

export default withRouter(singleBlog);
