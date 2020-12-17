import { DatesAsStrings } from "../utilities/Dates";
import { Stringified } from "../utilities/Strings";
import { stringifyProject, convertProjectFromJson, Project } from "./Project";
import { convertWorkLogFromJson, stringifyWorkLog, WorkLog } from "./WorkLogs";

export type Task = {
    id: number;
    name: string;
    project?: Project;
    workLogs? : WorkLog[];
};

export function stringifyTask(task : Task) : Stringified<Task> {
    return {
        ...task,
        id : task.id.toString(),
        project : task.project ? stringifyProject(task.project) : undefined,
        workLogs: task.workLogs?.map(stringifyWorkLog)
    }
}

export function convertTaskFromJson(json: DatesAsStrings<Task>): Task {
    return {
        ...json,
        project: json.project ? convertProjectFromJson(json.project) : undefined,
        workLogs: json.workLogs?.map(convertWorkLogFromJson)
    };
}