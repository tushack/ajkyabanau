import { Link } from "react-router-dom";

export default function Home() {
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
      <header className="border-b border-[#e8dcc8] bg-[#f8f8f8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efa62b] text-black font-bold">
              ✕
            </div>
            <h1 className="text-2xl font-bold">RecipeHub</h1>
          </div>

          <nav className="hidden md:flex items-center gap-10 font-medium">
            <a href="#" className="hover:text-[#efa62b]">
              Home
            </a>
            <a href="#" className="hover:text-[#efa62b]">
              About
            </a>
            <a href="#" className="hover:text-[#efa62b]">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="font-semibold">Log In</button>
            <button className="rounded-full bg-[#efa62b] px-6 py-3 font-semibold text-black">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
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
                  <Link
                    to="/input-ingredient"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#efa62b] px-8 py-4 text-lg font-semibold text-black shadow-lg"
                  >
                    Get Started →
                  </Link>

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
    </div>
  );
}