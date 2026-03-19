import {
  HomeIcon,
  CreditCardIcon,
  DollarSignIcon,
  BarChart3Icon,
  ClipboardList,
  UserIcon,
  SettingsIcon,
  LogOutIcon, Minimize2,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "@/contexts/ThemeContext.jsx";


function Sidebar({ className, onCloseSidebar, isOpen = true, isMobileOpen = false }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const routes = [
    {
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
      label: "Tổng quan",
    },
    {
      href: "/transactions",
      icon: <CreditCardIcon className="h-5 w-5" />,
      label: "Giao dịch",
    },
    {
      href: "/budgets",
      icon: <DollarSignIcon className="h-5 w-5" />,
      label: "Ngân sách",
    },
    {
      href: "/goals",
      icon: <BarChart3Icon className="h-5 w-5" />,
      label: "Mục tiêu",
    },
    {
      href: "/categories",
      icon: <ClipboardList className="h-5 w-5" />,
      label: "Danh mục",
    },
    {
      href: "/profile",
      icon: <UserIcon className="h-5 w-5" />,
      label: "Thông tin cá nhân",
    },
    {
      href: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
      label: "Cài đặt",
    },
  ];

  return (
    <>
      {/* Overlay - Mobile/Tablet */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => onCloseSidebar(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "h-full bg-white dark:bg-slate-950 shadow-sm transition-all duration-300",
          "fixed z-40 md:relative md:z-auto",
          "w-72",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          !isOpen && "md:opacity-0 md:pointer-events-none md:w-0",
          className
        )}
      >
      <div className="flex flex-col h-full w-72">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <DollarSignIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">Money Tracker</h1>
            </div>
            <Button size="sm" variant="ghost" onClick={() => onCloseSidebar(false)}>
              <Minimize2 />
            </Button>
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                size="lg"
                className="w-full justify-start py-5 mb-2 transition-colors"
                asChild
              >
                <Link to={route.href} className="pt-6 pb-6">
                  {route.icon}
                  <span className="ml-2 text-lg">{route.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-auto p-6 border-t">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-medium">Theme</span>
            <Toggle 
              pressed={isDark}
              onPressedChange={toggleTheme}
              className="border-1"
            >
              <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
            </Toggle>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-medium">Q to the H</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOutIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Sidebar;
