import React from "react";
import { Button, Form } from "reactstrap";
import { Task } from "../../models/Task";
import { User } from "../../models/User";
import { WorkLog } from "../../models/WorkLogs";
import { useAsyncEffect } from "../../utilities/AsyncEffect";
import { get } from "../../utilities/Fetch";
import { Stringified } from "../../utilities/Strings";
import { InlineFormInput } from "../forms/InlineFormInput";
import { InlineFormSelect } from "../forms/InlineFormSelect";

type FormData = Partial<Stringified<WorkLog>>;

interface Props {
    disabled: boolean;
    post: () => void;
    workLog: FormData;
    setWorkLog: (workLog: FormData) => void;
}

export function AddWorkLogInlineForm(props: Props): JSX.Element {

    const [users, setUsers] = React.useState<Stringified<User>[] | undefined>(undefined);
    const [tasks, setTasks] = React.useState<Stringified<Task>[] | undefined>(undefined);

    useAsyncEffect(async () => {
        setUsers(await get("users"));
    }, []);

    useAsyncEffect(async () => {
        if (!users || tasks) {
            return;
        }
        setTasks(await get("tasks"));
    }, [users]);

    React.useEffect(() => {
        if (!tasks) {
            return;
        }
        if (users && users.length > 0 && tasks && tasks.length > 0) {
            props.setWorkLog({
                ...props.workLog,
                user: users[0],
                task: tasks[0],
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks]);

    const isFormEnabled = () => !props.disabled && users && users.length > 0 && tasks && tasks.length > 0;

    const userChange = (user: Stringified<User>) => props.setWorkLog({ ...props.workLog, user: user });
    const taskChange = (task: Stringified<Task>) => props.setWorkLog({ ...props.workLog, task: task });
    const dateChange = (value: string) => props.setWorkLog({ ...props.workLog, date: value });
    const hoursChange = (value: string) => props.setWorkLog({ ...props.workLog, hours: value });

    return (
        <Form inline>
            <InlineFormSelect id="userId" label="User ID" valueId={props.workLog.user?.id} onChange={userChange} disabled={!isFormEnabled()} options={users} />
            <InlineFormSelect id="taskId" label="Task ID" valueId={props.workLog.task?.id} onChange={taskChange} disabled={!isFormEnabled()} options={tasks} />
            <InlineFormInput
                type="date" id="date" name="date" label="Date" value={props.workLog.date}
                onChange={dateChange} disabled={!isFormEnabled()} min="2000-01-01" max="2099-12-31" />
            <InlineFormInput
                type="number" id="hours" name="hours" label="Hours" value={props.workLog.hours}
                onChange={hoursChange} disabled={!isFormEnabled()} min="0.01" max="24" />
            <Button size="sm" disabled={!isFormEnabled()} onClick={props.post}>Add</Button>
        </Form>
    );
}