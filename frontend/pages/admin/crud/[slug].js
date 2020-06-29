import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import UpdateBlog from "../../../components/crud/UpdateBlog";
import Link from "next/link";
import { withRouter } from "next/router";
// import './bg.css';

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5 px-5 bg">
          <div className="col-md-12">
            <UpdateBlog />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
