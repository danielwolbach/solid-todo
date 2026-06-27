"use client";

import { usePodContext } from "@/components/pod-context";
import { useAppView } from "@/components/app-view-context";
import Button from "@/components/button";
import Form from "@/components/form";
import Heading from "@/components/heading";
import Section from "@/components/section";
import TextInput from "./text-input";

export default function PodForm() {
    const { pod, setPod } = usePodContext();
    const { setView } = useAppView();

    return (
        <Section>
            <Form action={changePod}>
                <Heading>Change Pod</Heading>
                <TextInput name="podUrl" defaultValue={pod} label="Pod" placeholder="https://example.com/pod" />
                <Button submit>Change pod</Button>
            </Form>
        </Section>
    );

    async function changePod(formData: FormData) {
        const podUrl = formData.get("podUrl")?.toString();
        if (podUrl === null) return;
        if (podUrl === "") {
            setPod(undefined);
        } else {
            setPod(podUrl);
        }
        setView("todos");
    }
}
