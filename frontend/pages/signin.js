import Layout from "../components/Layout";
import Link from "next/link";

const Signin = () => {
  return (
    <Layout>
      <h1>تسجيل الدخول</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
};

export default Signin;
