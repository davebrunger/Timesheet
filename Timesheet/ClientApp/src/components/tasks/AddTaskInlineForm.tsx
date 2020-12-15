import * as React from "react";
import { Button, Form } from "reactstrap";
import { Project, stringify } from "../../models/Project";
import { isSuccess } from "../../models/Request";
import { Task } from "../../models/Task";
import { get } from "../../utilities/AsyncFetch";
import { useRequestReducer } from "../../utilities/Reducers";
import { Stringified } from "../../utilities/Strings";
import { InlineAddFormProps } from "../common/DataTableWithInlineAddForm";
import { InlineFormInput } from "../common/InlineFormInput";
import { InlineFormSelect } from "../common/InlineFormSelect";

export function AddTaskInlineForm(props: InlineAddFormProps<Task>): JSX.Element {

    const [projectsRequest, dispatchProjectsRequest] = useRequestReducer<Project[]>(projects => {
        if (!props.dataItem.project && projects.length > 0) {
            props.setDataItem({ ...props.dataItem, project: stringify(projects[0]) });
        }
    });

    React.useEffect(() => { get("projects", dispatchProjectsRequest); }, [dispatchProjectsRequest]);

    const isFormEnabled = () => !props.disabled && isSuccess(projectsRequest) && projectsRequest.data.length > 0;

    const nameChange = (value: string) => props.setDataItem({ ...props.dataItem, name: value });
    const projectChange = (project: Stringified<Project>) => props.setDataItem({ ...props.dataItem, project: project });

    return (
        <Form inline>
            <InlineFormInput
                id="name" label="Name" value={props.dataItem.name}
                onChange={nameChange} disabled={!isFormEnabled()} />
            <InlineFormSelect
                id="projectId" label="Project" valueId={props.dataItem.project?.id}
                onChange={projectChange} disabled={!isFormEnabled()} options={isSuccess(projectsRequest) ? projectsRequest.data.map(stringify) : undefined} />
            <Button size="sm" disabled={!isFormEnabled()} onClick={props.post}>Add</Button>
        </Form>
    );
}