import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18" />
    </svg>
  );
}

export default function AppHeader({ active = "home", onAuthClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const homeTarget = currentUser ? "/input-ingredient" : "/";

  const navClass = (page) =>
    active === page
      ? "font-semibold text-[#efa62b]"
      : "hover:text-[#efa62b]";

  const mobileNavClass = (page) =>
    active === page
      ? "rounded-xl bg-[#faf4ea] px-4 py-3 text-left text-[15px] font-semibold text-[#111827]"
      : "rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]";

  return (
    <header className="border-b border-[#e8dcc8] bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Aj Kya Banega"
              className="h-12 w-12 rounded-full object-cover"
            />
            <Link to={homeTarget} className="text-2xl font-bold">
              Aj Kya Banega
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10 font-medium">
            <Link to={homeTarget} className={navClass("home")}>
              Home
            </Link>
            <Link to="/about" className={navClass("about")}>
              About
            </Link>
            <Link to="/contact" className={navClass("contact")}>
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onAuthClick?.()}
              className="font-semibold"
            >
              Log In
            </button>

            <button
              onClick={() => onAuthClick?.()}
              className="rounded-full bg-[#efa62b] px-6 py-3 font-semibold text-black"
            >
              Sign Up
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8dcc8] bg-white text-[#111827] md:hidden"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 rounded-[22px] border border-[#e8dcc8] bg-white p-4 shadow-sm md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                to={homeTarget}
                className={mobileNavClass("home")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={mobileNavClass("about")}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={mobileNavClass("contact")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuthClick?.();
                  }}
                  className="rounded-full border border-[#e8dcc8] px-4 py-3 text-center font-semibold"
                >
                  Log In
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuthClick?.();
                  }}
                  className="rounded-full bg-[#efa62b] px-4 py-3 text-center font-semibold text-black"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}