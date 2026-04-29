import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import AuthPopup from "./AuthPopup";
import AppFooter from "../pages/AppFooter";

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
        >
            <circle cx="12" cy="12" r="9" />
            <path
                d="M8.5 12.5l2.2 2.2 4.8-5.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function TermsOfService() {
    const navigate = useNavigate();
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f2eb] text-[#171717]">
            <AppHeader active="terms" onAuthClick={() => setShowAuthPopup(true)} />

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
                        alt="Terms background"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#f5f2eb]/70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f5f2eb]/20 via-[#f5f2eb]/60 to-[#f5f2eb]" />
                </div>

                <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center lg:px-8">
                    <div className="mx-auto inline-flex rounded-full border border-[#d9bb89] bg-[#c68a28]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9b6108]">
                        Legal Documentation
                    </div>

                    <h1 className="mt-6 text-[46px] font-semibold italic leading-none tracking-[-0.04em] text-[#171717] sm:text-[72px]">
                        Terms of Service
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#54493f] sm:text-[17px]">
                        Last Updated: May 24, 2026. These Terms of Service explain the
                        rules, responsibilities, and conditions for using Aj Kya Banega and
                        our recipe discovery platform.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
                <div className="space-y-16">
                    {/* Section 1 */}
                    <section>
                        <div className="flex items-start gap-3">
                            <span className="pt-1 text-[22px] font-semibold italic text-[#d1b894]">
                                01
                            </span>
                            <div>
                                <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#171717]">
                                    Acceptance of Terms
                                </h2>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    Welcome to <span className="font-semibold">Aj Kya Banega</span>.
                                    By accessing or using our website, recipe search tools, saved
                                    recipe features, AI-powered suggestions, contact forms, or
                                    related services, you agree to be bound by these Terms of
                                    Service.
                                </p>

                                <p className="mt-5 text-[16px] leading-8 text-[#54493f]">
                                    These terms are designed to keep our platform safe, fair, and
                                    useful for all users. If you do not agree with any part of
                                    these terms, please do not use our services.
                                </p>

                                <div className="mt-8 rounded-[18px] border-l-4 border-[#a76500] bg-[#f1ece4] px-6 py-5">
                                    <p className="text-[15px] italic leading-7 text-[#5b5046]">
                                        “Trust is essential in any digital food experience. These
                                        terms help protect both our users and the integrity of our
                                        platform.”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <div className="flex items-start gap-3">
                            <span className="pt-1 text-[22px] font-semibold italic text-[#d1b894]">
                                02
                            </span>
                            <div>
                                <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#171717]">
                                    User Conduct & Platform Use
                                </h2>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    Aj Kya Banega is built for recipe discovery, ingredient-based
                                    cooking support, and a better kitchen experience. When using
                                    our platform, you agree to use it responsibly and lawfully.
                                </p>

                                <div className="mt-7 space-y-5">
                                    {[
                                        "Do not misuse the website, attempt unauthorized access, or interfere with normal site operations.",
                                        "Do not upload or submit false, harmful, offensive, or misleading content through forms or user interactions.",
                                        "Do not use our content, AI outputs, or recipes in any illegal, abusive, or deceptive way.",
                                        "Do not impersonate another person, company, or brand while using the platform.",
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="mt-1 text-[#a76500]">
                                                <CheckIcon />
                                            </div>
                                            <p className="text-[16px] leading-8 text-[#54493f]">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <div className="flex items-start gap-3">
                            <span className="pt-1 text-[22px] font-semibold italic text-[#d1b894]">
                                03
                            </span>
                            <div>
                                <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#171717]">
                                    Intellectual Property
                                </h2>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    All website design, branding, layout, written content,
                                    platform features, original descriptions, and custom recipe
                                    presentation on Aj Kya Banega are owned by us or used with
                                    proper permission. This includes logos, UI elements, and
                                    curated content unless otherwise stated.
                                </p>

                                <div className="mt-8 grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
                                    <div>
                                        <img
                                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                                            alt="Chef"
                                            className="h-[320px] w-full rounded-[18px] object-cover shadow-sm ring-1 ring-[#e7ddd0]"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-[14px] italic leading-7 text-[#65584c]">
                                            Our UI, original platform structure, written text, and
                                            curated experience are protected by intellectual property
                                            laws. You may use recipes for personal cooking, but you
                                            may not copy, resell, or republish our platform content
                                            as your own without permission.
                                        </p>

                                        <div className="mt-4 h-[2px] w-16 bg-[#d59b3a]" />
                                    </div>
                                </div>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    You are free to use recipe results for personal cooking and
                                    household purposes. However, you may not copy substantial
                                    portions of our platform, scrape data, or use our content for
                                    commercial redistribution without written consent.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <div className="flex items-start gap-3">
                            <span className="pt-1 text-[22px] font-semibold italic text-[#d1b894]">
                                04
                            </span>
                            <div>
                                <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#171717]">
                                    Accounts, Saved Recipes & AI Suggestions
                                </h2>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    If you sign in using Google or another supported provider,
                                    you are responsible for maintaining access to your account and
                                    ensuring your information is accurate. Saved recipes, kitchen
                                    preferences, and other personalized data may be linked to your
                                    account.
                                </p>

                                <p className="mt-5 text-[16px] leading-8 text-[#54493f]">
                                    Our recipe suggestions may include AI-assisted results based
                                    on ingredients or user queries. While we aim to provide useful
                                    and relevant suggestions, we do not guarantee that every
                                    result will be complete, accurate, allergen-safe, or suitable
                                    for every dietary need. Users should always review ingredients,
                                    cooking instructions, and food safety requirements before
                                    preparing a recipe.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <div className="flex items-start gap-3">
                            <span className="pt-1 text-[22px] font-semibold italic text-[#d1b894]">
                                05
                            </span>
                            <div>
                                <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#171717]">
                                    Termination of Access
                                </h2>

                                <p className="mt-6 text-[16px] leading-8 text-[#54493f]">
                                    We reserve the right to suspend or terminate access to Aj Kya
                                    Banega at our discretion if we believe a user has violated
                                    these terms, misused the platform, attempted unauthorized
                                    activity, or acted in a way that harms the platform or other
                                    users.
                                </p>

                                <p className="mt-5 text-[16px] leading-8 text-[#54493f]">
                                    We may also update, modify, pause, or discontinue certain
                                    features or services at any time to improve platform quality,
                                    security, or compliance requirements.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="rounded-[24px] bg-[#efebe3] px-6 py-10 text-center sm:px-10">
                        <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-[#171717]">
                            Questions about these terms?
                        </h3>
                        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-[#6a5e53]">
                            If you need clarification about these Terms of Service, feel free
                            to contact us. We’ll be happy to help.
                        </p>

                        <button
                            onClick={() => navigate("/contact")}
                            className="mt-7 rounded-full bg-[#a76500] px-8 py-3 text-[15px] font-semibold text-white shadow-sm transition hover:opacity-95"
                        >
                            Contact Support
                        </button>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <AppFooter active="terms" />

            <AuthPopup
                open={showAuthPopup}
                onClose={() => setShowAuthPopup(false)}
            />
        </div>
    );
}