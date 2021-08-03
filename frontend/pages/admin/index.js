import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-md-12 text-center pb-5">
              <h1>Admin Dashboard</h1>
            </div>
            <div className="col-md-4">
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
                  <a href="admin/crud/blog">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="admin/crud/blogs">
                    <a>Update Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 offset-2">__RIGHT__</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
