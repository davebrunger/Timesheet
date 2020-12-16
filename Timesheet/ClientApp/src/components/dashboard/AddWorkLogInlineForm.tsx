import * as React from "react";
import { Button, Form } from "reactstrap";
import { InlineAddFormProps } from "../../models/InlineFormProps";
import { stringify as stringifyTask, Task } from "../../models/Task";
import { stringify as stringifyUser, User } from "../../models/User";
import { WorkLog } from "../../models/WorkLogs";
import { Stringified } from "../../utilities/Strings";
import { InlineFormInput } from "../common/InlineFormInput";
import { InlineFormSelect } from "../common/InlineFormSelect";

interface Props extends InlineAddFormProps<WorkLog> {
    users : User[] | undefined;
    tasks : Task[] | undefined;
}

export function AddWorkLogInlineForm(props: Props): JSX.Element {

    const isFormEnabled = () => !props.disabled
        && props.users && props.users.length > 0
        && props.tasks && props.tasks.length > 0;

    const userChange = (user: Stringified<User>) => props.setDataItem({ ...props.dataItem, user: user });
    const taskChange = (task: Stringified<Task>) => props.setDataItem({ ...props.dataItem, task: task });
    const dateChange = (value: string) => props.setDataItem({ ...props.dataItem, date: value });
    const hoursChange = (value: string) => props.setDataItem({ ...props.dataItem, hours: value });

    return (
        <Form inline>
            <InlineFormSelect
                id="userId" label="User" valueId={props.dataItem.user?.id}
                onChange={userChange} disabled={!isFormEnabled()} options={props.users ? props.users.map(stringifyUser) : undefined} />
            <InlineFormSelect
                id="taskId" label="Task" valueId={props.dataItem.task?.id}
                onChange={taskChange} disabled={!isFormEnabled()} options={props.tasks ? props.tasks.map(stringifyTask) : undefined} />
            <InlineFormInput
                type="date" id="date" label="Date" value={props.dataItem.date}
                onChange={dateChange} disabled={!isFormEnabled()} min="2000-01-01" max="2099-12-31" />
            <InlineFormInput
                type="number" id="hours" label="Hours" value={props.dataItem.hours}
                onChange={hoursChange} disabled={!isFormEnabled()} min="0.01" max="24" />
            <Button size="sm" disabled={!isFormEnabled()} onClick={props.post}>Add</Button>
        </Form>
    );
}