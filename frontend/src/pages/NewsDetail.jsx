import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { getImageUrl } from "../api/axios";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = news
    ? (Array.isArray(news.type) ? news.type : [news.type]).filter(Boolean)
    : [];
  const publishedDate = news?.createdAt
    ? new Date(news.createdAt)
    : null;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/news/${id}`);
        setNews(response.data);
      } catch (requestError) {
        const status = requestError.response?.status;
        setError(
          status === 401
            ? "Please log in to view this story."
            : status === 404
              ? "This story could not be found."
              : requestError.response?.data?.message ||
                "Unable to load this story."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900"
        >
          <span aria-hidden="true">←</span> Back to stories
        </Link>

        {loading ? (
          <section
            role="status"
            className="mt-8 animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="h-72 bg-slate-200 sm:h-96" />
            <div className="space-y-4 p-6 sm:p-10">
              <div className="h-4 w-32 rounded bg-stone-200" />
              <div className="h-10 max-w-2xl rounded bg-stone-200" />
              <div className="h-4 max-w-sm rounded bg-stone-200" />
              <span className="sr-only">Loading story...</span>
            </div>
          </section>
        ) : error ? (
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-8 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Story unavailable
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              We couldn&apos;t load this story
            </h1>
            <p role="alert" className="mt-3 leading-7 text-slate-600">
              {error}
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Return to stories
            </Link>
          </section>
        ) : (
          <article className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:mt-8 sm:rounded-3xl">
            <header className="relative isolate overflow-hidden bg-slate-950 px-5 py-8 text-white sm:px-10 sm:py-12 lg:px-16 lg:py-16">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-32 -z-10 size-96 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-4 -top-16 -z-10 size-64 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-36 -left-20 -z-10 size-80 rounded-full bg-blue-500/20 blur-2xl"
              />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                The Daily <span className="mx-2 text-white/35">/</span> Top story
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((type, index) => (
                  <span
                    key={`${type}-${index}`}
                    className="rounded-md border border-blue-200/20 bg-blue-300/10 px-3 py-1.5 text-xs font-semibold text-blue-100"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 max-w-4xl break-words text-3xl font-bold leading-[1.08] tracking-tight [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
                {news.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-green-100/75">
                <span className="font-semibold text-white">{news.author}</span>
                {publishedDate && !Number.isNaN(publishedDate.getTime()) && (
                  <>
                    <span aria-hidden="true" className="text-blue-300">•</span>
                    <time dateTime={publishedDate.toISOString()}>
                      {publishedDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </>
                )}
              </div>
            </header>

            {news.image && (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 sm:aspect-video">
                <img
                  src={getImageUrl(news.image)}
                  alt={news.title}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}

            <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="min-w-0 px-5 py-7 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  The story
                </p>
                <div className="whitespace-pre-wrap text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
                  {news.description}
                </div>
                <div className="mt-10 border-t border-stone-200 pt-6">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
                  >
                    <span aria-hidden="true">←</span> More stories
                  </Link>
                </div>
              </div>

              <aside className="min-w-0 border-t border-slate-200 bg-slate-50 px-5 py-6 sm:px-10 lg:border-l lg:border-t-0 lg:px-7 lg:py-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  About this story
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                    {news.author?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Written by</p>
                    <p className="truncate font-semibold text-slate-900">
                      {news.author}
                    </p>
                  </div>
                </div>
                {publishedDate && !Number.isNaN(publishedDate.getTime()) && (
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs text-slate-500">Published</p>
                    <time
                      dateTime={publishedDate.toISOString()}
                      className="mt-1 block text-sm font-semibold text-slate-800"
                    >
                      {publishedDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                )}
              </aside>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
