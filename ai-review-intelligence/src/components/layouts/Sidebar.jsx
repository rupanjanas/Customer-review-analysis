import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  Home,
  BarChart3,
  Users,
  Brain,
  Activity,
  LineChart,
  BookOpen
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu = [
    { name: "Home",                 path: "/",              icon: Home },
    { name: "EDA Dashboard",        path: "/eda",           icon: BarChart3 },
    { name: "Customer Segmentation",path: "/segmentation",  icon: Users },
    { name: "Sentiment Model",      path: "/sentiment",     icon: Brain },
    { name: "Live Analyzer",        path: "/analyzer",      icon: Activity },
    { name: "Business Insights",    path: "/insights",      icon: LineChart },
    { name: "Methodology",          path: "/methodology",   icon: BookOpen },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 left-0 h-screen z-50
        flex flex-col
        backdrop-blur-xl bg-black/70
        border-r border-white/10
        transition-all duration-300 ease-in-out
        ${open ? "w-64" : "w-16"}
        shadow-[4px_0_24px_rgba(0,0,0,0.4)]`}
    >

      {/* HEADER */}
      <div className={`flex items-center border-b border-white/10 h-16 px-4
        ${open ? "justify-between" : "justify-center"}`}
      >
        <Menu size={22} className="text-green-400 shrink-0" />
        {open && (
          <span className="text-green-400 font-bold text-sm tracking-widest uppercase ml-3 whitespace-nowrap">
            ReviewAI
          </span>
        )}
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1 px-2 mt-4 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              title={!open ? item.name : undefined}
              className={`relative flex items-center gap-3 p-3 rounded-lg
                transition-all duration-200 group overflow-hidden
                ${active
                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : "text-gray-400 hover:bg-white/5 hover:text-green-400 border border-transparent"
                }`}
            >
              {/* Active left bar indicator */}
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-green-400 rounded-full" />
              )}

              {/* Hover glow */}
              <span className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />

              <Icon
                size={18}
                className={`shrink-0 relative z-10 transition-transform duration-200
                  ${active ? "text-green-400" : "group-hover:scale-110"}`}
              />

              {open && (
                <span className="text-sm font-medium whitespace-nowrap relative z-10 transition-all duration-200">
                  {item.name}
                </span>
              )}

              {/* Active dot when collapsed */}
              {!open && active && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className={`border-t border-white/10 p-4 flex items-center gap-3
        ${open ? "justify-start" : "justify-center"}`}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        {open && (
          <span className="text-xs text-gray-500 whitespace-nowrap">
            System Online
          </span>
        )}
      </div>

    </div>
  );
};

export default Sidebar;