import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Heading(props: Readonly<Props>) {
    return (
        <p className={cn("flex-1 cursor-default font-heading text-xl font-semibold capitalize", props.className)}>
            {props.children}
        </p>
    );
}
