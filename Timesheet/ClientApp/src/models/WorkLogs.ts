import { DatesAsStrings } from "../utilities/Dates";
import { Task } from "./Task";
import { User } from "./User";

export type WorkLog = {
    id: number;
    task: Task;
    user: User;
    date: Date;
    hours: number;
}

export function convertFromJson(json: DatesAsStrings<WorkLog>): WorkLog {
    return {
        ...json,
        date: new Date(json.date)
    }
}