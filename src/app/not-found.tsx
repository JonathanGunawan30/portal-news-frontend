"use client";

import Lottie from "lottie-react";
import animationData from "../../public/animations/404.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
            <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
                <div className="relative mb-8">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-150 -z-10"></div>
                    
                    <div className="w-full max-w-[320px] mx-auto">
                        <Lottie 
                            animationData={animationData} 
                            loop={true} 
                            className="w-full h-full drop-shadow-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Oops! Lost in Space?
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-[400px] mx-auto leading-relaxed">
                        The page you are looking for doesn&apos;t exist or has been moved to a different galaxy.
                    </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full sm:w-auto px-8 h-12 text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                        asChild
                    >
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5" />
                            Return Home
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto px-8 h-12 text-base font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
                        onClick={() => window.history.back()}
                    >
                        <MoveLeft className="mr-2 h-5 w-5" />
                        Go Back
                    </Button>
                </div>

                <div className="mt-12 text-sm text-muted-foreground/60 italic border-t border-border pt-6 max-w-[200px] mx-auto">
                    404 ERROR - PAGE NOT FOUND
                </div>
            </div>
        </div>
    );
}
