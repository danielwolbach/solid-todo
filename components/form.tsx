"use client";

import { startTransition } from "react";

interface Props {
    action: (FormData) => Promise<void> | void;
    children: React.ReactNode;
}

export default function Form(props: Readonly<Props>) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => await props.action(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {props.children}
        </form>
    );
}
