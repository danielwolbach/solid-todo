"use client";

import { Container, ContainerUri } from "@ldo/solid";
import { useEffect, useState } from "react";
import { useLdo, useResource, useSolidAuth } from "@ldo/solid-react";
import ItemCreate from "@/components/item-create";
import ItemEntry from "@/components/item-entry";
import Section from "@/components/section";
import Spinner from "@/components/spinner";
import Message from "./message";
import { TriangleAlert } from "lucide-react";
import { usePodContext } from "./pod-context";

export default function ItemIndex() {
    const { pod, setPod } = usePodContext();
    const { session } = useSolidAuth();
    const { getResource } = useLdo();
    const [mainContainerUri, setMainContainerUri] = useState<ContainerUri | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const resource = useResource(mainContainerUri) as Container | undefined;

    useEffect(() => {
        const getMainContainer = async () => {
            console.log("Getting main container for pod:", pod);
            if (pod) {
                let podUri = pod;
                if (!podUri.endsWith("/")) podUri += "/";
                const mainContainerUri = podUri + "solid-todo/";
                setMainContainerUri(mainContainerUri as ContainerUri);
                const podResource = getResource(mainContainerUri);
                if (podResource.status.isError || podResource.isError) {
                    setError("Failed to access the specified Pod. Please check the URL and try again.");
                    return;
                }
                const result = await podResource.createIfAbsent();
                if (result?.isError || result?.status?.isError) {
                    setError(
                        result?.errorMessage ||
                            (result?.status?.errorMessage ??
                                `Failed to create or access the Pod at ${pod}. Please check your authentication, permissions and Pod URL.`),
                    );
                    return;
                }
            } else if (session.webId) {
                const webIdResource = getResource(session.webId);
                const rootContainerResult = await webIdResource.getRootContainer();
                if (rootContainerResult.isError) return;
                const mainContainer = rootContainerResult.child("solid-todo/");
                setMainContainerUri(mainContainer.uri);
                mainContainer.createIfAbsent();
                setPod(rootContainerResult.uri);
            }
        };
        getMainContainer();
    }, [getResource, session.webId, pod]);
    if (error) {
        return (
            <Section>
                <Message error>
                    <TriangleAlert size={32} />
                    {error}
                </Message>
            </Section>
        );
    }

    const isLoading = resource === undefined || resource.isReading() || resource.isUnfetched();
    const children = resource?.children() ?? [];

    return (
        <Section>
            {isLoading ? (
                <Spinner size={48} />
            ) : children.length === 0 ? (
                <Message className="border-dashed">No items yet.</Message>
            ) : (
                <>
                    <ul className="flex w-full flex-col divide-y divide-zinc-200 overflow-hidden rounded-lg bg-zinc-50 ring-1 ring-zinc-200 dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-zinc-800">
                        {children.map((child) => (
                            <li key={child.uri}>
                                <ItemEntry uri={child.uri} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {!isLoading && <ItemCreate container={resource} />}
        </Section>
    );
}
