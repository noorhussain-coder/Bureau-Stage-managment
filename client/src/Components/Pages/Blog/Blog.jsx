
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, CalendarDays } from "lucide-react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/blogs"
        );

        const allBlogs = Array.isArray(data)
          ? data
          : data.blogs || [];

        setBlogs(allBlogs.filter((blog) => blog.isPublished));
      } catch (err) {
        setError("Unable to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <section className="bg-indigo-50 px-5 py-20 text-center">
        <p className="font-semibold text-indigo-600">NEWS & STORIES</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
          Bureau Blog
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Read university stage stories, informational articles,
          and performance updates.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-9 flex items-center gap-3">
          <BookOpen className="text-indigo-600" size={25} />
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Articles
          </h2>
        </div>

        {loading ? (
          <p className="py-16 text-center text-slate-500">
            Loading articles...
          </p>
        ) : error ? (
          <p className="py-16 text-center text-rose-600">{error}</p>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <BookOpen className="mx-auto text-slate-400" size={42} />
            <h3 className="mt-4 font-semibold text-slate-800">
              No published articles yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              New stories and updates will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {blog.imageUrl ? (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
                    <BookOpen size={45} />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-600">
                      {blog.category || blog.type || "General"}
                    </span>

                    {blog.createdAt && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays size={13} />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-600">
                    {blog.description}
                  </p>

                  <p className="mt-4 text-xs text-slate-400">
                    By {blog.author?.name || "Bureau Stage"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}