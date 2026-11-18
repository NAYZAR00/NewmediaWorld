import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-xl px-3 py-8 sm:px-6 sm:py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-stone-600">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to home
      </Link>
      </div>
    </main>
  );
}
