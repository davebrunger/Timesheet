import * as React from "react";
import { User } from "../../models/User";
import { DataTableWithInlineAddForm } from "../common/DataTableWithInlineAddForm";
import { AddUserInlineForm } from "./AddUserInlineForm";

export function Users(): JSX.Element {
    return (
        <DataTableWithInlineAddForm<User>
            entityName="user"
            apiPath="users"
            clearDataItem={() => { return {}; }}
            renderInlineAddForm={props => <AddUserInlineForm {...props} />}
            columns={[
                { label: "#", getValue: t => t.id, isRowHeader: true },
                { label: "Name", getValue: t => t.name },
                { label: "Location", getValue: t => t.location }
            ]} />
    );
}