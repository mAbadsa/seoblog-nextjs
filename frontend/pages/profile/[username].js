import Head from "next/head";
import Link from "next/link";
import { getPublicProfile } from "../../actions/user";
import { isAuth } from "../../actions/auth";
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

  console.log(user);
  console.log(blogs);

  // let blogLink;
  // if (isAuth() && isAuth().role === 1) {
  //   blogLink = `/blogs`;
  // } else if (isAuth() && isAuth().role === 0) {
  //   blogLink = `/user/blogs`;
  // }

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
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title">{user.name}</h5>
                      <a href={`${user.profile}`}>View Profile</a>
                      <p className="card-text text-muted bg-light p-2">
                        {user.about}
                      </p>
                      <p className="card-text text-muted">
                        Joined{" "}
                        <span className="text-primary">
                          {moment(user.createdAt).fromNow()}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: "auto", maxWidth: "100%" }}
                        alt="Avatar"
                      />
                    </div>
                  </div>
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
                  <Link href={`/contact`}>
                    <a className="card-link">Contact me</a>
                  </Link>
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
