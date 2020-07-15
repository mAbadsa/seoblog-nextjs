import Layout from "../components/Layout";
import ContactForm from "../components/contact/ContactForm";

const Index = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-2">
            <h1 className="text-center text-primary py-3">Contact Form</h1>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
