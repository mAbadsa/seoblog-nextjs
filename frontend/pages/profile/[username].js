import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import { API, APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";
import moment from "moment";

const Profile = ({ user, blogs, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {user.username} | {APP_NAME}
        </title>
        <meta name="description" content={`Blogs by ${user.username}`} />
        <link
          rel="canonical"
          href={`${DOMAIN_NAME}/profile/${query.username}`}
        />
        <meat property="og:title" content={`${user.name} | ${APP_NAME}`} />
        <meta property="og:description" content={`Blogs by ${user.username}`} />
        <meat property="og:type" content="website" />
        <meat
          property="og:url"
          content={`${DOMAIN_NAME}/profile/${query.username}`}
        />
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

  const showUserBlogs = () => {
    return blogs.map((b, i) => (
      <div className="" key={i}>
        <div className="border-bottom">
          <Link href={`/blogs/${b.slug}`}>
            <a className="">{b.title}</a>
          </Link>
          <p className="">{b.createdAt}</p>
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  {/* <Link href={`${profileLink}/`}>
                    <a href={`${user.profile}`}>View Profile</a>
                  </Link> */}
                  <a href={`${user.profile}`}>View Profile</a>
                  <p className="card-text">
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary py-4 px-4 text-white">
                    Recent blogs by {user.name}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary py-4 px-4 text-white">
                    Message {user.name}
                  </h5>
                  <a href={`${user.profile}`}>View Profile</a>
                  <p className="card-text">contact form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

Profile.getInitialProps = async ({ query }) => {
  try {
    const userProfileInfo = await getPublicProfile(query.username);
    return {
      user: userProfileInfo.user,
      blogs: userProfileInfo.blogs,
      query,
    };
  } catch (error) {
    return { error };
  }
};

export default Profile;
