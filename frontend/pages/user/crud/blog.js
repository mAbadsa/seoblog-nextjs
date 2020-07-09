import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import CreateBlog from "../../../components/crud/CreateBlog";
import Link from "next/link";

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="row py-5 px-5 bg">
          <div className="col-md-12">
            <CreateBlog />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
