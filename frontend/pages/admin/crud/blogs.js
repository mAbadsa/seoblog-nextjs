import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";
import Link from "next/link";
// import './bg.css';

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row py-5">
            <div className="col-md-12 bg-light">
              <h2 className="text-md-left text-primary">Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogRead />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
