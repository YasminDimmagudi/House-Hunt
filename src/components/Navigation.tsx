import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Menu,
  X,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  const handlePropertiesClick = () => {
    if (location.pathname === "/") {
      const propertiesSection = document.getElementById("properties-section");
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = "/#properties-section";
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-slate-800/95 backdrop-blur-md shadow-2xl border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-bold text-2xl text-blue-400">
              HouseHunt
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-blue-400 font-medium"
              >
                Home
              </Link>
              <button
                onClick={handlePropertiesClick}
                className="text-slate-300 hover:text-blue-400 font-medium"
              >
                Properties
              </button>

              {user?.role === "owner" && (
                <Link
                  to="/owner-dashboard"
                  className="text-slate-300 hover:text-blue-400"
                >
                  My Properties
                </Link>
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="text-slate-300 hover:text-blue-400"
                >
                  Admin Panel
                </Link>
              )}

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700"
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
                    
                    <DropdownMenuItem asChild>
                      <Link to="/profile/inquiries" className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Inquiries</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setAuthModal("login")}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setAuthModal("register")}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <Link
                to="/"
                className="block py-2 text-slate-300 hover:text-blue-400"
              >
                Home
              </Link>
              <button
                onClick={handlePropertiesClick}
                className="block py-2 text-slate-300 hover:text-blue-400 w-full text-left"
              >
                Properties
              </button>

              {user?.role === "owner" && (
                <Link
                  to="/owner-dashboard"
                  className="block py-2 text-slate-300 hover:text-blue-400"
                >
                  My Properties
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="block py-2 text-slate-300 hover:text-blue-400"
                >
                  Admin Panel
                </Link>
              )}

              {isLoggedIn ? (
                <div className="space-y-2 pt-2 border-t border-slate-700">
                  <div className="py-2 text-slate-400 text-sm font-medium">
                    {user?.name}
                  </div>
                  
                  <Link
                    to="/profile/inquiries"
                    className="block py-2 text-slate-300 hover:text-blue-400 flex items-center"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Inquiries
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="block py-2 text-slate-300 hover:text-blue-400 flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-600 text-red-400 hover:bg-slate-700 mt-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <Button
                    onClick={() => setAuthModal("login")}
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setAuthModal("register")}
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        type={authModal}
        isOpen={!!authModal}
        onClose={() => setAuthModal(null)}
      />
    </>
  );
};

export default Navigation;
