import { cn } from "@/lib/utils";

export interface Props {
    horizontal?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export default function Section(props: Readonly<Props>) {
    return (
        <section
            className={cn(
                props.horizontal
                    ? "flex flex-row gap-2 items-center"
                    : "flex flex-col gap-4 items-center max-w-xl w-full px-4",
                props.className,
            )}
        >
            {props.children}
        </section>
    );
}
