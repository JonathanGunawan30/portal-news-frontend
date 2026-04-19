import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Jonathan News Portal — how we collect, use, and protect your information.",
    alternates: {
        canonical: "https://blog.jonathangunawan.com/privacy-policy",
    },
};

const sections = [
    {
        id: "information-we-collect",
        title: "1. Information We Collect",
        content: `When you visit Jonathan News Portal, we may collect certain information automatically through analytics tools. This includes:`,
        list: [
            "Pages you visit and how long you spend on them",
            "Your general geographic location (country/city level)",
            "The device and browser type you use",
            "How you arrived at our site (e.g., search engine, direct link, referral)",
            "Interactions such as clicks and scroll depth",
        ],
        footer: `We do not collect your name, email address, or any personally identifiable information unless you voluntarily provide it (e.g., by contacting us).`,
    },
    {
        id: "google-analytics",
        title: "2. Google Analytics",
        content: `We use Google Analytics, a web analytics service provided by Google LLC ("Google"), to understand how visitors interact with our website. Google Analytics uses cookies — small text files placed on your device — to collect standard internet log information and visitor behavior patterns.`,
        list: [
            "Google Analytics collects data such as your IP address (anonymized), browser type, and pages visited.",
            "This data is transmitted to and stored on Google's servers.",
            "Google may use this data to evaluate your use of our website and compile reports on website activity.",
            "Google's use of your data is governed by the Google Privacy Policy.",
        ],
        footer: `You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout.`,
    },
    {
        id: "cookies",
        title: "3. Cookies",
        content: `Our website uses cookies primarily through Google Analytics. Cookies are small data files stored on your browser. You can control cookie preferences through your browser settings:`,
        list: [
            "Most browsers allow you to refuse new cookies, delete existing cookies, or be notified when new cookies are set.",
            "Disabling cookies may affect the functionality of some parts of the website.",
            "Refer to your browser's help section for instructions on managing cookies.",
        ],
    },
    {
        id: "how-we-use",
        title: "4. How We Use Your Information",
        content: `The information collected through analytics is used solely to:`,
        list: [
            "Understand which content is most useful to our readers",
            "Improve the structure, navigation, and performance of our website",
            "Identify technical issues and resolve them",
            "Measure the reach and impact of our articles",
        ],
        footer: `We do not sell, trade, or rent any information to third parties for marketing purposes.`,
    },
    {
        id: "third-party",
        title: "5. Third-Party Links",
        content: `Our articles may contain links to external websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    },
    {
        id: "data-retention",
        title: "6. Data Retention",
        content: `Analytics data collected by Google Analytics is retained for 14 months by default, after which it is automatically deleted. You may request deletion of your data by opting out via the Google Analytics opt-out tool or by adjusting your browser settings.`,
    },
    {
        id: "childrens-privacy",
        title: "7. Children's Privacy",
        content: `Jonathan News Portal is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.`,
    },
    {
        id: "changes",
        title: "8. Changes to This Privacy Policy",
        content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we do, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.`,
    },
    {
        id: "contact",
        title: "9. Contact Us",
        content: `If you have any questions or concerns about this Privacy Policy or how your data is handled, please feel free to reach out:`,
        list: [
            "Website: https://blog.jonathangunawan.com",
            "Contact: via the contact page on our website",
        ],
    },
];

export default function PrivacyPolicyPage() {
    const lastUpdated = "April 19, 2026";

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="container mx-auto max-w-screen-md px-6 py-12 lg:py-16">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        Last Updated: {lastUpdated}
                    </p>
                    <p className="mt-4 text-base text-gray-600 leading-relaxed">
                        At <strong>Jonathan News Portal</strong> (<a href="https://blog.jonathangunawan.com" className="text-blue-600 hover:underline">blog.jonathangunawan.com</a>),
                        we are committed to being transparent about how we collect and use data.
                        This Privacy Policy explains what information we gather when you visit our website
                        and how we use it to improve your experience.
                    </p>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-md px-6 py-8">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Table of Contents
                    </h2>
                    <ol className="space-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <div className="container mx-auto max-w-screen-md px-6 pb-16">
                <div className="space-y-10">
                    {sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-900">
                                {section.title}
                            </h2>
                            {section.content && (
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            )}
                            {section.list && (
                                <ul className="mt-3 space-y-2 pl-5">
                                    {section.list.map((item, i) => (
                                        <li
                                            key={i}
                                            className="relative text-gray-600 leading-relaxed before:absolute before:-left-4 before:text-blue-400 before:content-['•']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.footer && (
                                <p className="mt-3 text-gray-600 leading-relaxed">
                                    {section.footer}
                                </p>
                            )}
                        </section>
                    ))}
                </div>

                <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Jonathan News Portal. All rights reserved.
                    </p>
                    <p className="mt-1">
                        <Link href="/" className="text-blue-600 hover:underline">
                            Return to Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}