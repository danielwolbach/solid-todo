import "@/styles/global.css";
import { cn } from "@/lib/utils";
import { INTER, MONTSERRAT } from "@/lib/fonts";
import { Metadata } from "next";
import HeaderBar from "@/components/header-bar";
import LdoContext from "@/components/ldo-context";

export const metadata: Metadata = {
    title: "Solid Todo",
    description: "Manage your todo list with Solid",
};

export interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Readonly<Props>) {
    return (
        <html lang="en" className={cn(INTER.variable, MONTSERRAT.variable)}>
            <body className="min-h-full flex flex-col gap-8 items-center bg-white font-sans text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 pb-8">
                <LdoContext>
                    <HeaderBar />
                    {props.children}
                </LdoContext>
            </body>
        </html>
    );
}
