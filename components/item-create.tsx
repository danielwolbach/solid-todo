import { Container, Resource } from "@ldo/solid";
import { ItemShapeType } from "@/lib/ldo/todo.shapeTypes";
import { PlusCircle } from "lucide-react";
import { useLdo } from "@ldo/solid-react";
import { v4 } from "uuid";
import Button from "@/components/button";
import Section from "@/components/section";
import TextInput from "@/components/text-input";

export interface Props {
    container?: Container;
}

export default function ItemCreate(props: Readonly<Props>) {
    const { createData, commitData } = useLdo();
    const isLoading = props.container === undefined;

    return (
        <form action={isLoading ? undefined : createItem} className="w-full">
            <Section horizontal className="w-full gap-4">
                <TextInput name="name" placeholder="Enter something..." disabled={isLoading} />
                <Button submit loading={isLoading}>
                    <PlusCircle height={20} />
                    Add
                </Button>
            </Section>
        </form>
    );

    async function createItem(formData: FormData) {
        if (!props.container) return;

        const name = formData.get("name") as string;

        if (!name || name.trim() === "") return;

        const result = await props.container.createChildAndOverwrite(`${v4()}.ttl`);

        if (result.isError) {
            console.error("Failed to create item:", result.message);
            return;
        }

        const itemResource = (result as Extract<typeof result, { isError: false }>).resource as Resource;
        const post = createData(ItemShapeType, itemResource.uri, itemResource);

        post.name = name.trim();
        post.done = false;

        const commitResult = await commitData(post);

        if (commitResult.isError) {
            console.error("Failed to commit item:", commitResult.message);
            return;
        }
    }
}
