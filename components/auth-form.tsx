"use client";

import { useRouter } from "next/navigation";
import { useSolidAuth } from "@ldo/solid-react";
import Button from "@/components/button";
import Form from "@/components/form";
import Heading from "@/components/heading";
import Section from "@/components/section";
import Spinner from "@/components/spinner";
import TextInput from "@/components/text-input";

export default function AuthForm() {
    const { session, login, logout, ranInitialAuthCheck } = useSolidAuth();
    const router = useRouter();

    if (!ranInitialAuthCheck) {
        return (
            <Section>
                <Spinner />
            </Section>
        );
    }

    if (session.isLoggedIn) {
        return (
            <Section>
                <Form action={signOut}>
                    <Heading>Sign out</Heading>
                    <Button submit>Sign out</Button>
                </Form>
            </Section>
        );
    }

    return (
        <Section>
            <Form action={signIn}>
                <Heading>Sign in</Heading>
                <TextInput name="issuer" placeholder="https://example.com" label="Issuer" />
                <Button submit>Sign in</Button>
            </Form>
        </Section>
    );

    async function signIn(formData: FormData) {
        try {
            const issuer = formData.get("issuer")?.toString();
            if (!issuer) return;
            await login(issuer, { clientName: "Solid Todo" });
            router.push("/");
        } catch {
            alert("Failed to sign in.");
        }
    }

    async function signOut() {
        await logout();
    }
}
