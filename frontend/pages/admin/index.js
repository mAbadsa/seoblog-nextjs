import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <h1>Admin Dashboard</h1>
        <h2>مرحبا بك</h2>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
