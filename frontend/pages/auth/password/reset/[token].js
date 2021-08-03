import Layout from "../../../../components/Layout";
import ResetForm from "../../../../components/auth/password/ResetForm";
import { withRouter } from "next/router";

const Index = ({ router }) => {
  return (
    <Layout>
      <ResetForm router={router} />
    </Layout>
  );
};

export default withRouter(Index);
