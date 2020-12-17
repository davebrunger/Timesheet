import * as React from "react";
import { Button, Form } from "reactstrap";
import { InlineAddFormProps } from "../../models/InlineFormProps";
import { Project } from "../../models/Project";
import { InlineFormInput } from "../common/InlineFormInput";

export function AddProjectInlineForm(props: InlineAddFormProps<Project>): JSX.Element {

    const nameChange = (value: string) => props.setDataItem({ ...props.dataItem, name: value });
    const dueDateChange = (value: string) => props.setDataItem({ ...props.dataItem, dueDate: value });

    return (
        <Form inline>
            <InlineFormInput id="name" label="Name" value={props.dataItem.name} onChange={nameChange} disabled={props.disabled} />
            <InlineFormInput
                type="date" id="date" label="Date" value={props.dataItem.dueDate}
                onChange={dueDateChange} disabled={props.disabled} min="2000-01-01" max="2099-12-31" />
            <Button size="sm" disabled={props.disabled} onClick={props.post}>Add</Button>
        </Form>
    );
}