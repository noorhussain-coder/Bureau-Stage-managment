// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Calendar,
//   User,
//   Tag,
//   FileText,
//   Images,
//   Loader,
// } from "lucide-react";

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

// const SingleBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [theme, setTheme] = useState("dark");
//   const [blog, setBlog] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const t = THEMES[theme];
//   const isDark = theme === "dark";

//   // =========================================================
//   // GET SINGLE BLOG
//   // =========================================================
//   const fetchBlog = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.get(
//         `http://localhost:3000/api/blogs/${id}`
//       );

//       const data =
//         response.data?.blog ||
//         response.data?.data ||
//         response.data;

//       setBlog(data);
//     } catch (error) {
//       console.error("Single blog error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Blog not found."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchBlog();
//     }
//   }, [id]);

//   // =========================================================
//   // DATE
//   // =========================================================
//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleDateString("en-PK", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // =========================================================
//   // IMAGE
//   // =========================================================
//   const getFeaturedImage = () => {
//     return (
//       blog?.image?.imageUrl ||
//       blog?.imageUrl ||
//       blog?.featuredImage ||
//       null
//     );
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================
//   if (loading) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: t.bg,
//           color: t.text,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//           gap: "12px",
//         }}
//       >
//         <Loader size={35} />

//         <p style={{ color: t.textMuted }}>
//           Loading blog...
//         </p>
//       </div>
//     );
//   }

//   // =========================================================
//   // ERROR
//   // =========================================================
//   if (error || !blog) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: t.bg,
//           color: t.text,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "30px",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "500px",
//             width: "100%",
//             textAlign: "center",
//             background: t.surface,
//             border: `1px solid ${t.border}`,
//             borderRadius: "18px",
//             padding: "45px",
//           }}
//         >
//           <FileText
//             size={45}
//             color={t.textMuted}
//           />

//           <h2>Blog Not Found</h2>

//           <p
//             style={{
//               color: t.textMuted,
//               marginBottom: "20px",
//             }}
//           >
//             {error ||
//               "The requested blog could not be found."}
//           </p>

//           <button
//             onClick={() => navigate("/blog")}
//             style={{
//               padding: "11px 20px",
//               border: "none",
//               borderRadius: "10px",
//               background: t.accent,
//               color: t.onAccent,
//               cursor: "pointer",
//               fontWeight: "700",
//             }}
//           >
//             Back to Blogs
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const featuredImage = getFeaturedImage();

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
//           maxWidth: "950px",
//           margin: "0 auto",
//         }}
//       >
//         {/* =====================================================
//             TOP BAR
//         ===================================================== */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "25px",
//           }}
//         >
//           <button
//             onClick={() => navigate("/blog")}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               padding: "10px 15px",
//               borderRadius: "10px",
//               border: `1px solid ${t.border}`,
//               background: t.surface,
//               color: t.text,
//               cursor: "pointer",
//               fontWeight: "600",
//             }}
//           >
//             <ArrowLeft size={18} />
//             Back to Blogs
//           </button>

//           <button
//             onClick={() =>
//               setTheme(isDark ? "light" : "dark")
//             }
//             style={{
//               padding: "10px 15px",
//               borderRadius: "10px",
//               border: `1px solid ${t.border}`,
//               background: t.surface,
//               color: t.text,
//               cursor: "pointer",
//             }}
//           >
//             {isDark ? "☀" : "🌙"}
//           </button>
//         </div>

//         {/* =====================================================
//             BLOG ARTICLE
//         ===================================================== */}
//         <article
//           style={{
//             background: t.surface,
//             border: `1px solid ${t.border}`,
//             borderRadius: "20px",
//             overflow: "hidden",
//           }}
//         >
//           {/* Featured Image */}
//           {featuredImage && (
//             <div
//               style={{
//                 width: "100%",
//                 maxHeight: "500px",
//                 background: t.bgAlt,
//               }}
//             >
//               <img
//                 src={featuredImage}
//                 alt={blog.title}
//                 style={{
//                   width: "100%",
//                   maxHeight: "500px",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//             </div>
//           )}

//           {/* Article Content */}
//           <div
//             style={{
//               padding: "35px",
//             }}
//           >
//             {/* Type / Category */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: "10px",
//                 flexWrap: "wrap",
//                 marginBottom: "15px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   background: t.accentSoft,
//                   color: t.accent,
//                   padding: "6px 11px",
//                   borderRadius: "20px",
//                   fontSize: "12px",
//                   fontWeight: "700",
//                   textTransform: "capitalize",
//                 }}
//               >
//                 <Tag size={14} />

//                 {blog.category || "General"}
//               </span>

//               {blog.type && (
//                 <span
//                   style={{
//                     background: t.surfaceStrong,
//                     color: t.textMuted,
//                     padding: "6px 11px",
//                     borderRadius: "20px",
//                     fontSize: "12px",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {blog.type}
//                 </span>
//               )}
//             </div>

//             {/* Title */}
//             <h1
//               style={{
//                 fontSize: "clamp(30px, 5vw, 48px)",
//                 lineHeight: "1.15",
//                 margin: "0 0 20px",
//                 fontWeight: "850",
//               }}
//             >
//               {blog.title}
//             </h1>

//             {/* Meta */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: "20px",
//                 flexWrap: "wrap",
//                 color: t.textMuted,
//                 fontSize: "14px",
//                 paddingBottom: "25px",
//                 marginBottom: "25px",
//                 borderBottom: `1px solid ${t.border}`,
//               }}
//             >
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "7px",
//                 }}
//               >
//                 <Calendar size={17} />

//                 {formatDate(blog.createdAt)}
//               </span>

//               {blog.auther && (
//                 <span
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "7px",
//                   }}
//                 >
//                   <User size={17} />

//                   {blog.auther.name ||
//                     blog.auther.email ||
//                     "Admin"}
//                 </span>
//               )}
//             </div>

//             {/* Description */}
//             <div
//               style={{
//                 color: t.text,
//                 fontSize: "17px",
//                 lineHeight: "1.9",
//                 whiteSpace: "pre-line",
//               }}
//             >
//               {blog.description}
//             </div>
//           </div>
//         </article>

//         {/* =====================================================
//             GALLERY
//         ===================================================== */}
//         {blog.images &&
//           blog.images.length > 0 && (
//             <section
//               style={{
//                 marginTop: "25px",
//                 background: t.surface,
//                 border: `1px solid ${t.border}`,
//                 borderRadius: "20px",
//                 padding: "25px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <Images
//                   size={22}
//                   color={t.accent}
//                 />

//                 <h2
//                   style={{
//                     margin: 0,
//                     fontSize: "22px",
//                   }}
//                 >
//                   Gallery
//                 </h2>
//               </div>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns:
//                     "repeat(auto-fit, minmax(220px, 1fr))",
//                   gap: "15px",
//                 }}
//               >
//                 {blog.images.map((image, index) => (
//                   <div
//                     key={
//                       image.secureId ||
//                       image.imageUrl ||
//                       index
//                     }
//                     style={{
//                       height: "220px",
//                       borderRadius: "14px",
//                       overflow: "hidden",
//                       background: t.bgAlt,
//                     }}
//                   >
//                     <img
//                       src={image.imageUrl}
//                       alt={`${blog.title} ${index + 1}`}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}
//       </div>
//     </div>
//   );
// };

// export default SingleBlog;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";

const THEMES = {
  dark: {
    bg: "#0B1B33",
    surface: "#122140",
    bgAlt: "#101F3A",
    border: "rgba(255,255,255,0.10)",
    text: "#EDEFF4",
    textMuted: "#93A2BC",
    accent: "#63A4FF",
    accentSoft: "rgba(99,164,255,0.16)",
    onAccent: "#0B1B33",
  },

  light: {
    bg: "#F4F8FC",
    surface: "#FFFFFF",
    bgAlt: "#EAF1FA",
    border: "rgba(11,27,51,0.10)",
    text: "#0E1F3D",
    textMuted: "#54638A",
    accent: "#2560E0",
    accentSoft: "rgba(37,96,224,0.10)",
    onAccent: "#FFFFFF",
  },
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const t = THEMES[theme];
  const isDark = theme === "dark";

  // =====================================================
  // GET SINGLE BLOG
  // =====================================================
  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:3000/api/blogs/${id}`
      );

      const data =
        response.data?.blog ||
        response.data?.data ||
        response.data;

      setBlog(data);
    } catch (error) {
      console.error("Blog detail error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load blog."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  // =====================================================
  // DATE
  // =====================================================
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =====================================================
  // FEATURED IMAGE
  // =====================================================
  const getImage = () => {
    return (
      blog?.image?.imageUrl ||
      blog?.imageUrl ||
      blog?.featuredImage ||
      null
    );
  };

  // =====================================================
  // GALLERY
  // =====================================================
  const getGallery = () => {
    if (!Array.isArray(blog?.images)) {
      return [];
    }

    return blog.images
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.imageUrl
      )
      .filter(Boolean);
  };

  const featuredImage = getImage();
  const gallery = getGallery();

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          color: t.textMuted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <RefreshCw size={30} />
        <p>Loading blog...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (error || !blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          color: t.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: "15px",
            padding: "35px",
            textAlign: "center",
            maxWidth: "450px",
            width: "100%",
          }}
        >
          <FileText
            size={45}
            color={t.textMuted}
          />

          <h2>Blog not found</h2>

          <p style={{ color: t.textMuted }}>
            {error || "This blog does not exist."}
          </p>

          <button
            onClick={() => navigate("/blog")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: t.accent,
              color: t.onAccent,
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        padding: "25px 20px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => navigate("/blog")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.text,
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.text,
              cursor: "pointer",
            }}
          >
            {isDark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* BLOG CARD */}
        <article
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {/* FEATURED IMAGE */}
          <div
            style={{
              width: "100%",
              height: "400px",
              background: t.bgAlt,
            }}
          >
            {featuredImage ? (
              <img
                src={featuredImage}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: t.textMuted,
                }}
              >
                <FileText size={60} />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div
            style={{
              padding: "30px",
            }}
          >
            {/* META */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  background: t.accentSoft,
                  color: t.accent,
                  padding: "6px 11px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {blog.category ||
                  blog.type ||
                  "General"}
              </span>

              {blog.type && (
                <span
                  style={{
                    color: t.textMuted,
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {blog.type}
                </span>
              )}

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: t.textMuted,
                  fontSize: "12px",
                }}
              >
                <Calendar size={14} />
                {formatDate(blog.createdAt)}
              </span>
            </div>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "36px",
                lineHeight: "1.2",
                margin: "0 0 18px",
                fontWeight: "800",
              }}
            >
              {blog.title}
            </h1>

            {/* DESCRIPTION */}
            <div
              style={{
                color: t.textMuted,
                fontSize: "15px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {blog.description ||
                "No description available."}
            </div>

            {/* GALLERY */}
            {gallery.length > 0 && (
              <div
                style={{
                  marginTop: "35px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "15px",
                  }}
                >
                  <ImageIcon
                    size={19}
                    color={t.accent}
                  />

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                    }}
                  >
                    Gallery
                  </h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${blog.title} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: `1px solid ${t.border}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;

