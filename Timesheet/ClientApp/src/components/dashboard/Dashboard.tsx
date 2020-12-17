import * as React from 'react';
import { convertWorkLogFromJson, stringifyWorkLog, WorkLog } from '../../models/WorkLogs';
import { AddWorkLogInlineForm } from './AddWorkLogInlineForm';
import { useBasicReducer, useRequestReducer } from '../../utilities/Reducers';
import { User } from '../../models/User';
import { Task } from '../../models/Task';
import { get, getWithDates, post } from '../../utilities/AsyncFetch';
import { isSuccess, REQUESTED, success } from '../../models/Request';
import { Stringified } from '../../utilities/Strings';
import { RequestDataTable } from '../common/RequestDataTable';
import { Activity, ActivityId } from '../../models/Activity';

export function Dashboard(): JSX.Element {

  const [dataRequest, dispatchDataRequest] = useRequestReducer<WorkLog[]>();
  const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
  const [usersRequest, dispatchUsersRequest] = useRequestReducer<User[]>();
  const [tasksRequest, dispatchTasksRequest] = useRequestReducer<Task[]>();
  const [activitiesRequest, dispatchActivitiesRequest] = useRequestReducer<Activity[]>();
  const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<WorkLog>>>({});

  const getData = React.useCallback(() => {
    getWithDates("workLogs", wls => wls.map(convertWorkLogFromJson), dispatchDataRequest)
  }, [dispatchDataRequest]);

  const postDataItem = async () => {
    var success = await post("workLogs", {
      ...dataItem,
      activityId: dataItem.activityId ? parseInt(dataItem.activityId, 10) : undefined
    }, dispatchPostRequest);
    if (success) {
      dispatchDataItem({ user: dataItem.user, task: dataItem.task });
      getData();
    }
  }

  React.useEffect(getData, [getData]);
  React.useEffect(() => { get("users", dispatchUsersRequest); }, [dispatchUsersRequest])
  React.useEffect(() => { get("tasks", dispatchTasksRequest); }, [dispatchTasksRequest])
  React.useEffect(() => { get("activities", dispatchActivitiesRequest); }, [dispatchActivitiesRequest])

  const getActivityName = (activityId?: ActivityId) => {
    if (isSuccess(activitiesRequest) && activityId) {
      return activitiesRequest.data.find(a => a.id === activityId)?.name ?? "";
    }
    return "";
  }

  const stringyfiedWorklLogs = isSuccess(dataRequest)
    ? success(dataRequest.data.map(wl => {
      const stringyfiedWorklLog = stringifyWorkLog(wl)
      return {
        ...stringyfiedWorklLog,
        activityName : getActivityName(wl.activityId)    
      };}))
    : dataRequest;

  return (
    <>
      <AddWorkLogInlineForm
        disabled={postRequest.type === REQUESTED || !isSuccess(dataRequest)}
        post={postDataItem}
        dataItem={dataItem}
        setDataItem={dispatchDataItem}
        users={isSuccess(usersRequest) ? usersRequest.data : undefined}
        tasks={isSuccess(tasksRequest) ? tasksRequest.data : undefined}
        activities={isSuccess(activitiesRequest) ? activitiesRequest.data : undefined}
      />
      <RequestDataTable
        entityName="work log"
        columns={[
          { label: "#", getValue: wl => wl.id, isRowHeader: true, isRightAligned: true },
          { label: "Project", getValue: wl => wl.task!.project!.name },
          { label: "Task", getValue: wl => wl.task!.name },
          { label: "User", getValue: wl => wl.user.name },
          { label: "Date", getValue: wl => wl.date, isRightAligned: true },
          { label: "Hours", getValue: wl => wl.hours, isRightAligned: true },
          { label: "Activity", getValue: wl => wl.activityName },
        ]}
        dataRequest={stringyfiedWorklLogs}
      />
    </>
  );
}
