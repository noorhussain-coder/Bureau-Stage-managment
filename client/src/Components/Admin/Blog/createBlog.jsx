
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialForm = {
  title: "",
  description: "",
  type: "information",
  category: "general",
  isPublished: false,
};

const categories = [
  "general",
  "announcement",
  "event",
  "education",
  "workshop",
  "performance",
  "opportunity",
];

export default function BlogCreate() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [featuredFile, setFeaturedFile] = useState(null);
  const [featuredPreview, setFeaturedPreview] = useState("");

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const featuredInput = useRef(null);
  const galleryInput = useRef(null);

  // Axios configuration
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_URL,
        withCredentials: true,
      }),
    []
  );

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/api/blogs");

      setBlogs(Array.isArray(data) ? data : data.blogs || []);
    } catch (error) {
      console.error("Fetch blogs:", error);
      alert(error.response?.data?.message || "Unable to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Form input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Featured image
  const handleFeaturedImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setFeaturedFile(file);
    setFeaturedPreview(URL.createObjectURL(file));
  };

  // Multiple gallery images
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== files.length) {
      alert("Only image files are allowed");
    }

    const newFiles = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setGalleryFiles((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  // Remove newly selected gallery image
  const removeGalleryImage = (id) => {
    setGalleryFiles((prev) => {
      const image = prev.find((item) => item.id === id);

      if (image) URL.revokeObjectURL(image.preview);

      return prev.filter((item) => item.id !== id);
    });
  };

  // Remove an existing gallery image
  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Reset form
  const resetForm = () => {
    if (featuredPreview.startsWith("blob:")) {
      URL.revokeObjectURL(featuredPreview);
    }

    galleryFiles.forEach((item) => {
      URL.revokeObjectURL(item.preview);
    });

    setForm(initialForm);
    setFeaturedFile(null);
    setFeaturedPreview("");
    setGalleryFiles([]);
    setExistingImages([]);
    setEditingId(null);
    setShowForm(false);

    if (featuredInput.current) featuredInput.current.value = "";
    if (galleryInput.current) galleryInput.current.value = "";
  };

  // Open create modal
  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  // Open edit modal
  const openEdit = (blog) => {
    setEditingId(blog._id);

    setForm({
      title: blog.title || "",
      description: blog.description || "",
      type: blog.type || "information",
      category: blog.category || "general",
      isPublished: Boolean(blog.isPublished),
    });

    setFeaturedPreview(blog.image?.imageUrl || "");
    setFeaturedFile(null);

    setExistingImages(blog.images || []);
    setGalleryFiles([]);

    setShowForm(true);
  };

  // Create / Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !featuredFile) {
      alert("Please upload a featured image");
      return;
    }

    if (editingId && !featuredPreview) {
      alert("Please select a featured image");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("type", form.type);
      formData.append("category", form.category);
      formData.append("isPublished", String(form.isPublished));

      // Only append when a new featured image is selected
      if (featuredFile) {
        formData.append("featuredImage", featuredFile);
      }

      // New gallery images
      galleryFiles.forEach((item) => {
        formData.append("images", item.file);
      });

      // Preserve existing Cloudinary gallery images during edit
      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      if (editingId) {
        await api.put(`/api/blogs/${editingId}`, formData);
      } else {
        await api.post("/api/blogs", formData);
      }

      resetForm();
      await fetchBlogs();

      alert(editingId ? "Blog updated successfully" : "Blog created successfully");
    } catch (error) {
      console.error("Save blog:", error);
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // Publish / Unpublish
  const togglePublish = async (blog) => {
    try {
      const formData = new FormData();

      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("type", blog.type);
      formData.append("category", blog.category || "general");
      formData.append("isPublished", String(!blog.isPublished));

      formData.append(
        "existingImages",
        JSON.stringify(blog.images || [])
      );

      await api.put(`/api/blogs/${blog._id}`, formData);

      await fetchBlogs();
    } catch (error) {
      console.error("Publish error:", error);
      alert(
        error.response?.data?.message || "Unable to update publish status"
      );
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/api/blogs/${id}`);

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      if (selectedBlog?._id === id) {
        setSelectedBlog(null);
        setShowPreview(false);
      }
    } catch (error) {
      console.error("Delete blog:", error);
      alert(error.response?.data?.message || "Unable to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  // Search and filters
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.description?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "published" && blog.isPublished) ||
      (filter === "draft" && !blog.isPublished) ||
      blog.type === filter;

    return matchesSearch && matchesFilter;
  });

  const publishedCount = blogs.filter((blog) => blog.isPublished).length;
  const draftCount = blogs.length - publishedCount;

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Blog Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage university information and stage performances.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <span className="text-xl">+</span>
          Create Blog
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Blogs",
            value: blogs.length,
            icon: "📝",
          },
          {
            label: "Published",
            value: publishedCount,
            icon: "🌐",
          },
          {
            label: "Drafts",
            value: draftCount,
            icon: "📁",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {item.value}
                </h2>
              </div>
              <span className="rounded-xl bg-indigo-50 p-3 text-2xl">
                {item.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1`}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`${inputClass} sm:w-56`}
        >
          <option value="all">All Blogs</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="information">Information</option>
          <option value="performance">Performance</option>
        </select>
      </div>

      {/* Blog Listing */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Loading blogs...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <div className="mb-3 text-4xl">📰</div>
          <h3 className="font-semibold text-gray-800">
            No blogs found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new blog to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-52 bg-gray-100">
                {blog.image?.imageUrl && (
                  <img
                    src={blog.image.imageUrl}
                    alt={blog.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    blog.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium capitalize text-indigo-700">
                    {blog.type}
                  </span>

                  <span className="text-xs text-gray-400">
                    {blog.category || "general"}
                  </span>
                </div>

                <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                  {blog.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                  {blog.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-xs text-gray-400">
                    {blog.images?.length || 0} gallery images
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedBlog(blog);
                      setShowPreview(true);
                    }}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => openEdit(blog)}
                    className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => togglePublish(blog)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium ${
                      blog.isPublished
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {blog.isPublished ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deletingId === blog._id}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6">
          <div className="flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? "Edit Blog" : "Create New Blog"}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Fill in the blog details below.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-full p-2 text-xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 overflow-y-auto p-5 sm:p-7"
            >
              {/* Title */}
              <div>
                <label className={labelClass}>Blog Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={180}
                  placeholder="Enter blog title"
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write your blog description..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Blog Type *</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="information">Information</option>
                    <option value="performance">Performance</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() +
                          category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className={labelClass}>
                  Featured Image *
                </label>

                <input
                  ref={featuredInput}
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImage}
                  className="hidden"
                />

                {featuredPreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={featuredPreview}
                      alt="Featured preview"
                      className="h-56 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => featuredInput.current?.click()}
                      className="absolute bottom-3 right-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => featuredInput.current?.click()}
                    className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-10 transition hover:border-indigo-400 hover:bg-indigo-50/30"
                  >
                    <span className="mb-2 text-3xl">📷</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Upload featured image
                    </span>
                    <span className="mt-1 text-xs text-gray-400">
                      PNG, JPG, WEBP
                    </span>
                  </button>
                )}
              </div>

              {/* Gallery */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className={labelClass}>
                    Gallery Images
                  </label>
                  <span className="text-xs text-gray-400">
                    Multiple images
                  </span>
                </div>

                <input
                  ref={galleryInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImages}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => galleryInput.current?.click()}
                  className="w-full rounded-xl border-2 border-dashed border-gray-300 py-5 text-sm font-medium text-indigo-600 transition hover:border-indigo-400 hover:bg-indigo-50/30"
                >
                  + Add Gallery Images
                </button>

                {(existingImages.length > 0 || galleryFiles.length > 0) && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-3">
                    {existingImages.map((image, index) => (
                      <div
                        key={image.secureId || image.imageUrl || index}
                        className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl border"
                      >
                        <img
                          src={image.imageUrl}
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {galleryFiles.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl border"
                      >
                        <img
                          src={item.preview}
                          alt="New gallery"
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(item.id)}
                          className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Publish toggle */}
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Publish Blog
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Make this blog visible to website visitors.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="h-5 w-5 accent-indigo-600"
                />
              </label>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG PREVIEW MODAL */}
      {showPreview && selectedBlog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 sm:p-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
              <h2 className="font-bold text-gray-900">
                Blog Preview
              </h2>

              <button
                onClick={() => setShowPreview(false)}
                className="rounded-full px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="p-5 sm:p-8">
              {selectedBlog.image?.imageUrl && (
                <img
                  src={selectedBlog.image.imageUrl}
                  alt={selectedBlog.title}
                  className="mb-6 max-h-[400px] w-full rounded-xl object-cover"
                />
              )}

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                  {selectedBlog.type}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {selectedBlog.category}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {selectedBlog.title}
              </h1>

              <p className="mt-3 text-sm text-gray-400">
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-gray-700">
                {selectedBlog.description}
              </div>

              {selectedBlog.images?.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">
                    Gallery
                  </h3>

                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {selectedBlog.images.map((image, index) => (
                      <img
                        key={image.secureId || image.imageUrl || index}
                        src={image.imageUrl}
                        alt={`Gallery ${index + 1}`}
                        className="h-48 w-64 shrink-0 rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}