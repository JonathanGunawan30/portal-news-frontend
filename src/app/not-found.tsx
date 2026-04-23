"use client";

import Lottie from "lottie-react";
import animationData from "../../public/animations/404.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center overflow-x-hidden">
            <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="relative mb-6 sm:mb-8">
                    {/* Background glow - centered and contained */}
                    <div className="absolute inset-0 bg-primary/10 blur-[80px] sm:blur-[100px] rounded-full scale-110 sm:scale-150 -z-10"></div>
                    
                    <div className="w-full max-w-[240px] sm:max-w-[320px] mx-auto">
                        <Lottie 
                            animationData={animationData} 
                            loop={true} 
                            className="w-full h-full drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Oops! Lost in Space?
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-[320px] sm:max-w-[400px] mx-auto leading-relaxed">
                        The page you are looking for doesn&apos;t exist or has been moved to a different galaxy.
                    </p>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-[320px] sm:max-w-none mx-auto">
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full sm:w-auto px-4 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                        asChild
                    >
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Return Home
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto px-4 sm:px-8 h-10 sm:h-12 text-sm sm:text-base font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
                        onClick={() => window.history.back()}
                    >
                        <MoveLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Go Back
                    </Button>
                </div>

                <div className="mt-10 sm:mt-12 text-[10px] sm:text-sm text-muted-foreground/60 italic border-t border-border pt-4 sm:pt-6 max-w-[150px] sm:max-w-[200px] mx-auto">
                    404 ERROR - PAGE NOT FOUND
                </div>
            </div>
        </div>
    );
}
