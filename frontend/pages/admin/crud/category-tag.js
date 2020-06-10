import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Link from "next/link";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5">
          <div className="col-md-12 text-center pb-5">
            <h1>Manage Categories And Tags</h1>
          </div>
          <div className="col-md-4 offset-2">
            <p>Categories</p>
          </div>
          <div className="col-md-4 offset-2">
            <p>Tags</p>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
