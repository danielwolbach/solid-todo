"use client";

import AuthForm from "@/components/auth-form";
import ItemIndex from "@/components/item-index";
import PodForm from "@/components/pod-form";
import Protected from "@/components/protected";
import { useAppView } from "@/components/app-view-context";

export default function AppShell() {
    const { view } = useAppView();

    if (view === "auth") {
        return <AuthForm />;
    }

    if (view === "pod") {
        return <PodForm />;
    }

    return (
        <Protected>
            <ItemIndex />
        </Protected>
    );
}
