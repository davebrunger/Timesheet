import * as React from 'react';
import { Table } from 'reactstrap';
import { format } from 'date-fns';
import { getWithDatesArray, post } from '../../utilities/Fetch';
import { convertFromJson, WorkLog } from '../../models/WorkLogs';
import { useAsyncEffect } from '../../utilities/AsyncEffect';
import { AddWorkLogInlineForm } from './AddWorkLogInlineForm';
import { Stringified } from '../../utilities/Strings';
import { parseDate } from '../../utilities/Dates';

export function Dashboard(): JSX.Element {

  const [workLog, setWorkLog] = React.useState<Partial<Stringified<WorkLog>>>({});
  const [workLogs, setWorkLogs] = React.useState<WorkLog[] | undefined>(undefined);
  const [posting, setPosting] = React.useState(false);

  useAsyncEffect(async () => {
    setWorkLogs(await getWithDatesArray("workLogs", convertFromJson));
  }, []);

  useAsyncEffect(async () => {
    if (!posting) {
      return;
    }

    if (await post("worklogs", { ...workLog, date: parseDate(workLog.date) })) {
      setWorkLog({
        user: workLog.user,
        task: workLog.task
      });
    }
    else {
      alert("oops");
      setPosting(false);
    }
  }, [posting]);

  useAsyncEffect(async () => {
    if (!posting) {
      return;
    }
    setWorkLogs(await getWithDatesArray("workLogs", convertFromJson));
  }, [workLog]);

  React.useEffect(() => {
    if (!posting) {
      return;
    }
    setPosting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workLogs])

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
        <td>{format(wl.date, "dd/MM/yyyy")}</td>
        <td>{wl.hours}</td>
      </tr>
    ))
  };

  return (
    <>
      <AddWorkLogInlineForm disabled={posting || !workLogs} post={() => setPosting(true)} setWorkLog={setWorkLog} workLog={workLog} />
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
