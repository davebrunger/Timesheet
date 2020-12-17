import * as React from 'react';
import { format } from 'date-fns';
import { AddProjectInlineForm } from './AddProjectInlineForm';
import { useBasicReducer, useRequestReducer } from '../../utilities/Reducers';
import { getWithDates, post } from '../../utilities/AsyncFetch';
import { isSuccess, REQUESTED } from '../../models/Request';
import { Stringified } from '../../utilities/Strings';
import { RequestDataTable } from '../common/RequestDataTable';
import { convertProjectFromJson, Project } from '../../models/Project';
import { Link } from 'react-router-dom';

export function Projects(): JSX.Element {

  const [dataRequest, dispatchDataRequest] = useRequestReducer<Project[]>();
  const [postRequest, dispatchPostRequest] = useRequestReducer<void>();
  const [dataItem, dispatchDataItem] = useBasicReducer<Partial<Stringified<Project>>>({});

  const getData = React.useCallback(() => { 
    getWithDates("projects", ps => ps.map(convertProjectFromJson), dispatchDataRequest) 
  }, [dispatchDataRequest]);

  const postDataItem = async () => {
    var success = await post("projects", dataItem, dispatchPostRequest);
    if (success) {
      dispatchDataItem({});
      getData();
    }
  }

  React.useEffect(getData, [getData]);

  return (
    <>
      <AddProjectInlineForm
        disabled={postRequest.type === REQUESTED || !isSuccess(dataRequest)}
        post={postDataItem}
        dataItem={dataItem}
        setDataItem={dispatchDataItem}
      />
      <RequestDataTable
        entityName="work log"
        columns={[
          { label: "#", getValue: p => <Link to={`/projects/${p.id}`}>{p.id}</Link>, isRowHeader: true, isRightAligned: true },
          { label: "Project", getValue: p => p.name },
          { label: "Due Date", getValue: p => p.dueDate ? format(p.dueDate, "dd/MM/yyyy") : undefined, isRightAligned: true },
        ]}
        dataRequest={dataRequest}
      />
    </>
  );
}
