import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import Link from "next/link";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5">
          <div className="col-md-12 text-center pb-5">
            <h1>Manage Categories And Tags</h1>
          </div>
        </div>
        <div className="row py-5 px-5">
          <div className="col-md-6">
            <p>Categories</p>
            <Category />
          </div>
          <div className="col-md-6">
            <p>Tags</p>
            <Tag />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
