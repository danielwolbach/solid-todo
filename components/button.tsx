"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface Props {
    submit?: boolean;
    children?: React.ReactNode;
    loading?: boolean;
    onClick?: () => void;
}

export default function Button(props: Readonly<Props>) {
    const status = useFormStatus();
    const isLoading = props.loading || status.pending;

    return (
        <button
            disabled={isLoading}
            type={props.submit ? "submit" : "button"}
            onClick={props.onClick}
            className={cn(
                "relative rounded-lg p-3 font-heading font-semibold capitalize ring-offset-2 transition focus:ring-2 focus:outline-none dark:ring-offset-zinc-950",
                !isLoading && "hover:cursor-pointer",
                props.submit
                    ? cn(
                          "bg-zinc-800 text-white ring-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-200",
                          !isLoading && "hover:bg-zinc-700 dark:hover:bg-zinc-200",
                      )
                    : cn(
                          "bg-zinc-50 ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-700",
                          !isLoading && "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      ),
            )}
        >
            <div className={cn("flex items-center gap-1", isLoading && "text-transparent")}>{props.children}</div>
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center">
                    <LoaderCircle className="animate-spin text-zinc-300 dark:text-zinc-600" />
                </div>
            )}
        </button>
    );
}
