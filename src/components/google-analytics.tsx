"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";

const RAW_GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const GA_TRACKING_ID = RAW_GA_ID && /^(G|UA|AW|DC)-[A-Z0-9-]+$/i.test(RAW_GA_ID) ? RAW_GA_ID : undefined;

declare global {
    interface Window {
        gtag: (
            event: string,
            action: string,
            config: { [key: string]: unknown }
        ) => void;
    }
}

function subscribeConsent(callback: () => void) {
    window.addEventListener("cookie_consent_accepted", callback);
    window.addEventListener("cookie_consent_updated", callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener("cookie_consent_accepted", callback);
        window.removeEventListener("cookie_consent_updated", callback);
        window.removeEventListener("storage", callback);
    };
}

function getConsentSnapshot(): boolean {
    return localStorage.getItem("cookie_consent") === "true";
}

function getServerSnapshot(): boolean {
    return false;
}

export function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hasConsent = useSyncExternalStore(
        subscribeConsent,
        getConsentSnapshot,
        getServerSnapshot
    );

    useEffect(() => {
        if (hasConsent && GA_TRACKING_ID && typeof window.gtag === 'function') {
            const url = pathname + searchParams.toString();
            window.gtag("config", GA_TRACKING_ID, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, hasConsent]);

    if (!GA_TRACKING_ID || !hasConsent) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
            />
        </>
    );
}
