import { Link } from "react-router-dom";

export default function AppFooter({
  active = "",
  brand = "Aj Kya Banega",
  description = "© 2026 Aj Kya Banega. Smart recipe discovery for everyday cooking.",
}) {
  const linkClass = (key) =>
    active === key
      ? "font-semibold text-[#a76500]"
      : "hover:text-[#a76500] transition";

  return (
    <footer className="border-t border-[#e7ddd0] bg-[#f1eee7]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h3 className="text-[18px] font-semibold text-[#171717]">
            {brand}
          </h3>
          <p className="mt-2 max-w-sm text-[14px] leading-6 text-[#72665b]">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[14px] text-[#5d5248]">
          <Link to="/about" className={linkClass("about")}>
            About
          </Link>

          <Link to="/privacy-policy" className={linkClass("privacy")}>
            Privacy Policy
          </Link>

          <Link to="/terms-of-service" className={linkClass("terms")}>
            Terms of Service
          </Link>

          <Link to="/contact" className={linkClass("contact")}>
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}