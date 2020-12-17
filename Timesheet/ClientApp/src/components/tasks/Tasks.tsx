import * as React from 'react';
import { Task } from '../../models/Task';
import { AddTaskInlineForm } from './AddTaskInlineForm';
import { useBasicReducer, useRequestReducer } from '../../utilities/Reducers';
import { convertProjectFromJson, Project } from '../../models/Project';
import { get, post } from '../../utilities/AsyncFetch';
import { isSuccess, REQUESTED } from '../../models/Request';
import { Stringified } from '../../utilities/Strings';
import { RequestDataTable } from '../common/RequestDataTable';
import { DatesAsStrings } from '../../utilities/Dates';

export function Tasks(): JSX.Element {

  const [dataRequest, dispatchDataRequest] = useRequestReducer<Task[]>();
  const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
  const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<Task>>>({});
  const [projectsRequest, dispatchProjectsRequest] = useRequestReducer<DatesAsStrings<Project>[]>();

  const getData = React.useCallback(() => { get("tasks", dispatchDataRequest) }, [dispatchDataRequest]);

  const postDataItem = async () => {
    var success = await post("tasks", dataItem, dispatchPostRequest);
    if (success) {
      dispatchDataItem({ project: dataItem.project });
      getData();
    }
  }

  React.useEffect(getData, [getData]);
  React.useEffect(() => { get("projects", dispatchProjectsRequest); }, [dispatchProjectsRequest]);

  return (
    <>
      <AddTaskInlineForm
        disabled={postRequest.type === REQUESTED || !isSuccess(dataRequest)}
        post={postDataItem}
        dataItem={dataItem}
        setDataItem={dispatchDataItem}
        projects={isSuccess(projectsRequest) ? projectsRequest.data.map(convertProjectFromJson) : undefined}
      />
      <RequestDataTable
        entityName="task"
        columns={[
          { label: "#", getValue: t => t.id, isRowHeader: true, isRightAligned: true },
          { label: "Project", getValue: t => t.project!.name },
          { label: "Name", getValue: t => t.name }
        ]}
        dataRequest={dataRequest}
      />
    </>
  );
}
