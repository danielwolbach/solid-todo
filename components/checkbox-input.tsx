import { Check } from "lucide-react";

interface Props {
    checked: boolean;
    onChange: () => void;
    label?: string;
}

export default function CheckboxInput(props: Readonly<Props>) {
    return (
        <label className="relative inline-flex h-5 w-5 cursor-pointer items-center justify-center">
            <input type="checkbox" checked={props.checked} onChange={props.onChange} className="peer sr-only" />
            <span className="h-5 w-5 rounded-md border border-zinc-200 bg-white transition hover:bg-zinc-100 peer-checked:border-zinc-800 peer-checked:bg-zinc-800 peer-checked:hover:bg-zinc-700 peer-focus-visible:ring-2 peer-focus-visible:ring-zinc-800 peer-focus-visible:outline-none dark:border-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:peer-checked:border-zinc-200 dark:peer-checked:bg-zinc-200 dark:peer-checked:hover:bg-zinc-300 dark:peer-focus-visible:ring-zinc-200" />
            <Check className="pointer-events-none absolute h-3.5 w-3.5 opacity-0 transition-opacity peer-checked:opacity-100 text-zinc-100 dark:text-zinc-800" />
        </label>
    );
}
