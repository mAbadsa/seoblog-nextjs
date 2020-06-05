import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h1>الصفحة الرئيسية</h1>
      <h2>مرحبا بك</h2>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/signin">
        <a>Signin</a>
      </Link>
    </Layout>
  );
};

export default Index;
