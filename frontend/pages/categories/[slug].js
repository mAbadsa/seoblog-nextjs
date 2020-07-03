import { withRouter } from "next/router";
import { getCategory } from "../../actions/category";
import Card from "../../components/blog/Card";

import Layout from "../../components/Layout";

const Category = ({ category, blogs }) => {
  return (
    <React.Fragment>
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
    return { category: data.category, blogs: data.blogs };
  } catch (err) {
    console.log(err);
  }
};

export default Category;
