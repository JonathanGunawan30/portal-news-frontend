"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function subscribeConsent(callback: () => void) {
    window.addEventListener("cookie_consent_updated", callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener("cookie_consent_updated", callback);
        window.removeEventListener("storage", callback);
    };
}

function getConsentSnapshot(): boolean {
    return !localStorage.getItem("cookie_consent");
}

function getServerSnapshot(): boolean {
    return false;
}

export function CookieConsent() {
    const isVisible = useSyncExternalStore(
        subscribeConsent,
        getConsentSnapshot,
        getServerSnapshot
    );

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "true");
        window.dispatchEvent(new Event("cookie_consent_accepted"));
        window.dispatchEvent(new Event("cookie_consent_updated"));
    };

    const handleReject = () => {
        localStorage.setItem("cookie_consent", "false");
        window.dispatchEvent(new Event("cookie_consent_updated"));
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
                        variant="outline"
                        size="sm"
                        onClick={handleReject}
                        className="text-xs px-4"
                    >
                        Reject
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
