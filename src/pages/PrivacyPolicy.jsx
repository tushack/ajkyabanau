import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiDownload,
  FiSettings,
  FiTrash2,
  FiMail,
  FiShare2,
  FiGlobe,
} from "react-icons/fi";
import AppHeader from "./AppHeader";
import AuthPopup from "./AuthPopup";
import AppFooter from "../pages/AppFooter";


export default function PrivacyPolicy() {
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const collectionPoints = [
    "Account information such as your name, email address, and login details when you sign in or create an account.",
    "Recipe preferences and interaction data, including ingredients you enter, dietary choices, saved recipes, and language preferences.",
    "Device and usage information that helps us improve website performance, security, and the overall user experience.",
  ];

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#171717]">
      <AppHeader
        active=""
        onAuthClick={() => setShowAuthPopup(true)}
      />

      {/* Top Hero */}
      <section className="border-b border-[#ece5da] bg-[#f7f4ee]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#9a5a07]">
            Transparency First
          </p>

          <h1 className="mt-4 text-[44px] font-bold leading-none tracking-[-0.04em] text-[#171717] sm:text-[58px]">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-[760px] text-[17px] leading-8 text-[#5c5147]">
            Last updated: March 22, 2026. At{" "}
            <span className="font-semibold text-[#171717]">Aj Kya Banega</span>,
            we value your trust. This Privacy Policy explains what information
            we collect, how we use it, how we protect it, and the choices you
            have when using our platform to discover recipes, save favorites,
            and interact with our services.
          </p>
        </div>
      </section>

      {/* Main Card */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[860px] rounded-[30px] border border-[#ece3d7] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#9a5a07] sm:text-[30px]">
                1. Data Collection
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5c5147]">
                We collect limited information to provide you with a better,
                more personalized cooking experience. This may happen when you
                sign in, search for recipes, save dishes, choose a language, or
                contact us.
              </p>

              <div className="mt-6 space-y-4">
                {collectionPoints.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 text-[#e39a22]">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-[16px] leading-7 text-[#4f463d]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[18px] border border-[#eee5d9] bg-[#f8f5ef] p-6">
                  <h3 className="text-[18px] font-semibold text-[#171717]">
                    Why we collect it
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#5c5147]">
                    We use this information to recommend relevant recipes,
                    remember your preferences, show your saved items, improve
                    search results, support multiple languages, and keep your
                    account secure.
                  </p>
                </div>

                <div className="rounded-[18px] border border-[#eee5d9] bg-[#f8f5ef] p-6">
                  <h3 className="text-[18px] font-semibold text-[#171717]">
                    How we protect it
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[#5c5147]">
                    We use trusted services such as Firebase and secure access
                    controls to protect your data. We only keep the information
                    necessary to operate the platform and improve your
                    experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mt-14">
              <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#9a5a07] sm:text-[30px]">
                2. Information Use & Sharing
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5c5147]">
                Your information is used primarily to operate the website,
                improve recipe discovery, manage your account, and respond to
                support or contact requests. We do not sell your personal data.
              </p>

              <p className="mt-4 text-[16px] leading-8 text-[#5c5147]">
                In limited cases, data may be processed through trusted third-
                party services that help us provide essential functionality,
                such as authentication, database storage, analytics, or content
                delivery. These services are used only as needed to run and
                maintain the platform.
              </p>

              <div className="mt-7 rounded-[16px] border-l-[3px] border-[#ef9f24] bg-[#fbf2e7] px-5 py-5">
                <p className="text-[16px] italic leading-7 text-[#6a4a1e]">
                  “Our goal is to help users discover recipes smarter and cook
                  better — never to misuse or trade their personal information.”
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mt-14">
              <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#9a5a07] sm:text-[30px]">
                3. Your Rights & Choices
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5c5147]">
                Depending on how you use the platform, you may request access
                to your information, update your preferences, or ask for your
                account-related data to be removed. We aim to provide clear and
                simple controls wherever possible.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <button className="flex items-center justify-center gap-2 rounded-[12px] border border-[#ece3d7] bg-[#f8f5ef] px-4 py-4 text-[14px] font-medium text-[#7c4a07]">
                  <FiDownload className="h-4 w-4" />
                  Download Data
                </button>

                <button className="flex items-center justify-center gap-2 rounded-[12px] border border-[#ece3d7] bg-[#f8f5ef] px-4 py-4 text-[14px] font-medium text-[#7c4a07]">
                  <FiSettings className="h-4 w-4" />
                  Update Preferences
                </button>

                <button className="flex items-center justify-center gap-2 rounded-[12px] border border-[#ece3d7] bg-[#f8f5ef] px-4 py-4 text-[14px] font-medium text-[#7c4a07]">
                  <FiTrash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mt-14 border-t border-[#efe7db] pt-12">
              <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#9a5a07] sm:text-[30px]">
                4. Cookies, Language & Personalization
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5c5147]">
                We may use essential cookies or local storage to remember your
                session, language selection, saved recipe preferences, and other
                settings that improve your experience. These help us make the
                website more convenient and user-friendly.
              </p>

              <p className="mt-4 text-[16px] leading-8 text-[#5c5147]">
                If you use features like recipe saving, search personalization,
                or language switching, some preference data may be stored so the
                website continues to work smoothly across visits.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mt-14 border-t border-[#efe7db] pt-12">
              <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#9a5a07] sm:text-[30px]">
                5. Contact Information
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-[#5c5147]">
                If you have any questions about this Privacy Policy, your data,
                or how our website works, you can contact us using the details
                below.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#fbf5eb] px-4 py-3 text-[#7c4a07]">
                  <FiMail className="h-4 w-4" />
                  <span className="text-[15px] font-medium">
                    support@ajkyabanega.com
                  </span>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full bg-[#fbf5eb] px-4 py-3 text-[#7c4a07]">
                  <FiShare2 className="h-4 w-4" />
                  <span className="text-[15px] font-medium">
                    Contact via website form
                  </span>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full bg-[#fbf5eb] px-4 py-3 text-[#7c4a07]">
                  <FiGlobe className="h-4 w-4" />
                  <span className="text-[15px] font-medium">
                    www.ajkyabanega.com
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AppFooter active="privacy" />

      <AuthPopup
        open={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
      />
    </div>
  );
}