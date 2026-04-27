"use client";

import { Database, LogIn, LogOut } from "lucide-react";
import { useSolidAuth } from "@ldo/solid-react";
import LinkButton from "@/components/link-button";
import Section from "@/components/section";

export default function Auth() {
    const { session, ranInitialAuthCheck } = useSolidAuth();

    if (!session.isLoggedIn) {
        return (
            <LinkButton loading={!ranInitialAuthCheck} href="/auth">
                <LogIn height={20} />
                Sign in
            </LinkButton>
        );
    }

    return (
        <Section horizontal>
            <LinkButton href="/auth">
                <LogOut height={20} />
                Sign out
            </LinkButton>
            <LinkButton href="/pod">
                <Database height={20} />
                Change Pod
            </LinkButton>
        </Section>
    );
}
