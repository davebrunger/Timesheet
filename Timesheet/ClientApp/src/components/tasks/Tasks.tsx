import * as React from 'react';
import { Task } from '../../models/Task';
import { AddTaskInlineForm } from './AddTaskInlineForm';
import { DataTableWithInlineAddForm } from '../common/DataTableWithInlineAddForm';

export function Tasks(): JSX.Element {
  return (
      <DataTableWithInlineAddForm<Task>
        entityName="task"
        apiPath="tasks"
        clearDataItem={task => { return { project: task.project }; }}
        renderInlineAddForm={props => <AddTaskInlineForm {...props} /> }
        columns={[
          { label: "#", getValue: t => t.id, isRowHeader: true },
          { label: "Project", getValue: t => t.project.name },
          { label: "Name", getValue: t => t.name }
        ]} />
  );
}
