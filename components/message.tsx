import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Section from "@/components/section";

export interface Props {
    error?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function Message(props: Readonly<Props>) {
    return (
        <Section
            className={twMerge(
                clsx(
                    "flex w-full items-center justify-center rounded-lg border-2 p-5",
                    "text-zinc-400 dark:text-zinc-500",
                    {
                        "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900": !props.error,
                        "border-red-400 bg-red-50 text-red-500 dark:border-red-600 dark:bg-red-950 dark:text-red-400":
                            props.error,
                    },
                    props.className,
                ),
            )}
        >
            {props.children}
        </Section>
    );
}
