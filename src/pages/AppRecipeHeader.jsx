import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LANGUAGE_OPTIONS } from "../lib/language";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-[#94a3b8]"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export default function AppFlowHeader({
  t,
  language,
  onLanguageChange,
  showSearch = false,
  searchText = "",
  onSearchChange,
  recipesPath = "/search-results",
  savedPath = "/search-results?tab=favorites",
  savedLabel,
  active = "home", // home | recipes | saved
}) {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const homeTarget = currentUser ? "/input-ingredient" : "/";

  const getUserInitial = () => {
    const name = currentUser?.displayName?.trim();
    if (name) return name.charAt(0).toUpperCase();

    const email = currentUser?.email?.trim();
    if (email) return email.charAt(0).toUpperCase();

    return "U";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const savedText = savedLabel || t("saved");

  return (
    <header className="border-b border-[#e9dcc8] bg-[#f8f7f4]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Aj Kya Banega"
              className="h-12 w-12 rounded-full object-cover"
            />
            <button
              onClick={() => navigate(homeTarget)}
              className="text-[18px] font-bold text-[#111827] sm:text-[24px]"
            >
              Aj Kya Banega
            </button>
          </div>

          <nav className="hidden items-center gap-10 text-[16px] font-medium text-[#111827] md:flex">
            <button
              onClick={() => navigate(homeTarget)}
              className={active === "home" ? "text-[#eb9f25]" : "hover:text-[#eb9f25]"}
            >
              {t("home")}
            </button>

            <button
              onClick={() => navigate(recipesPath)}
              className={active === "recipes" ? "text-[#eb9f25]" : "hover:text-[#eb9f25]"}
            >
              {t("recipes")}
            </button>

            <button
              onClick={() => navigate(savedPath)}
              className={active === "saved" ? "text-[#eb9f25]" : "hover:text-[#eb9f25]"}
            >
              {savedText}
            </button>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {showSearch && (
              <div className="hidden items-center gap-3 rounded-full border border-[#eee2cf] bg-white px-4 py-3 lg:flex lg:w-[230px]">
                <SearchIcon />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder={t("searchRecipes")}
                  className="w-full bg-transparent text-[14px] text-[#475569] outline-none placeholder:text-[#94a3b8]"
                />
              </div>
            )}

            <div className="hidden md:flex items-center gap-3">
              <span className="text-[14px] font-medium text-[#475569]">
                {t("language")}
              </span>

              <div className="rounded-full border border-[#ead8c0] bg-white px-4 py-3">
                <select
                  value={language}
                  onChange={onLanguageChange}
                  className="bg-transparent text-[14px] font-medium text-[#111827] outline-none"
                >
                  {LANGUAGE_OPTIONS.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#ead8c0] bg-[#efc7ae] shadow-sm"
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[16px] font-semibold text-[#111827]">
                    {getUserInitial()}
                  </span>
                )}
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-[#ead8c0] bg-white p-3 shadow-xl">
                  <div className="flex items-center gap-3 rounded-xl bg-[#fbfaf7] px-3 py-3">
                    {currentUser?.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || "User"}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#efc7ae] text-[15px] font-semibold text-[#111827]">
                        {getUserInitial()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#111827]">
                        {currentUser?.displayName || "Guest User"}
                      </p>
                      <p className="truncate text-[12px] text-[#64748b]">
                        {currentUser?.email || "Not signed in"}
                      </p>
                    </div>
                  </div>

                  {currentUser ? (
                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full rounded-xl bg-[#111827] px-4 py-3 text-left text-[14px] font-medium text-white"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        navigate(homeTarget);
                      }}
                      className="mt-3 w-full rounded-xl border border-[#ead8c0] px-4 py-3 text-left text-[14px] font-medium text-[#111827]"
                    >
                      Go to Home
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead8c0] bg-white text-[#111827] md:hidden"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {showSearch && (
          <div className="mt-4 flex justify-center md:hidden">
            <div className="flex w-full max-w-[520px] items-center gap-3 rounded-full border border-[#eee2cf] bg-white px-4 py-3">
              <SearchIcon />
              <input
                type="text"
                value={searchText}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={t("searchRecipes")}
                className="w-full bg-transparent text-[14px] text-[#475569] outline-none placeholder:text-[#94a3b8]"
              />
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="mt-4 rounded-[22px] border border-[#ead8c0] bg-white p-4 shadow-sm md:hidden">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(homeTarget);
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {t("home")}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(recipesPath);
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {t("recipes")}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(savedPath);
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {savedText}
              </button>

              <div className="mt-2 rounded-2xl border border-[#ead8c0] bg-[#fbfaf7] px-4 py-3">
                <div className="mb-2 text-[13px] font-medium text-[#475569]">
                  {t("language")}
                </div>
                <select
                  value={language}
                  onChange={onLanguageChange}
                  className="w-full rounded-xl border border-[#ead8c0] bg-white px-3 py-3 text-[14px] font-medium text-[#111827] outline-none"
                >
                  {LANGUAGE_OPTIONS.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-[#111827] px-4 py-3 text-left text-[15px] font-medium text-white"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}