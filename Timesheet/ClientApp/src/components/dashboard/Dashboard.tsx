import * as React from 'react';
import { Button, Form, Table } from 'reactstrap';
import { InlineFormInput } from '../forms/InlineFormInput';

export function Dashboard(): JSX.Element {

  const initialFormState = {
    userId: "",
    taskId: "",
    date: "",
    hours: ""
  }

  const [workLogs, setWorkLogs] = React.useState<any[] | undefined>(undefined);
  const [formState, setFormState] = React.useState(initialFormState);
  const [posting, setPosting] = React.useState(false);

  const fetchData = async () => {
    const response = await fetch("api/worklogs")
    const body = await response.json();
    setWorkLogs(body);
  };

  const post = async () => {
    if (!posting) {
      return;
    }

    const response = await fetch("api/worklogs", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: { id: formState.userId },
        task: { id: formState.taskId },
        date: formState.date || undefined,
        hours: formState.hours
      })
    });

    if (response.ok) {
      setFormState(initialFormState);
      await fetchData();
    }
    else {
      alert(await response.text());
    }

    setPosting(false);
  };

  React.useEffect(() => { fetchData(); }, []);
  React.useEffect(() => { 
    post();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [posting]);

  const renderTableRows = () => {
    if (!workLogs) {
      return (
        <tr>
          <td colSpan={6}>Please wait...</td>
        </tr>
      )
    }
    if (workLogs.length === 0) {
      return (
        <tr>
          <td colSpan={6}>No work logs have been created</td>
        </tr>
      )
    }
    return workLogs.map(wl => (
      <tr key={wl.id}>
        <th scope="row">{wl.id}</th>
        <td>{wl.task.project.name}</td>
        <td>{wl.task.name}</td>
        <td>{wl.user.name}</td>
        <td>{wl.date}</td>
        <td>{wl.hours}</td>
      </tr>
    ))
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Form inline>
        <InlineFormInput id="userId" name="userId" label="User ID" value={formState.userId} onChange={changeHandler} disabled={posting} />
        <InlineFormInput id="taskId" name="taskId" label="Task ID" value={formState.taskId} onChange={changeHandler} disabled={posting} />
        <InlineFormInput id="date" name="date" label="date" value={formState.date} onChange={changeHandler} disabled={posting} />
        <InlineFormInput id="hours" name="hours" label="hours" value={formState.hours} onChange={changeHandler} disabled={posting} />
        <Button size="sm" disabled={posting} onClick={() => setPosting(true)}>Add</Button>
      </Form>
      <Table borderless striped size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Task</th>
            <th>User</th>
            <th>Date</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>
    </>
  );
}
