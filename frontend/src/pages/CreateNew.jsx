
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api, { getImageUrl } from "../api/axios";

export default function CreateNew() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingNews = location.state?.news;
  const [newsTitle, setNewsTitle] = useState(existingNews?.title || "");
  const [author, setAuthor] = useState(existingNews?.author || "");
  const [description, setDescription] = useState(existingNews?.description || "");
  const [types, setTypes] = useState(
    Array.isArray(existingNews?.type) ? existingNews.type : []
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    existingNews?.image ? getImageUrl(existingNews.image) : ""
  );
  const imagePreviewUrl = useRef(null);
  const [typeInput, setTypeInput] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl.current) {
        URL.revokeObjectURL(imagePreviewUrl.current);
      }
    };
  }, []);

  const handleImageChange = (event) => {
    if (imagePreviewUrl.current) {
      URL.revokeObjectURL(imagePreviewUrl.current);
      imagePreviewUrl.current = null;
    }

    const file = event.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      imagePreviewUrl.current = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl.current);
    } else {
      setImagePreview(existingNews?.image ? getImageUrl(existingNews.image) : "");
    }
  };

  const addType = () => {
    const type = typeInput.trim();
    if (type && !types.includes(type)) {
      setTypes((currentTypes) => [...currentTypes, type]);
      setTypeInput("");
    }
  };

  const createNews = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const newsData = new FormData();
      newsData.append("title", newsTitle.trim());
      newsData.append("description", description.trim());
      newsData.append("author", author.trim());
      newsData.append("type", JSON.stringify(types));
      if (imageFile) {
        newsData.append("image", imageFile);
      }
      const response = existingNews?._id
        ? await api.patch(
            `/news/${existingNews._id}`,
            newsData
          )
        : await api.post("/news", newsData);

      if (response.data.errors) {
        throw new Error(response.data.errors.map(({ msg }) => msg).join(", "));
      }

      navigate("/");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        requestError.message ||
        "Failed to create news"
      );
    } finally {
      setSubmitting(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-6 sm:px-4 sm:py-12">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-6 text-white sm:px-8 sm:py-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            The Daily <span className="mx-1 text-white/40">/</span> Contributor desk
          </p>

          <h1 className="mt-3 break-words text-3xl font-bold sm:text-4xl">
            {existingNews ? "Edit News" : "Create News"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
            Share your story with the world.
          </p>
        </div>

        {/* Form Design */}
        <form onSubmit={createNews} className="space-y-5 p-4 sm:space-y-6 sm:p-8">
          <div>
            <label htmlFor="news-title" className="mb-2 block text-sm font-semibold text-slate-800">
              News Title
            </label>
            <input
              id="news-title"
              type="text"
              value={newsTitle}
              onChange={(event) => setNewsTitle(event.target.value)}
              placeholder="Enter your news title"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label htmlFor="news-author" className="mb-2 block text-sm font-semibold text-slate-800">
              Author
            </label>
            <input
              id="news-author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="Enter author name"
              required
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label htmlFor="news-description" className="mb-2 block text-sm font-semibold text-slate-800">
              Description
            </label>
            <textarea
              id="news-description"
              rows="6"
              placeholder="Write your news story here..."
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="news-image" className="mb-2 block text-sm font-semibold text-slate-800">
              Story photo <span className="font-normal text-slate-500">(optional, JPG/PNG/WebP up to 5 MB)</span>
            </label>
            <input
              id="news-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="block min-w-0 max-w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-700 file:mr-2 file:max-w-[55%] file:border-0 file:bg-blue-50 file:px-3 file:py-3 file:font-semibold file:text-blue-700 hover:file:bg-blue-100 sm:text-sm sm:file:mr-4 sm:file:max-w-none sm:file:px-4"
            />
            {imagePreview && (
              <div className="relative mt-4 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl bg-slate-100 sm:aspect-video">
                <img
                  src={imagePreview}
                  alt="Story image preview"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="news-type" className="mb-2 block text-sm font-semibold text-slate-800">
              Types
            </label>
            <div className="flex min-w-0 items-center gap-2">
              <input
                id="news-type"
                value={typeInput}
                onChange={(event) => setTypeInput(event.target.value)}
                type="text"
                placeholder="Add a type"
                className="block min-w-0 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
              <button
                type="button"
                onClick={addType}
                className="mt-1 shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {types.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {types.map((type) => (
                  <li key={type}>
                    <button
                      type="button"
                      onClick={() => setTypes((currentTypes) => currentTypes.filter((item) => item !== type))}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                      aria-label={`Remove ${type}`}
                    >
                      {type} ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || types.length === 0}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? existingNews
                ? "Saving..."
                : "Creating..."
              : existingNews
                ? "Save Changes"
                : "Create News"}
          </button>
        </form>
      </div>
    </div>
  );
}
