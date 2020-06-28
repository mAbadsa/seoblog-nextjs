// import { useState, useEffect, useRef } from "react";
// import dynamic from "next/dynamic";
// import { withRouter } from "next/router";
// import { getSingleBlog, getBlogs } from "../../actions/blog";
// import { isAuth, getCookie } from "../../actions/auth";
// import { getCategories } from "../../actions/category";
// import { getTags } from "../../actions/tag";

// import Snackbar from "@material-ui/core/Snackbar";
// import Alert from "@material-ui/lab/Alert";
// import Divider from "@material-ui/core/Divider";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: true });
// import "../../node_modules/react-quill/dist/quill.snow.css";
// import { QuillModules, QuillFormates } from "../../helpers/quill";

// const UpdateBLog = ({ router }) => {
//   // const reactQuillRef = useRef("");
//   // const editor = reactQuillRef.getEditor();
//   // const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);

//   const [values, setValues] = useState({
//     error: "",
//     success: false,
//     title: "",
//     formData: "",
//     message: "",
//   });
//   const [body, setBody] = useState("");
//   const [open, setOpen] = useState(false);

//   const { error, success, title, formData, message } = values;

//   useEffect(() => {
//     setValues({ ...values, formData: new FormData() });
//     getInitBlog();
//   }, [router]);

//   const getInitBlog = async () => {
//     if (router.query.slug) {
//       try {
//         const { blog } = await getSingleBlog(router.query.slug);
//         setValues({ ...values, title: blog.title });
//         setBody(blog.body);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const editBlog = () => {};

//   const handleChange = (name) => (e) => {
//     const value = name === "photo" ? e.target.files[0] : e.target.value;
//     formData.set(name, value);
//     setValues({ ...values, formData, [name]: value, error: "" });
//   };

//   const handleBody = (e) => {
//     setBody(e);
//     formData.set("body", e);
//   };

//   const UpdateBlogForm = () => {
//     return (
//       <form onSubmit={editBlog}>
//         <div className="form-group">
//           <label className="text-muted">Title:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={handleChange("title")}
//           />
//         </div>
//         <div className="form-group">
//           <ReactQuill
//             // ref={reactQuillRef}
//             modules={QuillModules}
//             formats={QuillFormates}
//             value={body}
//             onChange={handleBody}
//             placeholder="Write blog content..."
//           />
//         </div>
//         <button type="submit" className="btn btn-outline-primary">
//           Update
//         </button>
//       </form>
//     );
//   };

//   // Snackbar handling
//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <div className="row py-5 bg-form-box px-2">
//         <div className="col-md-8 pb-5">
//           <h1 className="text-center">Update Blog</h1>
//           {UpdateBlogForm()}
//         </div>
//         <div className="col-md-4 bg-light rounded">
//           <div className="form-group pt-3">
//             <h5>Featured image</h5>
//           </div>
//         </div>
//       </div>
//       <Snackbar
//         open={open}
//         autoHideDuration={5000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity="success"
//           elevation={6}
//           variant="filled"
//         >
//           {message}
//         </Alert>
//       </Snackbar>
//     </React.Fragment>
//   );
// };

// export default withRouter(UpdateBLog);
