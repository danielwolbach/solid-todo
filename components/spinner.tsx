import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export interface Props {
    size?: number;
    className?: string;
}

export default function Spinner(props: Readonly<Props>) {
    return (
        <LoaderCircle
            size={props.size}
            className={cn("animate-spin text-zinc-200 dark:text-zinc-800", props.className)}
        />
    );
}
