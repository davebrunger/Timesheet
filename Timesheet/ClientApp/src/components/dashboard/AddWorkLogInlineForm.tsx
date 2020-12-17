import * as React from "react";
import { Button, Form } from "reactstrap";
import { stringifyActivity, Activity } from "../../models/Activity";
import { InlineAddFormProps } from "../../models/InlineFormProps";
import { stringifyTask, Task } from "../../models/Task";
import { stringifyUser, User } from "../../models/User";
import { WorkLog } from "../../models/WorkLogs";
import { Stringified } from "../../utilities/Strings";
import { InlineFormInput } from "../common/InlineFormInput";
import { InlineFormSelect } from "../common/InlineFormSelect";

interface Props extends InlineAddFormProps<WorkLog> {
    users: User[] | undefined;
    tasks: Task[] | undefined;
    activities: Activity[] | undefined;
}

export function AddWorkLogInlineForm(props: Props): JSX.Element {

    const isFormEnabled = () => !props.disabled
        && props.users && props.users.length > 0
        && props.tasks && props.tasks.length > 0
        && props.activities && props.activities.length > 0;

    const userChange = (user?: Stringified<User>) => props.setDataItem({ ...props.dataItem, user: user });
    const taskChange = (task?: Stringified<Task>) => props.setDataItem({ ...props.dataItem, task: task });
    const dateChange = (value: string) => props.setDataItem({ ...props.dataItem, date: value });
    const hoursChange = (value: string) => props.setDataItem({ ...props.dataItem, hours: value });

    const activityChange = (activity?: Stringified<Activity>) => 
        props.setDataItem({ ...props.dataItem, activityId: activity?.id });

    return (
        <Form inline>
            <InlineFormSelect
                id="taskId" label="Task" valueId={props.dataItem.task?.id}
                onChange={taskChange} disabled={!isFormEnabled()} options={props.tasks?.map(stringifyTask)} />
            <InlineFormSelect
                id="userId" label="User" valueId={props.dataItem.user?.id}
                onChange={userChange} disabled={!isFormEnabled()} options={props.users?.map(stringifyUser)} />
            <InlineFormInput
                type="date" id="date" label="Date" value={props.dataItem.date}
                onChange={dateChange} disabled={!isFormEnabled()} min="2000-01-01" max="2099-12-31" />
            <InlineFormInput
                type="number" id="hours" label="Hours" value={props.dataItem.hours}
                onChange={hoursChange} disabled={!isFormEnabled()} min="0.01" max="24" />
            <InlineFormSelect
                id="activityId" label="Activity" valueId={props.dataItem.activityId} isNoSelectionAllowed={true}
                onChange={activityChange} disabled={!isFormEnabled()} options={props.activities?.map(stringifyActivity)} />
            <Button size="sm" disabled={!isFormEnabled()} onClick={props.post}>Add</Button>
        </Form>
    );
}