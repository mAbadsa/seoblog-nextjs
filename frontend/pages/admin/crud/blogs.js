import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Link from "next/link";
import ReadBlog from "../../../components/crud/ReadBlog";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5 px-5 bg">
          <div className="col-md-12">
            <h2>Update Page</h2>
            <ReadBlog />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
