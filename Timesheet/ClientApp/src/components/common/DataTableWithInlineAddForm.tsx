import * as React from "react";
import { isSuccess, REQUESTED } from "../../models/Request";
import { get, post } from "../../utilities/AsyncFetch";
import { useBasicReducer, useRequestReducer } from "../../utilities/Reducers";
import { Stringified } from "../../utilities/Strings";
import { TDataItem } from "./DataTable";
import { RequestDataTable } from "./RequestDataTable";

export interface InlineAddFormProps<T extends TDataItem> {
    disabled: boolean;
    post: (() => void) | (() => Promise<void>);
    dataItem: Partial<Stringified<T>>;
    setDataItem: (dataItem: Partial<Stringified<T>>) => void;
}

interface Props<T extends TDataItem> {
    entityName: string
    columns: {
        label: string,
        getValue: (row: T) => React.ReactNode | undefined,
        isRowHeader?: boolean
    }[],
    apiPath: string;
    clearDataItem?: (dataItem: Partial<Stringified<T>>) => Partial<Stringified<T>>
    renderInlineAddForm: (props: InlineAddFormProps<T>) => JSX.Element;
    convertPostedData?: (dataItem: Partial<Stringified<T>>) => any;
}

export function DataTableWithInlineAddForm<T extends TDataItem>(props: Props<T>): JSX.Element {

    const [dataRequest, dispatchDataRequest] = useRequestReducer<T[]>();
    const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
    const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<T>>>({});

    const getData = React.useCallback(() => {get<T[]>(props.apiPath, dispatchDataRequest)}, [props.apiPath, dispatchDataRequest]);

    const postDataItem = async () => {
        const dataItemToPost = props.convertPostedData
            ? props.convertPostedData(dataItem)
            : dataItem;
        const success = await post(props.apiPath, dataItemToPost, dispatchPostRequest);
        if (success) {
            if (props.clearDataItem)
            {
                dispatchDataItem(props.clearDataItem(dataItem));
            }
            await getData();
        }
    };

    React.useEffect(() => { getData(); }, [getData]);

    return (
        <>
            {props.renderInlineAddForm({
                disabled: postRequest.type === REQUESTED || !(isSuccess(dataRequest) && dataRequest.data.length > 0),
                post: postDataItem,
                dataItem: dataItem,
                setDataItem: dispatchDataItem
            })}
            <RequestDataTable entityName={props.entityName} request={dataRequest} columns={props.columns} />
        </>
    );
}
