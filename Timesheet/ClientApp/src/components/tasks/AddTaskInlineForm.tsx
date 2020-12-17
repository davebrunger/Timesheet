import * as React from "react";
import { Button, Form } from "reactstrap";
import { InlineAddFormProps } from "../../models/InlineFormProps";
import { Project, stringifyProject } from "../../models/Project";
import { Task } from "../../models/Task";
import { Stringified } from "../../utilities/Strings";
import { InlineFormInput } from "../common/InlineFormInput";
import { InlineFormSelect } from "../common/InlineFormSelect";

interface Props extends InlineAddFormProps<Task> {
    projects : Project[] | undefined;
}

export function AddTaskInlineForm(props: Props): JSX.Element {

    const isFormEnabled = () => !props.disabled && props.projects && props.projects.length > 0;

    const nameChange = (value: string) => props.setDataItem({ ...props.dataItem, name: value });
    const projectChange = (project?: Stringified<Project>) => props.setDataItem({ ...props.dataItem, project: project });

    return (
        <Form inline>
            <InlineFormInput
                id="name" label="Name" value={props.dataItem.name}
                onChange={nameChange} disabled={!isFormEnabled()} />
            <InlineFormSelect
                id="projectId" label="Project" valueId={props.dataItem.project?.id}
                onChange={projectChange} disabled={!isFormEnabled()} options={props.projects?.map(stringifyProject)} />
            <Button size="sm" disabled={!isFormEnabled()} onClick={props.post}>Add</Button>
        </Form>
    );
}