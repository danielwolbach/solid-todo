"use client";

import { CircleSlash } from "lucide-react";
import { useSolidAuth } from "@ldo/solid-react";
import Heading from "@/components/heading";
import Section from "@/components/section";
import Spinner from "./spinner";

export interface Props {
    children?: React.ReactNode;
}

export default function Protected(props: Readonly<Props>) {
    const { session, ranInitialAuthCheck } = useSolidAuth();

    if (!ranInitialAuthCheck) {
        return (
            <Section>
                <Spinner size={64} />
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
