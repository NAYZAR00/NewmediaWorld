
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import api from "../api/axios";
import { userContext } from "../context/userContextValue";

export default function Register() {
  const navigate = useNavigate();
  const { dispatch } = useContext(userContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      },{withCredentials: true});
      
      if (response.status === 201) {
        dispatch({ type: "LOGIN", payload: response.data.user });
        navigate("/");
      }
    } catch (error) {
      const validationMessage = error.response?.data?.errors?.[0]?.msg;
      setErrorMessage(
        validationMessage ||
          error.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center bg-slate-50 px-3 py-8 sm:px-6 sm:py-12 lg:px-8">

      <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:rounded-3xl md:min-h-[610px] md:grid-cols-2">

        {/* Left Side */}
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
                Make room for new ideas
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
                Your next great read starts here.
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-300">
                Join a community curious about what is happening and what
                comes next.
              </p>

            </div>
          </div>

          <p className="relative text-sm text-slate-400">
            A little more insight, every day.
          </p>

        </div>

        {/* Right Side - Registration Form */}
        <div className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14">

          <div className="w-full max-w-md">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:hidden">
              The Daily <span className="mx-1 text-slate-400">/</span> Media World
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              Join us to keep up with the stories that matter to you.
            </p>

            {errorMessage && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {errorMessage}
              </p>
            )}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>

              {/* Username */}
              <div>

                <label
                  htmlFor="register-username"
                  className="mb-2 block text-sm font-medium text-stone-800"
                >
                  Username
                </label>

                <input
                  id="register-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Choose a username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Email */}
              <div>

                <label
                  htmlFor="register-email"
                  className="mb-2 block text-sm font-medium text-stone-800"
                >
                  Email address
                </label>

                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="register-password"
                  className="mb-2 block text-sm font-medium text-stone-800"
                >
                  Password
                </label>

                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

            </form>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-stone-600">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:text-blue-900"
              >
                Sign in
              </Link>

            </p>

          </div>
        </div>

      </section>
    </main>
  );
}
