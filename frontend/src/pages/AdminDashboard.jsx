import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../assets/logo.png";
import React, { useState,useEffect } from "react";

function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isActive = (item) =>
    active === item
      ? "bg-blue-600 text-white"
      : "text-slate-300 hover:bg-[#1E293B]";

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

const date = currentTime.toLocaleDateString("en-IN", {
  // weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const time = currentTime.toLocaleTimeString("en-IN");
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`
    fixed md:static top-0 left-0 z-50
    h-screen w-60 bg-[#0F172A]
    border-r border-slate-700
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    flex flex-col
  `}>
        
        {/* Sidebar Header */}
        <div className="h-16 w-full flex items-center gap-1 ml-5 mt-3">
          <div>
            <img src={logo} className="w-15 h-15" alt="logo" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg md:text-xl font-bold">
              AI Support
            </span>
            <span className="text-xs md:text-sm text-slate-400">
              ADMIN PANEL
            </span>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col mx-4">
          
          {/* Menu Items */}
          <ul className="mt-6 space-y-2">
            <li>
              <button
                onClick={() => setActive("Dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
                  "Dashboard"
                )}`}
              >
                <i className="fa-solid fa-house"></i>
                <span>Dashboard</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActive("Tickets")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
                  "Tickets"
                )}`}
              >
                <i className="fa-solid fa-ticket"></i>
                <span>Tickets</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActive("Analytics")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
                  "Analytics"
                )}`}
              >
                <i className="fa-solid fa-chart-line"></i>
                <span>Analytics</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActive("Users")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
                  "Users"
                )}`}
              >
                <i className="fa-solid fa-users"></i>
                <span>Users</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setActive("Settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(
                  "Settings"
                )}`}
              >
                <i className="fa-solid fa-gear"></i>
                <span>Settings</span>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            onClick={() => setActive("Logout")}
            className={`mt-auto mb-6 border-t border-slate-700 pt-4 w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              active === "Logout"
                ? "bg-red-600 text-white"
                : "text-red-400 hover:bg-red-500 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 md:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="h-16 bg-[#020617] border-b border-slate-700 flex ">
            <div className="flex items-center gap-4 p-1 w-full justify-between">
              
              {/* toggle and header section */}
              <div className="flex gap-2">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-xl  ml-2">
                  <i className="fa-solid fa-bars"></i>
                </button>
                
                <div>
                <h1 className="text-xl font-semibold md:pl-2">Admin Dashboard</h1>
                <p className="text-xs text-slate-400 md:pl-2">
                 Welcome back, Admin
                </p></div>
 
              </div>

              <div className="mr-5">
                {/* <p className="text-sm font-medium">{</p> */}
                
                <p className="text-xs text-white"><i class="fa-solid fa-calendar"></i> {date}, {time}</p>
              </div>

            </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 bg-[#020617] flex flex-col p-5">
          
          {/* basic info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1E293B]">hi</div>
            <div className="bg-[#1E293B]">hi</div>
            <div className="bg-[#1E293B]">hi</div>
            <div className="bg-[#1E293B]">hi</div>
           
          </div>
          
          {/* table */}
          <div></div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;