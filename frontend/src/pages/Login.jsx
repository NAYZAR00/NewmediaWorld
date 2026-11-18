import { Link } from "react-router-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useContext } from "react";
import { userContext } from "../context/userContextValue";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("/users/login", { email, password },{withCredentials: true});
      if (response.status === 200) {
      
        dispatch({ type: "LOGIN", payload: response.data.user });
        navigate("/"); // Redirect to dashboard or any other page
      } else {
        // Handle unsuccessful login (e.g., show error message to user)
        console.error("Login failed:", response.data.message);
      }
      // Handle successful login (e.g., store token, redirect, etc.)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center bg-slate-50 px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:rounded-3xl md:min-h-[570px] md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white md:flex lg:p-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-8 size-48 rounded-full border border-white/15" />
          <div className="absolute -bottom-28 -left-20 size-72 rounded-full bg-blue-500/20 blur-xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              The Daily <span className="mx-1 text-white/40">/</span> Media World
            </p>
            <div className="mt-24 max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                Good to have you back
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                Stories worth coming back for.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Sign in to pick up where you left off and stay close to the
                latest stories.
              </p>
            </div>
          </div>
          <p className="relative text-sm text-slate-400">
            A little more insight, every day.
          </p>
        </div>

        <div className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:hidden">
              The Daily <span className="mx-1 text-slate-400">/</span> Media World
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Sign in with your email and password to continue.
            </p>

            <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-stone-800"
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-stone-800"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25"
              >
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-stone-600">
              New to Media World?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:text-blue-900"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
