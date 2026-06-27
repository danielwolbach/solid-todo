"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type AppView = "todos" | "auth" | "pod";

interface AppViewContextType {
    view: AppView;
    setView: (view: AppView) => void;
}

const AppViewContext = createContext<AppViewContextType | undefined>(undefined);

export function AppViewProvider({ children }: { children: ReactNode }) {
    const [view, setView] = useState<AppView>("todos");

    return <AppViewContext.Provider value={{ view, setView }}>{children}</AppViewContext.Provider>;
}

export function useAppView() {
    const ctx = useContext(AppViewContext);
    if (!ctx) throw new Error("useAppView must be used within an AppViewProvider");
    return ctx;
}
