"use client";

import { BrowserSolidLdoProvider } from "@ldo/solid-react";

export interface Props {
    children?: React.ReactNode;
}

export default function LdoContext(props: Readonly<Props>) {
    return <BrowserSolidLdoProvider>{props.children}</BrowserSolidLdoProvider>;
}
