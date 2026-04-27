"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface PodContextType {
    pod: string | undefined;
    setPod: (pod: string | undefined) => void;
}

const PodContext = createContext<PodContextType | undefined>(undefined);

export function PodProvider({ children }: { children: ReactNode }) {
    const [pod, setPodState] = useState<string | undefined>(undefined);

    useEffect(() => {
        const stored = localStorage.getItem("solid-todo-pod") || undefined;
        setPodState(stored);
    }, []);

    const setPod = (value: string | undefined) => {
        if (value) {
            if (!value.endsWith("/")) value += "/";
            setPodState(value);
            localStorage.setItem("solid-todo-pod", value);
        } else {
            setPodState(value);
            localStorage.removeItem("solid-todo-pod");
        }
    };

    return <PodContext.Provider value={{ pod, setPod }}>{children}</PodContext.Provider>;
}

export function usePodContext() {
    const ctx = useContext(PodContext);
    if (!ctx) throw new Error("usePodContext must be used within a PodProvider");
    return ctx;
}
