import { Link } from "react-router-dom";
import api, { getImageUrl } from "../api/axios";


export default function NewsItems({ news, DeleteHandler, handleEdit }) {
  
  
const DeleteNews = async (newsId) => {
  try {
    await api.delete(`/news/${newsId}`);
    DeleteHandler(newsId);

    
  } catch (error) {
    console.error(
      "Error deleting news:",
      error.response?.data || error.message
    );
  }
};





  return (
    <div>
       <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item) => (
            <article
              key={item._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className="h-1 bg-blue-600" />
              {item.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(item.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* News Type */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {(Array.isArray(item.type)
                    ? item.type
                    : [item.type]
                  ).filter(Boolean).map((type, index) => (
                    <span
                      key={`${type}-${index}`}
                      className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="break-words text-xl font-bold leading-snug text-slate-900 transition [overflow-wrap:anywhere] group-hover:text-blue-700 sm:text-2xl">
                  {item.title}
                </h2>

                {/* Message */}
                <p className="mt-3 flex-1 break-words leading-7 text-slate-600 [overflow-wrap:anywhere]">
                  {item.description}
                </p>

                {/* Date */}
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Published{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>

                {/* Divider */}
                <div className="my-4 border-t border-slate-100" />

                {/* Author and Read More */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {item.author?.charAt(0).toUpperCase() || "A"}
                    </div>

                    <div className="min-w-0">
                      <p                       className="text-xs uppercase tracking-wide text-gray-400">
                        Written by
                      </p>
                      <p className="truncate font-semibold text-slate-800">
                        {item.author}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center">
                    <button
                      type="button"
                      className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700 sm:px-4"
                      onClick={() => DeleteNews(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:px-4"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <Link
                      to={`/news/${item._id}`}
                      className="col-span-2 py-2 text-center text-sm font-bold text-blue-700 hover:text-blue-900 sm:col-span-1 sm:shrink-0"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
    </div>
  )
}
