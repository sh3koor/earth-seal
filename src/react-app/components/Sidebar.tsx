import { Link, useLocation } from "react-router";
import {
  Home,
  AlertTriangle,
  Shield,
  Activity,
  Users,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/react-app/context/AuthContext";
import { useTheme } from "@/react-app/context/ThemeContext";
import { useState } from "react";
import EarthSeal from "../../shared/images/EarthSeal.png";

interface SidebarProps {
  alertsCount: number;
}

export default function Sidebar({ alertsCount }: SidebarProps) {
  const location = useLocation();
  const { user, switchRole } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/monitoring", label: "Monitoring", icon: Activity },
    {
      path: "/alerts",
      label: "Alerts",
      icon: AlertTriangle,
      badge: alertsCount,
    },
    { path: "/compliance", label: "Compliance", icon: Shield },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isCollapsed ? "hidden" : "block"
        }`}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-emerald-900 to-teal-800 dark:from-gray-900 dark:to-gray-800 text-white shadow-2xl transition-all duration-300 z-50 ${
          isCollapsed ? "w-20" : "w-64"
        } lg:relative lg:translate-x-0 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-emerald-700 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <img src={EarthSeal} alt="Earth Seal" className="w-14 h-14" />
                <div>
                  <h1 className="text-xl font-bold">Earth Seal</h1>
                  <p className="text-emerald-200 dark:text-gray-400 text-xs">
                    CCS MRV Platform
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-emerald-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all hover:bg-emerald-800 dark:hover:bg-gray-700 ${
                  isActive ? "bg-emerald-700 dark:bg-gray-700 shadow-lg" : ""
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4">
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } py-3 px-4 rounded-lg transition-all hover:bg-emerald-800 dark:hover:bg-gray-700`}
          >
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              {!isCollapsed && (
                <span className="font-medium">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* User Profile & Role Switch */}
        {!isCollapsed && (
          <div className="p-4 border-t border-emerald-700 dark:border-gray-700">
            <div className="bg-emerald-800 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-emerald-200 dark:text-gray-400 text-xs">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-emerald-200 dark:text-gray-400">
                  Current Role:
                </p>
                <select
                  value={user?.role}
                  onChange={(e) =>
                    switchRole(e.target.value as "admin" | "proponent")
                  }
                  className="w-full bg-emerald-700 dark:bg-gray-600 text-white text-sm rounded px-2 py-1 border border-emerald-600 dark:border-gray-500"
                >
                  <option value="admin">Administrator</option>
                  <option value="proponent">Proponent</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`lg:hidden fixed top-4 left-4 z-30 p-2 bg-emerald-900 dark:bg-gray-800 text-white rounded-lg shadow-lg ${
          !isCollapsed ? "hidden" : "block"
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
