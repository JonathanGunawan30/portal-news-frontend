"use client"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formSchema } from "@/app/(auth)/login/form/validation";
import axiosInstance from "@lib/axios";
import { setCookie } from "cookies-next";
import { toast } from "sonner";

interface SubmitButtonProps {
    loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
    return (
        <Button disabled={loading} className="w-full" type="submit">
            {loading ? "Loading..." : "Submit"}
        </Button>
    );
};

export default function FormSignIn() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError([]);
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
            const res = await axiosInstance.post("/login", { email, password }, {withCredentials: true})
            toast.success("Login successful!");
            router.push("/dashboard");
            return;
        } catch (err) {
            setPassword("")
            toast.error("Email or password is wrong")
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="w-full h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-96">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="E-mail..."
                            name="email"
                            required
                        />
                        <Input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password..."
                            name="password"
                            required
                        />

                        <SubmitButton loading={loading} />
                    </form>
                </div>
            </div>
        </div>
    );
}
