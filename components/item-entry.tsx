import { cn } from "@/lib/utils";
import { Container, Leaf, Resource } from "@ldo/solid";
import { Item } from "@/lib/ldo/todo.typings";
import { ItemShapeType } from "@/lib/ldo/todo.shapeTypes";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLdo, useResource, useSubject } from "@ldo/solid-react";
import Button from "@/components/button";
import CheckboxInput from "@/components/checkbox-input";

export interface Props {
    uri: string;
}

export default function ItemEntry(props: Readonly<Props>) {
    const { getResource, changeData, commitData } = useLdo();
    const resource = useResource(props.uri) as Resource;
    const model = useSubject(ItemShapeType, props.uri) as Item | undefined;
    const [draftName, setDraftName] = useState(model?.name ?? "");

    useEffect(() => {
        setDraftName(model?.name ?? "");
    }, [model?.name]);

    const toggleItem = useCallback(
        async (checked: boolean) => {
            if (!model) return;
            const edit = changeData(model, getResource(props.uri));
            edit.done = checked;
            await commitData(edit);
        },
        [model, changeData, commitData, getResource, props.uri],
    );

    const saveItemName = useCallback(async () => {
        if (!model) return;

        const nextName = draftName.trim();

        if (nextName === "") {
            setDraftName(model.name);
            return;
        }

        if (nextName === model.name) {
            return;
        }

        const edit = changeData(model, getResource(props.uri));
        edit.name = nextName;
        await commitData(edit);
    }, [changeData, commitData, draftName, getResource, model, props.uri]);

    const deleteItem = useCallback(async () => {
        const itemResource = getResource(props.uri) as Container | Leaf;
        await itemResource.delete();
    }, [getResource, props.uri]);

    const isLoading = resource.isReading() || resource.isUnfetched();

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 bg-zinc-50 p-3 animate-pulse dark:bg-zinc-900">
                <div className="h-5 w-5 shrink-0 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="mr-20 h-5 flex-1 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="h-11 w-11 rounded-full shrink-0 grid place-items-center">
                    <div className="h-7 w-7 rounded-full shrink-0 bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-zinc-50 p-3 dark:bg-zinc-900">
            <CheckboxInput checked={model?.done ?? false} onChange={toggleItem} />
            <input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onFocus={(event) => {
                    event.currentTarget.select();
                }}
                onClick={(event) => {
                    event.currentTarget.select();
                }}
                onBlur={() => {
                    void saveItemName();
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        event.currentTarget.blur();
                    }
                }}
                className={cn(
                    "min-w-0 flex-1 border-b border-transparent bg-transparent py-1 text-inherit transition focus:border-zinc-200 focus:outline-none dark:focus:border-zinc-800",
                    model?.done && "line-through text-zinc-400 dark:text-zinc-500",
                )}
            />
            <Button onClick={deleteItem}>
                <Trash2 height={20} />
            </Button>
        </div>
    );
}
