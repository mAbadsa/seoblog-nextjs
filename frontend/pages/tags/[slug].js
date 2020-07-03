import { withRouter } from "next/router";
import { getTag } from "../../actions/tag";
import Card from "../../components/blog/Card";

import Layout from "../../components/Layout";

const Tag = ({ tag, blogs }) => {
  return (
    <React.Fragment>
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
    console.log(data);
    return { tag: data.tag, blogs: data.blogs };
  } catch (err) {
    console.log(err);
  }
};

export default Tag;
