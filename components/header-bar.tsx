import { CheckSquare } from "lucide-react";
import Section from "@/components/section";
import Heading from "@/components/heading";
import Auth from "@/components/auth";
import Link from "next/link";

export default function HeaderBar() {
    return (
        <header className="grid w-full place-items-center bg-zinc-50 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="flex items-center justify-between max-w-5xl w-full p-3">
                <Link href="/">
                    <Section horizontal>
                        <CheckSquare className="h-5 w-5" />
                        <Heading className="cursor-pointer">Solid Todo</Heading>
                    </Section>
                </Link>
                <Auth />
            </div>
        </header>
    );
}
