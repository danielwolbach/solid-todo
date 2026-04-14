"use client";

import { LogIn, LogOut } from "lucide-react";
import { useSolidAuth } from "@ldo/solid-react";
import Button from "@/components/button";

export default function Auth() {
    const { session, login, logout, ranInitialAuthCheck } = useSolidAuth();

    if (!session.isLoggedIn) {
        return (
            <Button
                loading={!ranInitialAuthCheck}
                onClick={async () => {
                    try {
                        const issuer = prompt("Enter your Solid Issuer", "https://solidcommunity.net/");
                        if (!issuer) return;
                        await login(issuer, { clientName: "Solid Todo" });
                    } catch {
                        alert("Failed to sign in.");
                    }
                }}
            >
                <LogIn height={20} />
                Sign in
            </Button>
        );
    }

    return (
        <Button onClick={logout}>
            <LogOut height={20} />
            Sign out
        </Button>
    );
}
