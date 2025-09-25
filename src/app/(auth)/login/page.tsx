"use client"

import {useRouter} from "next/navigation";
import FormSignIn from "./form";


export default function SignInPage() {
    const router = useRouter()

    return <FormSignIn />
}