"use client";

import { Database, LogIn, LogOut } from "lucide-react";
import { useSolidAuth } from "@ldo/solid-react";
import Button from "@/components/button";
import Section from "@/components/section";
import { useAppView } from "@/components/app-view-context";

export default function Auth() {
    const { session, ranInitialAuthCheck } = useSolidAuth();
    const { setView } = useAppView();

    if (!session.isLoggedIn) {
        return (
            <Button loading={!ranInitialAuthCheck} onClick={() => setView("auth")}>
                <LogIn height={20} />
                Sign in
            </Button>
        );
    }

    return (
        <Section horizontal>
            <Button onClick={() => setView("auth")}>
                <LogOut height={20} />
                Sign out
            </Button>
            <Button onClick={() => setView("pod")}>
                <Database height={20} />
                Change Pod
            </Button>
        </Section>
    );
}
