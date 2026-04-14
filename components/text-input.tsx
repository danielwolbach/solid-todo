import { useId } from "react";
import InputField from "@/components/input-field";

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    disabled?: boolean;
    errors?: string[];
}

export default function TextInput(props: Readonly<Props>) {
    const id = useId();

    return (
        <InputField htmlFor={id} label={props.label} errors={props.errors}>
            <input
                type="text"
                id={id}
                name={props.name}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                className="rounded-lg bg-zinc-50 p-3 ring-1 ring-zinc-300 transition ring-inset placeholder:text-zinc-300 focus:ring-2 focus:ring-zinc-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:ring-zinc-700 dark:placeholder:text-zinc-600 dark:focus:ring-zinc-200"
            />
        </InputField>
    );
}
