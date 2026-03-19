import { Menu, DollarSignIcon } from 'lucide-react';
import { Button } from "@/components/ui/button.jsx";

function TopBar({ onMenuClick }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm z-40 md:hidden">
      <div className="flex items-center justify-between h-full px-4">
        {/* Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <DollarSignIcon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold">Money Tracker</h1>
        </div>

        {/* Spacer */}
        <div className="w-10" />
      </div>
    </div>
  );
}

export default TopBar;
