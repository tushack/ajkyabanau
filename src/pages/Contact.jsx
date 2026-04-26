import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import logo from "../assets/logo.png";
import AppHeader from "../pages/AppHeader";
import { db } from "../lib/firebase";
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

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      setErrorMessage("Please fill all fields before sending your message.");
      setSuccessMessage("");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        subject,
        message,
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Firestore submit error:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);

      setErrorMessage(
        `${error?.code || "unknown-error"} : ${error?.message || "Failed to send message. Please try again."
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f2eb] text-[#161616]">
      <AppHeader
        active="contact"
        onAuthClick={() => setShowAuthPopup(true)}
      />
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="flex flex-col justify-between">
            <div>
              <h2 className="text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-[#161616] sm:text-6xl lg:text-7xl">
                Let’s talk
                <br />
                <span className="italic text-[#6e5642]">flavor.</span>
              </h2>

              <p className="mt-8 max-w-[520px] text-[20px] leading-[1.7] text-[#5f5145]">
                Whether you have a question about a recipe, a collaboration
                idea, or simply want to share your latest culinary triumph, our
                doors are always open.
              </p>
            </div>

            <div className="relative mt-10 max-w-[540px]">
              <div className="overflow-hidden rounded-[30px] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                  alt="Contact"
                  className="h-[420px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-10 right-0 max-w-[290px] rounded-[28px] bg-[#efebe5] p-7 shadow-lg">
                <h3 className="text-[20px] font-bold text-[#161616]">
                  The Human Touch
                </h3>
                <p className="mt-4 text-[16px] leading-8 text-[#5f5145]">
                  Behind the pixels is a team dedicated to the art of the
                  kitchen. Your feedback helps us season our content.
                </p>

                <div className="mt-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#a86800]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f3e2c9] text-[12px]">
                    ?
                  </span>
                  Inquiry Desk
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[36px] bg-white/70 p-6 shadow-sm ring-1 ring-[#ece4d8] backdrop-blur sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a86800]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="h-[64px] w-full border border-[#e7ddd0] bg-[#fcfbf8] px-5 text-[18px] text-[#161616] outline-none placeholder:text-[#c2b7aa] focus:border-[#b87b1c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a86800]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className="h-[64px] w-full border border-[#e7ddd0] bg-[#fcfbf8] px-5 text-[18px] text-[#161616] outline-none placeholder:text-[#c2b7aa] focus:border-[#b87b1c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a86800]">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Recipe Inquiry"
                  className="h-[64px] w-full border border-[#e7ddd0] bg-[#fcfbf8] px-5 text-[18px] text-[#161616] outline-none placeholder:text-[#c2b7aa] focus:border-[#b87b1c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a86800]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your culinary story..."
                  rows="7"
                  className="w-full resize-none border border-[#e7ddd0] bg-[#fcfbf8] px-5 py-5 text-[18px] text-[#161616] outline-none placeholder:text-[#c2b7aa] focus:border-[#b87b1c]"
                />
              </div>
              {successMessage && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-700">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[#a86800] px-10 py-5 text-[18px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>

              <div className="border-t border-[#e7ddd0] pt-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7a6858]">
                      Direct Mail
                    </p>
                    <p className="mt-3 text-[16px] font-semibold text-[#161616] sm:text-[18px]">
                      hello.ajkyabanega@gmail.com
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7a6858]">
                      Social
                    </p>
                    <div className="mt-3 flex flex-wrap gap-6 text-[16px] text-[#5f5145] sm:text-[18px]">
                      <a href="#" className="hover:text-[#a86800]">
                        Instagram
                      </a>
                      <a href="#" className="hover:text-[#a86800]">
                        Pinterest
                      </a>
                      <a href="#" className="hover:text-[#a86800]">
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
      <AuthPopup
        open={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
      />
    </div>
  );
}