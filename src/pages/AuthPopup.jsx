import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../lib/firebase";

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

export default function AuthPopup({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          provider: "google",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      onClose?.();
      navigate("/input-ingredient");
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert(error?.message || "Google sign-in failed");
    }
  };

  return (
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
              onClick={onClose}
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
                onClose?.();
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
              onClick={handleGoogleLogin}
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
  );
}