import * as React from "react";
import { Button, Form } from "reactstrap";
import { stringify as stringifyTask, Task } from "../../models/Task";
import { stringify as stringifyUser, User } from "../../models/User";
import { isSuccess } from "../../models/Request";
import { WorkLog } from "../../models/WorkLogs";
import { Stringified } from "../../utilities/Strings";
import { InlineAddFormProps } from "../common/DataTableWithInlineAddForm";
import { InlineFormInput } from "../common/InlineFormInput";
import { InlineFormSelect } from "../common/InlineFormSelect";
import { useRequestReducer } from "../../utilities/Reducers";
import { get } from "../../utilities/AsyncFetch";


export function AddWorkLogInlineForm(props: InlineAddFormProps<WorkLog>): JSX.Element {

    const [usersRequest, dispatchUsers] = useRequestReducer<User[]>(users => {
        if (!props.dataItem.user && users.length > 0) {
            props.setDataItem({ ...props.dataItem, user: stringifyUser(users[0]) });
        }
    });
    const [tasksRequest, dispatchTasks] = useRequestReducer<Task[]>(tasks => {
        if (!props.dataItem.task && tasks.length > 0) {
            props.setDataItem({ ...props.dataItem, task: stringifyTask(tasks[0]) });
        }
    });

    React.useEffect(() => { get("users", dispatchUsers); }, [dispatchUsers])
    React.useEffect(() => { get("tasks", dispatchTasks); }, [dispatchTasks])

    const isFormEnabled = () => !props.disabled
        && isSuccess(usersRequest) && usersRequest.data.length > 0
        && isSuccess(tasksRequest) && tasksRequest.data.length > 0;

    const userChange = (user: Stringified<User>) => props.setDataItem({ ...props.dataItem, user: user });
    const taskChange = (task: Stringified<Task>) => props.setDataItem({ ...props.dataItem, task: task });
    const dateChange = (value: string) => props.setDataItem({ ...props.dataItem, date: value });
    const hoursChange = (value: string) => props.setDataItem({ ...props.dataItem, hours: value });

    return (
        <Form inline>
            <InlineFormSelect
                id="userId" label="User" valueId={props.dataItem.user?.id}
                onChange={userChange} disabled={!isFormEnabled()} options={isSuccess(usersRequest) ? usersRequest.data.map(stringifyUser) : undefined} />
            <InlineFormSelect
                id="taskId" label="Task" valueId={props.dataItem.task?.id}
                onChange={taskChange} disabled={!isFormEnabled()} options={isSuccess(tasksRequest) ? tasksRequest.data.map(stringifyTask) : undefined} />
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