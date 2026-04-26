import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AppHeader from "../pages/AppHeader";
import AuthPopup from "../pages/AuthPopup";


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

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const highlights = [
    {
      title: "Smart Recipe Discovery",
      description:
        "Find delicious recipes based on the ingredients already available in your kitchen.",
      icon: "✨",
    },
    {
      title: "Reduce Food Waste",
      description:
        "Make better use of leftovers and available ingredients instead of letting them go to waste.",
      icon: "♻️",
    },
    {
      title: "Simple Cooking Experience",
      description:
        "Get easy recipe ideas and step-by-step inspiration for everyday cooking.",
      icon: "🍳",
    },
  ];

  const stats = [
    { value: "1000+", label: "Recipe Ideas" },
    { value: "Fast", label: "Smart Suggestions" },
    { value: "Easy", label: "Cooking Guidance" },
    { value: "Daily", label: "Kitchen Inspiration" },
  ];
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111827]">
      <AppHeader
        active="about"
        onAuthClick={() => setShowAuthPopup(true)}
      />
      <main>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="overflow-hidden rounded-[32px] border border-[#efdfc8] bg-gradient-to-br from-[#fffaf2] via-[#fff8ef] to-[#fdf0dc] shadow-sm">
            <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
              <div>
                <div className="mb-5 inline-flex rounded-full border border-[#f1d7ac] bg-white px-4 py-2 text-sm font-semibold text-[#c57d00] shadow-sm">
                  About Us
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={logo}
                    alt="Aj Kya banega"
                    className="h-14 w-14 rounded-full object-cover shadow-sm"
                  />
                  <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                    Aj Kya banega
                  </h1>
                </div>

                <p className="text-[17px] leading-8 text-[#5b6472] sm:text-[18px]">
                  <span className="font-semibold text-[#111827]">
                    Aj Kya Banega
                  </span>{" "}
                  is a smart recipe platform built to solve one simple daily
                  question —
                  <span className="font-semibold text-[#c57d00]">
                    {" "}
                    “Aaj kya banega?”
                  </span>{" "}
                  We help users discover delicious meals using the ingredients
                  they already have at home.
                </p>

                <p className="mt-5 text-[17px] leading-8 text-[#5b6472] sm:text-[18px]">
                  Our goal is to make cooking easy, practical, and stress-free.
                  Whether you have a few ingredients left in your kitchen or
                  want a quick meal idea, our platform helps you turn them into
                  something tasty and useful.
                </p>

                <p className="mt-5 text-[17px] leading-8 text-[#5b6472] sm:text-[18px]">
                  We believe cooking should be simple, creative, and enjoyable
                  for everyone. With smart recipe suggestions and helpful
                  guidance, Aj Kya Banega helps save time, reduce food waste,
                  and make home cooking better every day.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[22px] border border-[#efd9b7] bg-white px-5 py-5 shadow-sm"
                    >
                      <div className="text-2xl font-bold text-[#c57d00]">
                        {item.value}
                      </div>
                      <div className="mt-2 text-sm font-medium text-[#5b6472]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-full bg-[#efa62b] px-7 py-3 text-base font-semibold text-black shadow-sm"
                  >
                    Back to Home
                  </Link>
                  <Link
                    to="/input-ingredient"
                    className="inline-flex items-center justify-center rounded-full border border-[#e8dcc8] bg-white px-7 py-3 text-base font-semibold text-[#111827]"
                  >
                    Start Exploring
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[26px] border border-[#efdcc0] bg-white px-6 py-6 shadow-sm"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1d6] text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-7 text-[#5b6472]">
                      {item.description}
                    </p>
                  </div>
                ))}

                <div className="rounded-[26px] bg-[#111827] px-6 py-7 text-white shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f5bf62]">
                    Our Mission
                  </p>
                  <p className="mt-4 text-[17px] leading-8 text-white/90">
                    To help every home cook make better meals with what they
                    already have — quickly, easily, and without wasting food.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="rounded-[30px] border border-[#efdfc8] bg-white px-6 py-8 shadow-sm lg:px-10">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-4 text-3xl">🍽️</div>
                <h3 className="text-xl font-semibold">Our Vision</h3>
                <p className="mt-3 leading-7 text-[#5b6472]">
                  To make everyday cooking smarter, simpler, and more enjoyable
                  for every home.
                </p>
              </div>

              <div>
                <div className="mb-4 text-3xl">💡</div>
                <h3 className="text-xl font-semibold">What We Do</h3>
                <p className="mt-3 leading-7 text-[#5b6472]">
                  We turn available ingredients into practical recipe ideas that
                  people can cook with confidence.
                </p>
              </div>

              <div>
                <div className="mb-4 text-3xl">❤️</div>
                <h3 className="text-xl font-semibold">Why It Matters</h3>
                <p className="mt-3 leading-7 text-[#5b6472]">
                  Less confusion, less food waste, and more delicious meals made
                  from what you already have.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AuthPopup
        open={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
      />
    </div>
  );
}