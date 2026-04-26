import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import AppHeader from "../pages/AppHeader";
import AuthPopup from "../pages/AuthPopup";
import { FiBookmark } from "react-icons/fi";
import { db } from "../lib/firebase";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}


function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.6-3 4.1-4.5 7-4.5s5.4 1.5 7 4.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M8 7h10" />
      <path d="M8 12h10" />
      <path d="M8 17h10" />
      <circle cx="5" cy="7" r="1" fill="currentColor" />
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="5" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path d="M12 2.75A9.25 9.25 0 1 0 21.25 12 9.26 9.26 0 0 0 12 2.75Zm.75 4.5v4.06l2.9 1.7-.75 1.29-3.65-2.15V7.25Z" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <rect x="4" y="12" width="3" height="8" rx="1" />
      <rect x="10.5" y="8" width="3" height="12" rx="1" />
      <rect x="17" y="5" width="3" height="15" rx="1" />
    </svg>
  );
}

// const ITEMS = [
//   {
//     id: 1,
//     title: "Heirloom Tomato & Whipped Feta Salad",
//     description:
//       "A symphony of summer harvests, featuring balsamic reduction and cold-pressed olive oil drizzle over hand-whipped sheep's milk feta.",
//     time: "15 Mins",
//     level: "Beginner",
//     tag: "VEGETARIAN",
//     image:
//       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "48-Hour Slow Braised Beef Short Ribs",
//     description:
//       "A masterclass in patience. Meltingly tender beef served alongside stone-ground polenta and a reduction of Cabernet Sauvignon.",
//     time: "4 hrs (Prep)",
//     level: "Intermediate",
//     tag: "MAIN COURSE",
//     image:
//       "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Milanese Saffron Risotto with Scallops",
//     description:
//       "Golden-hued Arborio rice infused with premium Persian saffron filaments and topped with butter-basted sea scallops.",
//     time: "45 Mins",
//     level: "Expert",
//     tag: "SEAFOOD",
//     image:
//       "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Valrhona Dark Chocolate Soufflé",
//     description:
//       "The ultimate French dessert. Delicate, airy, and intensely chocolatey, using 70% dark Valrhona cacao for a deep, complex finish.",
//     time: "30 Mins",
//     level: "Intermediate",
//     tag: "DESSERT",
//     image:
//       "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
//   },
// ];

function Badge({ icon, text, blue }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[12px] font-medium ${blue
        ? "bg-[#d9edf9] text-[#376985]"
        : "bg-[#f1ece5] text-[#5d5248]"
        }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

function ListCard({ item, onOpen }) {
  return (
    <div className="rounded-[24px] bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-[#f0ebe2] sm:px-6 sm:py-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="w-full lg:w-[220px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-[180px] w-full rounded-[18px] object-cover lg:h-[145px]"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[24px] font-semibold leading-tight text-[#171717]">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[720px] text-[16px] leading-7 text-[#5b5046]">
                {item.description}
              </p>
            </div>

            {/* <button className="hidden lg:flex h-11 w-11 items-center justify-center rounded-full border border-[#eadfce] bg-[#fcfaf6] text-[#7b5c38] transition hover:bg-[#f7efe2]">
              <FiBookmark className="h-5 w-5" />
            </button> */}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Badge icon={<ClockIcon />} text={item.time} />
            <Badge icon={<LevelIcon />} text={item.level} />
            <Badge text={item.tag} blue />
          </div>
        </div>

        <div className="flex items-center gap-4 self-stretch lg:pl-6">
          {/* <button className="hidden lg:flex h-11 w-11 items-center justify-center rounded-full border border-[#eadfce] bg-[#fcfaf6] text-[#7b5c38] transition hover:bg-[#f7efe2]">
            <FiBookmark className="h-5 w-5" />
          </button> */}

          <div className="hidden h-[42px] w-px bg-[#efe8dd] lg:block" />

          <button
            onClick={() => onOpen(item)}
            className="rounded-full bg-[#a76500] px-7 py-3 text-[18px] font-medium text-white transition hover:opacity-95"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

function GridCard({ item, onOpen }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-[#f0ebe2]">
      <img
        src={item.image}
        alt={item.title}
        className="h-[220px] w-full rounded-[18px] object-cover"
      />

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-[22px] font-semibold leading-tight text-[#171717]">
          {item.title}
        </h3>

        {/* <button className="mt-1 flex h-11 w-11 items-center justify-center rounded-full border border-[#eadfce] bg-[#fcfaf6] text-[#7b5c38] transition hover:bg-[#f7efe2]">
          <FiBookmark className="h-5 w-5" />
        </button> */}
      </div>

      <p className="mt-3 text-[15px] leading-7 text-[#5b5046]">
        {item.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Badge icon={<ClockIcon />} text={item.time} />
        <Badge icon={<LevelIcon />} text={item.level} />
        <Badge text={item.tag} blue />
      </div>

      <button
        onClick={() => onOpen(item)}
        className="mt-5 rounded-full bg-[#a76500] px-6 py-3 text-[16px] font-medium text-white transition hover:opacity-95"
      >
        View Recipe
      </button>
    </div>
  );
}

export default function BrowseCollections() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemsError, setItemsError] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter(
      (item) =>
        (item.title || "").toLowerCase().includes(query) ||
        (item.description || "").toLowerCase().includes(query) ||
        (item.tag || "").toLowerCase().includes(query)
    );
  }, [search, items]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "browseCollections"),
      (snapshot) => {
        const firebaseItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(firebaseItems);
        setLoadingItems(false);
        setItemsError("");
      },
      (error) => {
        console.error("Browse collections fetch error:", error);
        setItems([]);
        setLoadingItems(false);
        setItemsError("No data");
      }
    );

    return () => unsubscribe();
  }, []);

  const openRecipe = (item) => {
    localStorage.setItem("recipehub_selected_recipe", JSON.stringify(item));
    navigate(`/recipe/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#171717]">
      {/* Header */}
      <AppHeader
        active="home"
        onAuthClick={() => setShowAuthPopup(true)}
      />

      {/* Hero */}
      <main className="mx-auto max-w-[1280px] px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[640px]">
            <p className="text-[14px] font-medium uppercase tracking-[0.18em] text-[#a35d06]">
              The Culinary Index
            </p>

            <h1 className="mt-5 text-[54px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#171717] sm:text-[72px]">
              Explore the
              <br />
              <span className="italic text-[#a35d06]">Collections.</span>
            </h1>

            <p className="mt-7 max-w-[620px] text-[19px] leading-9 text-[#4f4338]">
              A meticulously curated archive of seasonal flavors and heritage
              techniques, designed for the modern home chef.
            </p>
          </div>

          <div className="flex items-center justify-end">
            <div className="inline-flex items-center rounded-full border border-[#ebe3d7] bg-[#faf8f4] p-1">
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[16px] font-medium ${view === "list"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#7a6e63]"
                  }`}
              >
                <ListIcon />
                List
              </button>

              <button
                onClick={() => setView("grid")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[16px] font-medium ${view === "grid"
                  ? "bg-white text-[#171717] shadow-sm"
                  : "text-[#7a6e63]"
                  }`}
              >
                <GridIcon />
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12">
          {loadingItems ? (
            <div className="rounded-[24px] bg-white px-6 py-10 text-center ring-1 ring-[#f0ebe2]">
              <p className="text-[18px] font-medium text-[#5b5046]">
                Loading collections...
              </p>
            </div>
          ) : itemsError ? (
            <div className="rounded-[24px] bg-white px-6 py-10 text-center ring-1 ring-[#f0ebe2]">
              <p className="text-[18px] font-medium text-red-600">
                {itemsError}
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-[24px] bg-white px-6 py-10 text-center ring-1 ring-[#f0ebe2]">
              <p className="text-[18px] font-medium text-[#5b5046]">
                No collections found.
              </p>
            </div>
          ) : view === "list" ? (
            <div className="space-y-7">
              {filteredItems.map((item) => (
                <ListCard key={item.id} item={item} onOpen={openRecipe} />
              ))}
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2">
              {filteredItems.map((item) => (
                <GridCard key={item.id} item={item} onOpen={openRecipe} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="rounded-full border border-[#9c5f0c] px-10 py-4 text-[18px] font-medium text-[#9c5f0c] transition hover:bg-[#9c5f0c] hover:text-white">
            Load More Discoveries
          </button>
        </div>
      </main>

      <AuthPopup
        open={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-[#ece4d8] bg-[#f5f1ea]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-12 text-[#2a2623] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h3 className="text-[16px] font-semibold">The Digital Epicurean</h3>
            <p className="mt-3 text-[13px] uppercase tracking-[0.14em] text-[#6e6359]">
              © 2024 The Digital Epicurean. An editorial culinary experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-[14px] uppercase tracking-[0.12em] text-[#4d433b]">
            <button>About Us</button>
            <button>Terms of Service</button>
            <button>Privacy</button>
            <button>Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}