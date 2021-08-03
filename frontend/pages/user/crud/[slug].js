import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import UpdateBlog from "../../../components/crud/UpdateBlog";

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="row py-5 px-5 bg">
          <div className="col-md-12">
            <UpdateBlog />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
