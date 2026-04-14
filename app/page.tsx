import ItemIndex from "../components/item-index";
import Protected from "../components/protected";

export default function Page() {
    return (
        <Protected>
            <ItemIndex />
        </Protected>
    );
}
