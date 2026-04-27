"use client";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import Link from "next/link";

interface Props {
    children?: React.ReactNode;
    loading?: boolean;
    href?: string;
    className?: string;
}

export default function Button(props: Readonly<Props>) {
    const status = useFormStatus();
    const isLoading = props.loading || status.pending;

    const baseClass = cn(
        "relative rounded-lg p-3 font-heading font-semibold capitalize ring-offset-2 transition focus:ring-2 focus:outline-none dark:ring-offset-zinc-950 grid place-items-center",
        isLoading ? "pointer-events-none" : "hover:cursor-pointer",
        cn(
            "bg-zinc-50 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800",
            !isLoading && "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        ),
    );
    const mergedClass = twMerge(clsx(baseClass, props.className));

    return (
        <Link href={props.href} className={mergedClass}>
            <div className={cn("flex items-center gap-1", isLoading && "text-transparent")}>{props.children}</div>
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center">
                    <Spinner />
                </div>
            )}
        </Link>
    );
}
