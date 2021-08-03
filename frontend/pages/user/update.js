import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";
import ProfileUpdate from "../../components/user/ProfileUpdate";
import Link from "next/link";
import Profile from "../profile/[username]";

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row py-5">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
