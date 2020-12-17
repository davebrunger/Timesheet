import { format } from "date-fns";
import { DatesAsStrings } from "../utilities/Dates";
import { Stringified } from "../utilities/Strings";
import { stringifyTask, convertTaskFromJson, Task } from "./Task";

export type Project = {
    id: number;
    name: string;
    dueDate?: Date;
    tasks?: Task[]
};

export function stringifyProject(project: Project): Stringified<Project> {
    return {
        ...project,
        id: project.id.toString(),
        dueDate: project.dueDate ? format(project.dueDate, "dd/MM/yyyy") : undefined,
        tasks: project.tasks?.map(stringifyTask)
    }
}

export function convertProjectFromJson(json: DatesAsStrings<Project>): Project {
    return {
        ...json,
        dueDate: json.dueDate ? new Date(json.dueDate) : undefined,
        tasks : json.tasks?.map(convertTaskFromJson)
    };
}