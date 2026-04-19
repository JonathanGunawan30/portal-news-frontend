"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
        window.dispatchEvent(new Event("cookie_consent_accepted"));
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background border-t border-border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground text-center md:text-left">
                    <p>
                        We use cookies to improve your experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                        Read our{" "}
                        <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                            Privacy Policy
                        </Link>{" "}
                        for more information.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-xs"
                    >
                        <Link href="/privacy-policy">Learn More</Link>
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleAccept}
                        className="text-xs px-6"
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    );
}
