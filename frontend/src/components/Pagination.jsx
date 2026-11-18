
import { useSearchParams } from "react-router-dom";

export default function Pagination({ links, page }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageLinks = Array.isArray(links?.looplink) ? links.looplink : [];
  const totalPages = pageLinks.length;
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Number(links?.current ?? page) || 1)
  );

  if (!totalPages) {
    return null;
  }

  const goToPage = (nextPage) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", String(nextPage));
    setSearchParams(nextSearchParams);
  };

  return (
    <nav
      aria-label="News pagination"
      className="mx-auto flex max-w-full items-center justify-center gap-2 overflow-x-auto py-6 sm:py-8"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageLinks.map((pageLink, index) => {
        const pageNumber = Number(pageLink?.loopnumber) || index + 1;
        return (
          <button
            type="button"
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            aria-label={`Go to page ${pageNumber}`}
            className={`h-10 w-10 shrink-0 rounded-lg text-sm font-semibold transition ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
      >
        Next
      </button>
    </nav>
  );
}
