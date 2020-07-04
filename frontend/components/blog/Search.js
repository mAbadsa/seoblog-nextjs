import { useState, useEffect } from "react";
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

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="pt-3 pb-5">{formSearch()}</div>
      </div>
    </React.Fragment>
  );
};

export default Search;
