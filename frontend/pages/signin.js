import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  return (
    <Layout>
      <SigninComponent redirectMessage={router.query.message} />
    </Layout>
  );
};

export default withRouter(Signin);
