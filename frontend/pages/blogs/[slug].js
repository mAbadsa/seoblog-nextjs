import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import renderHtml from "react-render-html";
import { getSingleBlog } from "../../actions/blog";
import { API, APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";
import Chip from "@material-ui/core/Chip";
import moment from "moment";

const singleBlog = ({ blog, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {blog.slug} | {APP_NAME}
        </title>
        <meta name="description" content={`${blog.mdesc}`} />
        <link rel="canonical" href={`${DOMAIN_NAME}/blogs/${query.slug}`} />
        <meat property="og:title" content={`${blog.title} | ${APP_NAME}`} />
        <meta property="og:description" content={`${blog.mdesc}`} />
        <meat property="og:type" content="website" />
        <meat
          property="og:url"
          content={`${DOMAIN_NAME}/blogs/${query.slug}`}
        />
        <meat property="og:site_name" content={`${APP_NAME}`} />
        <meat property="og:image" content={`${API}/blogs/photo/${blog.slug}`} />
        <meat
          property="og:image:secure_url"
          content={`${API}/blogs/photo/${blog.slug}`}
        />
        <meat property="og:image:type" content="image/jpg" />
        <meat property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  const showCategories = () => {
    return blog.categories.map((c, i) => {
      return (
        <Link key={i} href={`/categories/${c.slug}`}>
          <a className="mr-1">
            <Chip
              className=""
              label={c.name}
              color="primary"
              variant="outlined"
            />
          </a>
        </Link>
      );
    });
  };

  const showTags = () => {
    return blog.tags.map((t, i) => {
      return (
        <Link key={i} href={`/tags/${t.slug}`}>
          <a className="mr-1">
            <Chip
              className=""
              label={t.name}
              color="primary"
              // variant="outlined"
            />
          </a>
        </Link>
      );
    });
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row justify-content-center">
                  <img
                    className="img img-fluid featured-img"
                    src={`${API}/blogs/photo/${blog.slug}`}
                    alt={blog.title}
                  />
                </div>
              </section>
              <section>
                <div className="container">
                  <h1 className="display-2 py-3 bg-light">{blog.title}</h1>
                  <p className="lead py-1">
                    Written by:{" "}
                    <span className="text-primary">{blog.postedBy.name}</span> |
                    Published{" "}
                    <span className="text-primary">
                      {moment(blog.createdAt).fromNow()}
                      primary
                    </span>
                  </p>
                  <div className="py-2 px-5">
                    {showCategories()}
                    {showTags()}
                  </div>
                </div>
              </section>
              <div className="container">
                <section className="blog-body">
                  <div className="col-md-12 lead pt-5">
                    {renderHtml(blog.body)}
                  </div>
                </section>
              </div>
              <div className="container">
                <h4 className="text-center py-5">Related blogs</h4>
                <hr />
                <p>Show related blogs</p>
              </div>
              <div className="container">
                <h4 className="text-center py-5">Show Comments</h4>
              </div>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

singleBlog.getInitialProps = ({ query }) => {
  return getSingleBlog(query.slug).then((data) => {
    if (data.error) {
    } else {
      return {
        blog: data.blog,
        query,
      };
    }
  });
};

export default singleBlog;
