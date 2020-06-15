import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/CreateBlog";
import Link from "next/link";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5 px-5">
          <div className="col-md-12">
            <CreateBlog />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
