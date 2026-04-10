import { useState, useEffect } from "react";
import { Menu, X, Activity, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Onco<span className="text-teal-600">Detect</span>
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-600 hover:text-teal-600 font-medium">
              Home
            </a>
            <a href="#about" className="text-slate-600 hover:text-teal-600 font-medium">
              About
            </a>
            <a href="#team" className="text-slate-600 hover:text-teal-600 font-medium">
              Team
            </a>

            <a
              href="#workspace"
              className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition flex items-center gap-2"
            >
              Workspace <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg p-4">
          <div className="flex flex-col space-y-3">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#team">Team</a>
            <a href="#workspace" className="bg-teal-600 text-white p-2 rounded">
              Workspace
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}