import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { PieChart, TrendingUp, Moon, Sun, Settings, CreditCard, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Sidebar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navItems = [
    {
      name: 'Portfolio Assessment',
      path: '/',
      icon: PieChart,
      dotColor: 'bg-blue-500',
    },
    {
      name: 'Stock Analysis',
      path: '/stock-analysis',
      icon: TrendingUp,
      dotColor: 'bg-emerald-500',
    },
  ];

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] border-r border-slate-200 dark:border-[#2d2d2d] flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-3 pt-6">
          <div className="text-xs text-slate-500 dark:text-slate-400 px-3 py-2 mb-1">SERVICES</div>
          <nav className="space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150 group cursor-pointer whitespace-nowrap overflow-hidden ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#2d2d2d]'
                      : 'hover:bg-slate-100 dark:hover:bg-[#2d2d2d]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dotColor}`} />
                    <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-300 flex-shrink-0" />
                    <span className={`text-sm ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200'}`}>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#2d2d2d] p-2 rounded-lg transition-colors whitespace-nowrap overflow-hidden flex-1">
                {isSignedIn ? (
                  <>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                      <span className="text-sm">JD</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-slate-100 truncate">John Doe</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">jdoe@asu.edu</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white flex-shrink-0">
                      <span className="text-sm">?</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-slate-100 truncate">Guest User</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Not signed in</p>
                    </div>
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              {isSignedIn && (
                <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Subscription
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {isSignedIn ? (
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleSignIn} className="cursor-pointer">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-slate-100 dark:hover:bg-[#2d2d2d] rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}