import {
  HomeIcon,
  CreditCardIcon,
  DollarSignIcon,
  BarChart3Icon,
  ClipboardList,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";

// import { ThemeToggle } from "@/components/layout/ThemeToggle"

function Sidebar({ className }) {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    {
      href: "/dashboard",
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
    <div
      className={cn("h-full bg-white dark:bg-slate-950 shadow-sm", className)}
    >
      <div className="flex flex-col h-full w-66">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <DollarSignIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Money Tracker</h1>
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                size="lg"
                className="w-full justify-start py-5 mb-3 transition-colors"
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
            <Toggle className="border-1">
              <FontAwesomeIcon icon={faSun} />
            </Toggle>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-medium">Q to the H</p>
              {/* <p className="text-xs text-muted-foreground">Premium Account</p> */}
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOutIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
