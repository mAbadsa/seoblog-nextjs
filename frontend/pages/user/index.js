import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";
import Link from "next/link";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row py-5">
            <div className="col-md-12 text-center pb-5">
              <h1>User Dashboard</h1>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="user/crud/blog">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="user/crud/blogs">
                    <a>Update/Delete Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <a href="user/update">Update Profile</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 offset-2">__RIGHT__</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
