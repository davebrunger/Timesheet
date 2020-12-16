import * as React from "react";
import { Button, Form } from "reactstrap";
import { InlineAddFormProps } from "../../models/InlineFormProps";
import { User } from "../../models/User";
import { InlineFormInput } from "../common/InlineFormInput";

export function AddUserInlineForm(props: InlineAddFormProps<User>): JSX.Element {

    const nameChange = (value: string) => props.setDataItem({ ...props.dataItem, name: value });
    const locationChange = (value: string) => props.setDataItem({ ...props.dataItem, location: value });

    return (
        <Form inline>
            <InlineFormInput id="name" label="Name" value={props.dataItem.name} onChange={nameChange} disabled={props.disabled} />
            <InlineFormInput id="location" label="Location" value={props.dataItem.location} onChange={locationChange} disabled={props.disabled} />
            <Button size="sm" disabled={props.disabled} onClick={props.post}>Add</Button>
        </Form>
    );
}