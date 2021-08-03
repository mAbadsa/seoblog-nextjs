import { useState, useEffect } from "react";
import Link from "next/link";
import { searchList } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // setValues({ ...values, searched: true });
    searchList({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        message: `${data.length} blogs found`,
        searched: true,
      });
      console.log(data);
    });
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      search: evt.target.value,
      searched: false,
      results: [],
    });
    // console.log(search);
  };

  //   const searching = async () => {
  //     try {
  //       const searchResult = await searchList({ search });
  //       console.log(searchResult.blog);
  //       setValues({
  //         ...values,
  //         results: searchResult.blog,
  //         message: `${searchResult.blog.length} blogs found`,
  //       });
  //       //   console.log(results);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const formSearch = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <input
              className="form-control"
              type="search"
              placeholder="Search on blogs"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-primary btn-block" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    );
  };

  const searchedBlog = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="pt-3 pb-5">{formSearch()}</div>
        {searched && (
          <div style={{ marginBottom: "-80px", marginTop: "-120px" }}>
            {searchedBlog(results)}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;
