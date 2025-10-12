import React, { useState, useEffect } from "react";
import Home from "./Component/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { useAuth } from "./Component/Auth";
import Navbar from "./Component/Navbar";
import Profile from "./Component/Profile";
import Dashboard from "./Component/Dashboard";
import History from "./Component/History";
import Result from "./Component/Result";
import Login from "./Component/Login";
import TestPage from "./Component/TestPage";
import Exam from "./Component/Exam";
import "./App.css"; // 👈 CSS file jisme dark-light mode ka style hoga
import AddQues from "./Component/Admin/AddQues";

const App = () => {
  const { isloggedIn, loading } = useAuth();

  // ✅ Dark/Light mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Jab mode change ho, body par class lagao
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      {/* 🌙 Dark / Light Toggle Button */}
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ✅ Navbar / Sidebar */}
      {isloggedIn ? <Sidebar /> : <Navbar />}

      {/* ✅ Routes */}
      <Routes>
        <Route path="/home" element={isloggedIn ? <Navigate to="/profile" /> : <Home />} />
        <Route path="/profile" element={isloggedIn ? <Profile /> : <Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/result" element={<Result />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="*" element={<Navigate to={isloggedIn ? "/profile" : "/home"} />} />
        <Route path="/addQues" element={<AddQues/>}/>
      </Routes>
    </div>
  );
};

export default App;

