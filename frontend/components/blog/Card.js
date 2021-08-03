import Link from "next/link";
import moment from "moment";
import renderHtml from "react-render-html";
import Chip from "@material-ui/core/Chip";
import { API } from "../../config";

const Card = ({ blog }) => {
  const showCategories = () => {
    return blog.categories.map((c, i) => {
      return (
        <Link key={i} href={`/categories/${c.slug}`}>
          <a className="mr-1">
            <Chip
              className=""
              label={c.name}
              color="primary"
              // variant="outlined"
            />
          </a>
        </Link>
      );
    });
  };

  const showTags = () => {
    return blog.tags.map((t, i) => {
      return (
        <Link key={i} href={`/tags/${t.slug}`}>
          <a className="mr-1">
            <Chip
              className=""
              label={`#${t.name}`}
              color="primary"
              variant="outlined"
            />
          </a>
        </Link>
      );
    });
  };

  return (
    <div className="lead pb-4 pl-2 border rounded mb-2">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="py-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section className="">
        <p className="mark ml-1 py-2">
          Written by:{" "}
          <span className="text-success">
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>{blog.postedBy.name}</a>
            </Link>
          </span>{" "}
          | Published {moment(blog.createdAt).fromNow()}
        </p>
      </section>
      <div className="row my-0 mx-0">
        <div className="my-1 py-2">{showCategories()}</div>
        <div className="my-1 ml-1 py-2">{showTags()}</div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <img
            className="img img-fluid"
            src={`${API}/blogs/photo/${blog.slug}`}
            alt={blog.title}
            style={{ maxHeight: "auto", width: "100%" }}
          />
        </div>
        <div className="col-md-9">
          {" "}
          {renderHtml(blog.excerpt)}
          <Link href={`/blogs/${blog.slug}`}>
            <a className="btn btn-primary">Read more...</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
