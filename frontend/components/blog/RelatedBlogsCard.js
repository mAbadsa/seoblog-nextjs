import Link from "next/link";
import moment from "moment";
import renderHtml from "react-render-html";
import { API } from "../../config";

const RelatedBlogsCard = ({ blog }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <img
          className="img img-fluid"
          src={`${API}/blogs/photo/${blog.slug}`}
          alt={blog.title}
          style={{ maxHeight: "100px", width: "auto", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="card-title">
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h5 className="py-3 font-weight-bold">{blog.title}</h5>
              </a>
            </Link>
          </div>
          <div className="blog-excerpt">{renderHtml(blog.excerpt)}</div>
          <p className="" style={{ fontSize: "12px" }}>
            Written by:{" "}
            <span className="text-primary">
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>{blog.postedBy.name}</a>
              </Link>
            </span>{" "}
            | Published{" "}
            <span className="text-primary">
              {moment(blog.createdAt).fromNow()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogsCard;
