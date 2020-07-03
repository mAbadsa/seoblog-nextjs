import Head from "next/head";
import { getCategory } from "../../actions/category";
import Card from "../../components/blog/Card";

import Layout from "../../components/Layout";

const Category = ({ query, category, blogs }) => {
  const head = () => {
    return (
      <Head>
        <title>
          {category.name} | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best programming tutorials on ${category.name}`}
        />
        <link
          rel="canonical"
          href={`${DOMAIN_NAME}/categories/${query.slug}`}
        />
        <meat property="og:title" content={`${category.name} | ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${category.name}`}
        />
        <meat property="og:type" content="website" />
        <meat
          property="og:url"
          content={`${DOMAIN_NAME}/categories/${query.slug}`}
        />
        <meat property="og:site_name" content={`${APP_NAME}`} />
        <meat property="og:image" content={`${API}/blogs/photo/${blog.slug}`} />
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
                  Category name
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

Category.getInitialProps = async ({ query }) => {
  try {
    const data = await getCategory(query.slug);
    console.log(data);
    return { category: data.category, blogs: data.blogs, query };
  } catch (err) {
    console.log(err);
  }
};

export default Category;
