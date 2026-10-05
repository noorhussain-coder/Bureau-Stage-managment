// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Search,
//   Calendar,
//   ArrowRight,
//   RefreshCw,
//   FileText,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const THEMES = {
//   dark: {
//     bg: "#0B1B33",
//     bgAlt: "#101F3A",
//     surface: "#122140",
//     surfaceStrong: "#17284A",
//     border: "rgba(255,255,255,0.10)",
//     text: "#EDEFF4",
//     textMuted: "#93A2BC",
//     accent: "#63A4FF",
//     accentStrong: "#2F6FE0",
//     accentSoft: "rgba(99,164,255,0.16)",
//     navBg: "#0B1B33",
//     onAccent: "#0B1B33",
//   },

//   light: {
//     bg: "#F4F8FC",
//     bgAlt: "#EAF1FA",
//     surface: "#FFFFFF",
//     surfaceStrong: "#EEF3FB",
//     border: "rgba(11,27,51,0.10)",
//     text: "#0E1F3D",
//     textMuted: "#54638A",
//     accent: "#2560E0",
//     accentStrong: "#173F99",
//     accentSoft: "rgba(37,96,224,0.10)",
//     navBg: "#F4F8FC",
//     onAccent: "#FFFFFF",
//   },
// };

// const Blog2 = () => {
//   const navigate = useNavigate();

//   const [theme, setTheme] = useState("dark");
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");

//   const t = THEMES[theme];
//   const isDark = theme === "dark";

//   // =========================================================
//   // GET ALL PUBLISHED BLOGS
//   // =========================================================
//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         "http://localhost:3000/api/blogs/get"
//       );

//       const data =
//         response.data?.blogs ||
//         response.data?.data ||
//         response.data ||
//         [];

//       setBlogs(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Fetch blogs error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Unable to load blogs."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // =========================================================
//   // DATE FORMAT
//   // =========================================================
//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleDateString("en-PK", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // GET IMAGE
//   // =========================================================
//   const getImage = (blog) => {
//     return (
//       blog?.image?.imageUrl ||
//       blog?.imageUrl ||
//       blog?.featuredImage ||
//       null
//     );
//   };

//   // =========================================================
//   // FILTER
//   // =========================================================
//   const filteredBlogs = blogs.filter((blog) => {
//     const searchText = search.toLowerCase();

//     const matchesSearch =
//       blog.title?.toLowerCase().includes(searchText) ||
//       blog.description?.toLowerCase().includes(searchText) ||
//       blog.category?.toLowerCase().includes(searchText);

//     const matchesCategory =
//       category === "all" ||
//       blog.category?.toLowerCase() === category.toLowerCase();

//     return matchesSearch && matchesCategory;
//   });

//   // =========================================================
//   // UNIQUE CATEGORIES
//   // =========================================================
//   const categories = [
//     "all",
//     ...new Set(
//       blogs
//         .map((blog) => blog.category)
//         .filter(Boolean)
//     ),
//   ];

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: t.bg,
//         color: t.text,
//         padding: "30px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//         }}
//       >
//         {/* =====================================================
//             HEADER
//         ===================================================== */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "20px",
//             flexWrap: "wrap",
//             marginBottom: "35px",
//           }}
//         >
//           <div>
//             <p
//               style={{
//                 color: t.accent,
//                 fontWeight: "700",
//                 marginBottom: "6px",
//               }}
//             >
//               BUREAU STAGE MANAGEMENT
//             </p>

//             <h1
//               style={{
//                 fontSize: "36px",
//                 fontWeight: "800",
//                 margin: 0,
//               }}
//             >
//               Blog & News
//             </h1>

//             <p
//               style={{
//                 color: t.textMuted,
//                 marginTop: "8px",
//                 fontSize: "15px",
//               }}
//             >
//               Discover the latest information, events and
//               stage activities.
//             </p>
//           </div>

//           <button
//             onClick={() =>
//               setTheme(isDark ? "light" : "dark")
//             }
//             style={{
//               padding: "10px 16px",
//               borderRadius: "10px",
//               border: `1px solid ${t.border}`,
//               background: t.surface,
//               color: t.text,
//               cursor: "pointer",
//               fontWeight: "600",
//             }}
//           >
//             {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
//           </button>
//         </div>

//         {/* =====================================================
//             SEARCH + CATEGORY
//         ===================================================== */}
//         <div
//           style={{
//             display: "flex",
//             gap: "12px",
//             marginBottom: "30px",
//             flexWrap: "wrap",
//           }}
//         >
//           <div
//             style={{
//               position: "relative",
//               flex: 1,
//               minWidth: "250px",
//             }}
//           >
//             <Search
//               size={19}
//               style={{
//                 position: "absolute",
//                 left: "15px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: t.textMuted,
//               }}
//             />

//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               style={{
//                 width: "100%",
//                 boxSizing: "border-box",
//                 padding: "13px 15px 13px 45px",
//                 borderRadius: "12px",
//                 border: `1px solid ${t.border}`,
//                 background: t.surface,
//                 color: t.text,
//                 outline: "none",
//               }}
//             />
//           </div>

//           <select
//             value={category}
//             onChange={(e) =>
//               setCategory(e.target.value)
//             }
//             style={{
//               padding: "13px 40px 13px 15px",
//               borderRadius: "12px",
//               border: `1px solid ${t.border}`,
//               background: t.surface,
//               color: t.text,
//               outline: "none",
//             }}
//           >
//             {categories.map((item) => (
//               <option key={item} value={item}>
//                 {item === "all"
//                   ? "All Categories"
//                   : item}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={fetchBlogs}
//             style={{
//               width: "48px",
//               borderRadius: "12px",
//               border: `1px solid ${t.border}`,
//               background: t.surface,
//               color: t.accent,
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <RefreshCw size={19} />
//           </button>
//         </div>

//         {/* =====================================================
//             LOADING
//         ===================================================== */}
//         {loading && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "80px 20px",
//               color: t.textMuted,
//             }}
//           >
//             <RefreshCw size={32} />

//             <p>Loading blogs...</p>
//           </div>
//         )}

//         {/* =====================================================
//             ERROR
//         ===================================================== */}
//         {!loading && error && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "60px",
//               background: t.surface,
//               borderRadius: "16px",
//               border: `1px solid ${t.border}`,
//             }}
//           >
//             <p style={{ color: "#EF4444" }}>
//               {error}
//             </p>

//             <button
//               onClick={fetchBlogs}
//               style={{
//                 marginTop: "10px",
//                 padding: "10px 18px",
//                 border: "none",
//                 borderRadius: "9px",
//                 background: t.accent,
//                 color: t.onAccent,
//                 cursor: "pointer",
//               }}
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* =====================================================
//             EMPTY
//         ===================================================== */}
//         {!loading &&
//           !error &&
//           filteredBlogs.length === 0 && (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "70px 20px",
//                 background: t.surface,
//                 borderRadius: "16px",
//                 border: `1px solid ${t.border}`,
//               }}
//             >
//               <FileText
//                 size={45}
//                 color={t.textMuted}
//               />

//               <h3>No blogs found</h3>

//               <p style={{ color: t.textMuted }}>
//                 No published blogs match your search.
//               </p>
//             </div>
//           )}

//         {/* =====================================================
//             BLOG GRID
//         ===================================================== */}
//         {!loading &&
//           !error &&
//           filteredBlogs.length > 0 && (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit, minmax(320px, 1fr))",
//                 gap: "24px",
//               }}
//             >
//               {filteredBlogs.map((blog) => {
//                 const image = getImage(blog);

//                 return (
//                   <article
//                     key={blog._id}
//                     style={{
//                       background: t.surface,
//                       border: `1px solid ${t.border}`,
//                       borderRadius: "18px",
//                       overflow: "hidden",
//                       boxShadow: isDark
//                         ? "0 10px 30px rgba(0,0,0,0.15)"
//                         : "0 10px 30px rgba(11,27,51,0.06)",
//                     }}
//                   >
//                     {/* Image */}
//                     <div
//                       style={{
//                         height: "220px",
//                         background: t.bgAlt,
//                         overflow: "hidden",
//                       }}
//                     >
//                       {image ? (
//                         <img
//                           src={image}
//                           alt={blog.title}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         <div
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             color: t.textMuted,
//                           }}
//                         >
//                           <FileText size={45} />
//                         </div>
//                       )}
//                     </div>

//                     {/* Content */}
//                     <div style={{ padding: "20px" }}>
//                       {/* Category */}
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent:
//                             "space-between",
//                           alignItems: "center",
//                           marginBottom: "12px",
//                         }}
//                       >
//                         <span
//                           style={{
//                             background: t.accentSoft,
//                             color: t.accent,
//                             padding: "5px 10px",
//                             borderRadius: "20px",
//                             fontSize: "12px",
//                             fontWeight: "700",
//                             textTransform:
//                               "capitalize",
//                           }}
//                         >
//                           {blog.category ||
//                             blog.type ||
//                             "General"}
//                         </span>

//                         <span
//                           style={{
//                             color: t.textMuted,
//                             fontSize: "12px",
//                           }}
//                         >
//                           {blog.type}
//                         </span>
//                       </div>

//                       {/* Title */}
//                       <h2
//                         style={{
//                           fontSize: "21px",
//                           lineHeight: "1.3",
//                           margin: "0 0 10px",
//                           fontWeight: "750",
//                         }}
//                       >
//                         {blog.title}
//                       </h2>

//                       {/* Description */}
//                       <p
//                         style={{
//                           color: t.textMuted,
//                           lineHeight: "1.6",
//                           fontSize: "14px",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 3,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                           marginBottom: "15px",
//                         }}
//                       >
//                         {blog.description ||
//                           "No description available."}
//                       </p>

//                       {/* Date */}
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "7px",
//                           color: t.textMuted,
//                           fontSize: "13px",
//                           marginBottom: "18px",
//                         }}
//                       >
//                         <Calendar size={16} />

//                         {formatDate(
//                           blog.createdAt
//                         )}
//                       </div>

//                       {/* Read More */}
//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/blog/${blog._id}`
//                           )
//                         }
//                         style={{
//                           width: "100%",
//                           padding: "11px",
//                           borderRadius: "10px",
//                           border: "none",
//                           background: t.accent,
//                           color: t.onAccent,
//                           cursor: "pointer",
//                           fontWeight: "700",
//                           display: "flex",
//                           justifyContent:
//                             "center",
//                           alignItems: "center",
//                           gap: "7px",
//                         }}
//                       >
//                         Read More
//                         <ArrowRight size={17} />
//                       </button>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default Blog2;

