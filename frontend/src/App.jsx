
import {Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
}
