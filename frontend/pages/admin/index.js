import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="row py-5">
          <div className="col-md-12 text-center pb-5">
            <h1>Admin Dashboard</h1>
          </div>
          <div className="col-md-4 offset-2">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="admin/crud/category-tag">
                  <a>Create Category</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="admin/crud/category-tag">
                  <a>Create Tag</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="admin/crud/blog">
                  <a>Create Blog</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 offset-2">__RIGHT__</div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
