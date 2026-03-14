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
    { name: "Home", path: "/", icon: Home },
    { name: "EDA Dashboard", path: "/eda", icon: BarChart3 },
    { name: "Customer Segmentation", path: "/segmentation", icon: Users },
    { name: "Sentiment Model", path: "/sentiment", icon: Brain },
    { name: "Live Analyzer", path: "/analyzer", icon: Activity },
    { name: "Business Insights", path: "/insights", icon: LineChart },
    { name: "Methodology", path: "/methodology", icon: BookOpen },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 left-0 h-screen z-50
      backdrop-blur-lg bg-black/60
      border-r border-white/10
      transition-all duration-300
      ${open ? "w-64" : "w-16"}`}
    >

      {/* HEADER */}

      <div className="flex items-center justify-center p-4 border-b border-white/10">

        <Menu size={26} className="text-green-400" />

      </div>

      {/* MENU */}

      <nav className="flex flex-col gap-2 px-2 mt-4">

        {menu.map((item) => {

          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-md
              transition-all duration-200
              ${active
                ? "bg-green-500 text-black"
                : "text-gray-300 hover:bg-white/10 hover:text-green-400"
              }`}
            >

              <Icon size={20} />

              {open && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}

            </Link>
          );

        })}

      </nav>

    </div>
  );
};

export default Sidebar;