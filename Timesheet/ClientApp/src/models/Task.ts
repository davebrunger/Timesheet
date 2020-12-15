import { Stringified } from "../utilities/Strings";
import { stringify as stringifyProject, Project } from "./Project";

export type Task = {
    id: number;
    name: string;
    project: Project;
};

export function stringify(task : Task) : Stringified<Task> {
    return {
        ...task,
        id : task.id.toString(),
        project : stringifyProject(task.project)
    }
}