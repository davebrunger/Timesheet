import * as React from "react";
import { isSuccess, REQUESTED } from "../../models/Request";
import { User } from "../../models/User";
import { get, post } from "../../utilities/AsyncFetch";
import { useBasicReducer, useRequestReducer } from "../../utilities/Reducers";
import { Stringified } from "../../utilities/Strings";
import { RequestDataTable } from "../common/RequestDataTable";
import { AddUserInlineForm } from "./AddUserInlineForm";

export function Users(): JSX.Element {

    const [dataRequest, dispatchDataRequest] = useRequestReducer<User[]>();
    const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
    const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<User>>>({});

    const getData = React.useCallback(() => { get("users", dispatchDataRequest) }, [dispatchDataRequest]);

    const postDataItem = async () => {
        var success = await post("users", dataItem, dispatchPostRequest);
        if (success) {
            dispatchDataItem({});
            getData();
        }
    }

    React.useEffect(getData, [getData]);

    return (
        <>
            <AddUserInlineForm
                disabled={postRequest.type === REQUESTED || !isSuccess(dataRequest)}
                post={postDataItem}
                dataItem={dataItem}
                setDataItem={dispatchDataItem}
            />
            <RequestDataTable
                columns={[
                    { label: "#", getValue: t => t.id, isRowHeader: true, isRightAligned: true },
                    { label: "Name", getValue: t => t.name },
                    { label: "Location", getValue: t => t.location }
                ]}
                dataRequest={dataRequest}
                entityName="user"
            />
        </>
    );
}