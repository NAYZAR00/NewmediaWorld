import { useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContextValue";

export default function Navbar() {
  let navigate = useNavigate();
  const { user, loading, dispatch } = useContext(userContext);
  const logout = async () => {
    try {
      let res = await api.post("/users/logout");

      if (res.status === 200) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }

      // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <nav className="border-b border-slate-200 bg-white px-3 py-3 text-slate-900 sm:px-6 sm:py-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:gap-4 lg:flex-row">
            <div className="text-center text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              <Link to="/" className="text-slate-950">
                The Daily <span className="font-medium text-blue-600">/ Media World</span>
              </Link>
            </div>

            <div className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:gap-2">
              <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 sm:px-4 sm:text-base">
                Home
              </Link>

              <Link
                to="/create-news"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 sm:px-4 sm:text-base"
              >
                Create News
              </Link>
              {!user && !loading && (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 sm:px-4 sm:text-base"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 sm:px-4 sm:text-base"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <div className="flex min-h-0 items-center justify-center">
              {!loading && user && (
                <button
                  onClick={logout}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:text-base"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
      </nav>
    </div>
  );
}
