import * as React from 'react';
import { format } from 'date-fns';
import { convertFromJson, WorkLog } from '../../models/WorkLogs';
import { AddWorkLogInlineForm } from './AddWorkLogInlineForm';
import { DataTableWithInlineAddForm } from '../common/DataTableWithInlineAddForm';
import { DatesAsStrings } from '../../utilities/Dates';

export function Dashboard(): JSX.Element {
  return (
    <DataTableWithInlineAddForm<DatesAsStrings<WorkLog>>
      entityName="work log"
      apiPath="workLogs"
      clearDataItem={workLog => { return { task: workLog.task, user: workLog.user }; }}
      renderInlineAddForm={props => <AddWorkLogInlineForm {...props} />}
      columns={[
        { label: "#", getValue: wl => wl.id, isRowHeader: true },
        { label: "Project", getValue: wl => wl.task.project.name },
        { label: "Task", getValue: wl => wl.task.name },
        { label: "User", getValue: wl => wl.user.name },
        { label: "Date", getValue: wl => format(convertFromJson(wl).date, "dd/MM/yyyy") },
        { label: "Hours", getValue: wl => wl.hours },
      ]} />
  );
}
