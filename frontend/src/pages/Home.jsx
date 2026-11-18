
import { useEffect, useState } from "react";
import NewsItems from "../components/NewsItems";
import Pagination from "../components/Pagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";




export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataLink, setDataLink] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);
  const page = search.get("page") || "1";



  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`/news?page=${page}`);
        const result = response.data;
        setDataLink(result.dataLink || []);
        setNews(Array.isArray(result) ? result : result.news || result.data || []);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        if (err.response?.status === 401) {
          setDataLink(null);
          setError("Log in to view and paginate news stories.");
        } else {
          setDataLink(null);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load news stories."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);
   
  const DeleteHandler = (_id) => {
    if (news.length === 1 && Number(page) > 1) {
      navigate(`/?page=${Number(page) - 1}`);
    } else {
      setNews((prevNews) => prevNews.filter((item) => item._id !== _id));
    }
  };

  const handleEdit = (item) => {
    navigate("/create-news", { state: { news: item } });
  };

  
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-slate-200 pb-7 sm:mb-10 sm:pb-9">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                The Daily Briefing
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-slate-950 sm:text-6xl">
                Stories that <span className="text-blue-600">matter.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Clear perspectives on the latest news, ideas, and conversations shaping our world.
              </p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Culture <span className="mx-2 text-blue-400">/</span> Community <span className="mx-2 text-blue-400">/</span> Current affairs
            </p>
          </div>
        </div>

        {loading && (
          <div role="status" className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading stories...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
            <p role="alert">{error}</p>
            {error.startsWith("Log in") && (
              <Link
                to="/login"
                className="mt-3 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Log in
              </Link>
            )}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Just getting started</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              No news available
            </h2>
            <p className="mt-2 text-slate-500">
              New articles will appear here when published.
            </p>
          </div>
        )}

        {/* News Cards */}
        <NewsItems news={news} DeleteHandler={DeleteHandler} handleEdit={handleEdit} />
        {!loading && !error && dataLink && (
          <Pagination links={dataLink} page={page} />
        )}
      </div>
    </div>
  );
}
