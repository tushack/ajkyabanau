import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AppHeader from "../pages/AppHeader";

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

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-5 w-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7" />
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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStartPopup, setShowStartPopup] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      title: "Inventory Sync",
      description:
        "Track what you have and get notifications before ingredients expire.",
      icon: "📦",
    },
    {
      title: "Smart Suggestions",
      description:
        "AI-powered recipe recommendations based on your unique food inventory.",
      icon: "✨",
    },
    {
      title: "Community Driven",
      description:
        'Join 10k+ food lovers sharing their best "fridge raid" creations daily.',
      icon: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111827]">

    <AppHeader
      active="home"
      onAuthClick={() => setShowStartPopup(true)}
    />      <main>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1600&q=80"
              alt="food"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

            <div className="relative z-10 flex min-h-[560px] items-center px-8 sm:px-12 lg:px-16">
              <div className="max-w-[620px]">
                <div className="mb-6 inline-flex rounded-full border border-[#8f6522] bg-[#6d4707]/60 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#f0aa2d]">
                  🔥 Trending Recipes
                </div>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] text-white">
                  What's in <br />
                  Your <span className="text-[#efa62b]">Fridge?</span>
                </h2>

                <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-white/90">
                  Turn your leftovers into gourmet meals with our easy recipes.
                  Stop wasting food and start cooking like a chef.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                onClick={() => setShowStartPopup(true)}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#efa62b] px-8 py-4 text-lg font-semibold text-black shadow-lg transition hover:scale-[1.01]"
              >
                Get Started 
                <ArrowRightIcon />
              </button>

                  <button className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur">
                    Browse Recipes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-[#efdfc8] bg-[#faf5ec] px-8 py-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f7e4c2] text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
   {showStartPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-md">
    <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/30 bg-white/20 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/45 via-white/20 to-[#f6d9a3]/15" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f3c56b]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b26d00]">
              Get Started
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#111827]">
              Continue with Aj Kya Banega
            </h3>
          </div>

          <button
            onClick={() => setShowStartPopup(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/30 text-xl text-[#6b7280] backdrop-blur-md transition hover:bg-white/45"
          >
            ×
          </button>
        </div>

        <p className="mt-3 text-[15px] leading-7 text-[#4b5563]">
          Choose how you want to continue. You can explore recipes instantly as
          a guest or continue with your account.
        </p>

        <div className="mt-6 grid gap-4">
          <button
            onClick={() => {
              setShowStartPopup(false);
              navigate("/input-ingredient");
            }}
            className="group flex items-center justify-between rounded-[24px] border border-white/35 bg-white/35 px-5 py-4 text-left shadow-sm backdrop-blur-xl transition duration-200 hover:bg-white/50 hover:shadow-md"
          >
            <div>
              <p className="text-[16px] font-semibold text-[#111827]">
                Continue as Guest
              </p>
              <p className="mt-1 text-sm text-[#64748b]">
                Explore recipes instantly without signing in
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4df] text-[#c57d00] transition group-hover:scale-105">
              <ArrowRightIcon />
            </span>
          </button>

          <button
            onClick={() => {
              setShowStartPopup(false);
            }}
            className="group flex items-center justify-between rounded-[24px] border border-white/35 bg-white/25 px-5 py-4 text-left shadow-sm backdrop-blur-xl transition duration-200 hover:bg-white/45 hover:shadow-md"
          >
            <div>
              <p className="text-[16px] font-semibold text-[#111827]">
                I Have an Account
              </p>
              <p className="mt-1 text-sm text-[#64748b]">
                Sign in to continue with your saved recipes and preferences
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[#111827] transition group-hover:scale-105">
              <ArrowRightIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}