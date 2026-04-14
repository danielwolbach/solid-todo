"use client";

import { CircleSlash, LoaderCircle } from "lucide-react";
import { useSolidAuth } from "@ldo/solid-react";
import Section from "@/components/section";
import Heading from "@/components/heading";

export interface Props {
    children?: React.ReactNode;
}

export default function Protected(props: Readonly<Props>) {
    const { session, ranInitialAuthCheck } = useSolidAuth();

    if (!ranInitialAuthCheck) {
        return (
            <Section>
                <LoaderCircle size={48} className="animate-spin text-zinc-300 dark:text-zinc-600" />
            </Section>
        );
    }

    if (!session.isLoggedIn) {
        return (
            <Section>
                <CircleSlash size={48} />
                <Heading>Please sign in to view this content</Heading>
            </Section>
        );
    }

    return props.children;
}
