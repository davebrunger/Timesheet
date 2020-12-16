import { TDataItem } from "../components/common/DataTable";
import { Stringified } from "../utilities/Strings";

export interface InlineAddFormProps<T extends TDataItem> {
    disabled: boolean;
    post: (() => void) | (() => Promise<void>);
    dataItem: Partial<Stringified<T>>;
    setDataItem: (dataItem: Partial<Stringified<T>>) => void;
}
