import Head from "next/head";

import { getTag } from "../../actions/tag";
import Card from "../../components/blog/Card";
import Layout from "../../components/Layout";
import { APP_NAME, DOMAIN_NAME, FB_APP_ID } from "../../config";

const Tag = ({ tag, blogs, query }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {tag.name} | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <link
          rel="canonical"
          href={`${DOMAIN_NAME}/categories/${query.slug}`}
        />
        <meat property="og:title" content={`${tag.name} | ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <meat property="og:type" content="website" />
        <meat
          property="og:url"
          content={`${DOMAIN_NAME}/categories/${query.slug}`}
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
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="font-weight-bold display-4 text-primary text-center py-5">
                  Tag name
                </h1>
                {blogs.map((blog, i) => {
                  return <Card key={i} blog={blog} />;
                })}
                <pre className="bg-dark text-left text-primary">
                  {JSON.stringify(blogs, null, 2)}
                </pre>
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = async ({ query }) => {
  try {
    const data = await getTag(query.slug);
    return { tag: data.tag, blogs: data.blogs, query };
  } catch (err) {
    console.log(err);
  }
};

export default Tag;
