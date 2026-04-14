"use client";

import { Container, ContainerUri } from "@ldo/solid";
import { useEffect, useState } from "react";
import { useLdo, useResource, useSolidAuth } from "@ldo/solid-react";
import ItemCreate from "@/components/item-create";
import ItemEntry from "@/components/item-entry";
import Section from "@/components/section";
import Spinner from "@/components/spinner";

export default function ItemIndex() {
    const { session } = useSolidAuth();
    const { getResource } = useLdo();
    const [mainContainerUri, setMainContainerUri] = useState<ContainerUri | undefined>(undefined);
    const resource = useResource(mainContainerUri) as Container | undefined;

    useEffect(() => {
        if (session.webId) {
            const webIdResource = getResource(session.webId);
            webIdResource.getRootContainer().then((rootContainerResult) => {
                if (rootContainerResult.isError) return;
                const mainContainer = rootContainerResult.child("solid-todo/");
                setMainContainerUri(mainContainer.uri);
                mainContainer.createIfAbsent();
            });
        }
    }, [getResource, session.webId]);

    const isLoading = resource === undefined || resource.isReading() || resource.isUnfetched();
    const children = resource?.children() ?? [];

    return (
        <Section>
            {isLoading ? (
                <Spinner size={48} />
            ) : children.length === 0 ? (
                <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 p-5 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                    No items yet.
                </div>
            ) : (
                <ul className="flex w-full flex-col divide-y divide-zinc-200 overflow-hidden rounded-lg bg-zinc-50 ring-1 ring-zinc-200 dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-zinc-800">
                    {children.map((child) => (
                        <li key={child.uri}>
                            <ItemEntry uri={child.uri} />
                        </li>
                    ))}
                </ul>
            )}
            {!isLoading && <ItemCreate container={resource} />}
        </Section>
    );
}
