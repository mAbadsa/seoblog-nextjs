import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import ReadBlog from "../../../components/crud/ReadBlog";
import { isAuth } from "../../../actions/auth";

const Blog = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="row py-5 px-5 bg">
          <div className="col-md-12">
            <h2>Update Page</h2>
            <ReadBlog username={username} />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
