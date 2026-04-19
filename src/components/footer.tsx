import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-200">
            <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-600">
                <div>
                    © {currentYear}{" "}
                    <a
                        href="https://github.com/JonathanGunawan30"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                    >
                        Jonathan Gunawan
                    </a>
                    . All rights reserved.
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                    <Link href="/privacy-policy" className="hover:text-blue-600 hover:underline transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}