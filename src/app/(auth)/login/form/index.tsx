"use client"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formSchema } from "@/app/(auth)/login/form/validation";
import axiosInstance from "@lib/axios";
import { toast } from "sonner";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

interface SubmitButtonProps {
    loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
    return (
        <Button disabled={loading} className="w-full h-11 text-base font-semibold transition-all hover:opacity-90 active:scale-[0.98]" type="submit">
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                </>
            ) : "Sign In"}
        </Button>
    );
};

export default function FormSignIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const validation = formSchema.safeParse({ email, password });
        if (!validation.success) {
            validation.error.issues.forEach((issue) => {
                toast.warning(issue.message);
            });
            setLoading(false);
            return;
        }

        try {
            // Execute reCAPTCHA Enterprise to get a token
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
            
            if (!siteKey) {
                console.error("reCAPTCHA site key is missing");
                throw new Error("Configuration error");
            }

            // Ensure grecaptcha is ready before executing
            await new Promise<void>((resolve) => {
                if (window.grecaptcha?.enterprise) {
                    window.grecaptcha.enterprise.ready(() => resolve());
                } else {
                    // Poll if not yet available
                    const interval = setInterval(() => {
                        if (window.grecaptcha?.enterprise) {
                            clearInterval(interval);
                            window.grecaptcha.enterprise.ready(() => resolve());
                        }
                    }, 100);
                }
            });

            const recaptchaToken = await window.grecaptcha.enterprise.execute(
                siteKey,
                { action: 'LOGIN' }
            );

            if (!recaptchaToken) {
                console.error("Failed to generate reCAPTCHA token");
                throw new Error("Security verification failed");
            }

            await axiosInstance.post("/login", {
                email,
                password,
                recaptcha_token: recaptchaToken
            }, { withCredentials: true })
            toast.success("Welcome back! Login successful.");
            router.push("/dashboard");
        } catch (err) {
            setPassword("")
            toast.error("Invalid email or password. Please try again.")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="w-full animate-in fade-in zoom-in-95 duration-500">
            <Script
                src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
            <div className="flex flex-col items-center mb-8">
                <div className="mb-6 relative h-16 w-16 group">
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-300"></div>
                    <div className="relative h-full w-full bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-border/50 shadow-sm overflow-hidden p-2">
                        <Image
                            src="/img/news-logo.png"
                            alt="Portal News Logo"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground text-center">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-muted-foreground text-center max-w-[280px]">
                    Sign in to manage your content and access the news dashboard.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-border shadow-xl rounded-3xl p-8 backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80">
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                            Email Address
                        </label>
                        <Input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="name@example.com"
                            className="h-11 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus-visible:ring-primary/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                            Password
                        </label>
                        <div className="relative group">
                            <Input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="••••••••"
                                className="h-11 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 pr-10 focus-visible:ring-primary/20"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <SubmitButton loading={loading} />
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/" className="text-primary hover:underline font-medium">
                            Return to homepage
                        </Link>
                    </p>
                </div>
            </div>
            
            <p className="mt-8 text-center text-xs text-muted-foreground/60 tracking-wide">
                &copy; {new Date().getFullYear()} Jonathan News Portal. All rights reserved.
            </p>
        </div>
    );
}
