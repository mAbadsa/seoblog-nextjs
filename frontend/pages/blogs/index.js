import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { listAllBlogsCategoriesTags } from "../../actions/blog";
import { API, APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import renderHtml from "react-render-html";
import Card from "../../components/blog/Card";

const Blogs = ({
  blogs,
  tags,
  categoreis,
  size,
  // totalBlogs,
  // blogsLimit,
  // blogsSkip,
  router,
}) => {
  // const [limit, setLimit] = useState(blogsLimit);
  // const [skip, setSkip] = useState(0);
  // const [size, setSize] = useState(totalBlogs);
  // const [loadedBlogs, setLoadedBlogs] = useState([]);

  const head = () => {
    return (
      <Head>
        <title>Programming Blog | {APP_NAME}</title>
        <meta name="description" content={`${blogs[0].mdesc}`} />
        <link rel="canonical" href={`${DOMAIN_NAME}${router.pathname}`} />
        <meat
          property="og:title"
          content={`Latest web development tutorils | ${APP_NAME}`}
        />
        <meta property="og:description" content={`${blogs[0].mdesc}`} />
        <meat property="og:type" content="website" />
        <meat property="og:url" content={`${DOMAIN_NAME}${router.pathname}`} />
        <meat property="og:site_name" content={`${APP_NAME}`} />
        <meat
          property="og:image"
          content={`${DOMAIN_NAME}/static/images/seoblog.jpg`}
        />
        <meat
          property="og:image:secure_url"
          content={`${DOMAIN_NAME}/static/images/seoblog.jpg`}
        />
        <meat property="og:image:type" content="image/jpg" />
        <meat property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };
  const getBlogElm = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
        </article>
      );
    });

    // return blogs.map((blog, i) => {
    //   return (
    //     <article key={i}>
    //       <div className="lead pb-4 pl-2 border rounded mb-2">
    //         <headers>
    //           <Link href={`/blogs/${blog.slug}`}>
    //             <a>
    //               <h2 className="py-3 font-weight-bold">{blog.title}</h2>
    //             </a>
    //           </Link>
    //         </headers>
    //         <section className="">
    //           <p className="mark ml-1 py-2">
    //             Written by:{" "}
    //             <span className="text-success">{blog.postedBy.name}</span> |
    //             Published {moment(blog.createdAt).fromNow()}
    //           </p>
    //         </section>
    //         <section className="">
    //           <p className="ml-1 py-2">Categories and Tags</p>
    //         </section>
    //         <div className="row">
    //           <div className="col-md-4">__IMAGE__</div>
    //           <div className="col-md-8">
    //             {" "}
    //             {renderHtml(blog.excerpt)}
    //             <Link href={`/blogs/${blog.slug}`}>
    //               <a className="btn btn-primary">Read more...</a>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </article>
    //   );
    // });
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming blogs and tutorials
                </h1>
                <section>
                  <p>Show categories and tags</p>
                </section>
              </div>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-md-12 pt-3">In here we will show all blogs</div> */}
              <div className="col-md-12 pt-3">{getBlogElm()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = async () => {
  let limit = 2;
  let skip = 0;
  try {
    const data = await listAllBlogsCategoriesTags(limit, skip);
    return {
      blogs: data.blogs,
      categoreis: data.categoreis,
      tags: data.tags,
      totalBlogs: data.size,
      blogsLimit: limit,
      blogsSkip: skip,
    };
  } catch (err) {
    return console.log(err);
  }
};

export default withRouter(Blogs);
