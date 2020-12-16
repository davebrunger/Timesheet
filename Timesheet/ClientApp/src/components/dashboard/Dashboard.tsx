import * as React from 'react';
import { format } from 'date-fns';
import { convertFromJson, WorkLog } from '../../models/WorkLogs';
import { AddWorkLogInlineForm } from './AddWorkLogInlineForm';
import { DatesAsStrings } from '../../utilities/Dates';
import { useBasicReducer, useRequestReducer } from '../../utilities/Reducers';
import { User } from '../../models/User';
import { Task } from '../../models/Task';
import { get, post } from '../../utilities/AsyncFetch';
import { isSuccess, REQUESTED } from '../../models/Request';
import { Stringified } from '../../utilities/Strings';
import { RequestDataTable } from '../common/RequestDataTable';

export function Dashboard(): JSX.Element {

  const [dataRequest, dispatchDataRequest] = useRequestReducer<DatesAsStrings<WorkLog>[]>();
  const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
  const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<WorkLog>>>({});
  const [usersRequest, dispatchUsers] = useRequestReducer<User[]>();
  const [tasksRequest, dispatchTasks] = useRequestReducer<Task[]>();

  const getData = React.useCallback(() => { get("workLogs", dispatchDataRequest) }, [dispatchDataRequest]);

  const postDataItem = async () => {
    var success = await post("workLogs", dataItem, dispatchPostRequest);
    if (success) {
      dispatchDataItem({ user: dataItem.user, task: dataItem.task });
      getData();
    }
  }

  React.useEffect(() => { getData(); }, [getData]);
  React.useEffect(() => { get("users", dispatchUsers); }, [dispatchUsers])
  React.useEffect(() => { get("tasks", dispatchTasks); }, [dispatchTasks])

  return (
    <>
      <AddWorkLogInlineForm
        disabled={postRequest.type === REQUESTED || !isSuccess(dataRequest)}
        post={postDataItem}
        dataItem={dataItem}
        setDataItem={dispatchDataItem}
        users={isSuccess(usersRequest) ? usersRequest.data : undefined}
        tasks={isSuccess(tasksRequest) ? tasksRequest.data : undefined}
      />
      <RequestDataTable
        entityName="work log"
        columns={[
          { label: "#", getValue: wl => wl.id, isRowHeader: true, isRightAligned: true },
          { label: "Project", getValue: wl => wl.task.project.name },
          { label: "Task", getValue: wl => wl.task.name },
          { label: "User", getValue: wl => wl.user.name },
          { label: "Date", getValue: wl => format(convertFromJson(wl).date, "dd/MM/yyyy"), isRightAligned: true },
          { label: "Hours", getValue: wl => wl.hours.toFixed(2), isRightAligned: true },
        ]}
        dataRequest={dataRequest}
      />
    </>
  );
}
