// MainLayout.jsx

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar search={search} setSearch={setSearch} />
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative container mx-auto px-4 py-8 max-w-7xl">
          <Outlet context={{ search }} />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;