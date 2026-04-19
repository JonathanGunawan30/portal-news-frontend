"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

declare global {
    interface Window {
        gtag: (
            event: string,
            action: string,
            config: { [key: string]: any }
        ) => void;
    }
}

export function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [hasConsent, setHasConsent] = useState<boolean | null>(null);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        setHasConsent(consent === "true");

        const handleConsentAccepted = () => {
            setHasConsent(true);
        };

        window.addEventListener("cookie_consent_accepted", handleConsentAccepted);
        return () => {
            window.removeEventListener("cookie_consent_accepted", handleConsentAccepted);
        };
    }, []);

    useEffect(() => {
        if (hasConsent && GA_TRACKING_ID && typeof window.gtag === 'function') {
            const url = pathname + searchParams.toString();
            window.gtag("config", GA_TRACKING_ID, {
                page_path: url,
            });
        }
    }, [pathname, searchParams, hasConsent]);

    if (!GA_TRACKING_ID || hasConsent === false || hasConsent === null) {
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