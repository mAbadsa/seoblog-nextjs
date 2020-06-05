import Layout from "../components/Layout";
import Link from "next/link";

const Signup = () => {
  return (
    <Layout>
      <h1>إنشاء حساب جديد</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
};

export default Signup;
