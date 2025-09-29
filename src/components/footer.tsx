import { Heart, Github } from "lucide-react"

export default function Footer() {
    const date = new Date()

    return (
        <footer className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
                © {new Date().getFullYear()}{" "}
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
        </footer>
    )
}
