import { DatesAsStrings } from "../utilities/Dates";
import { convertTaskFromJson, stringifyTask, Task } from "./Task";
import { stringifyUser, User } from "./User";
import { ActivityId } from "./Activity";
import { Stringified } from "../utilities/Strings";
import { format } from "date-fns";

export type WorkLog = {
    id: number;
    task?: Task;
    user: User;
    activityId?: ActivityId;
    date: Date;
    hours: number;
}

export function stringifyWorkLog(workLog: WorkLog): Stringified<WorkLog> {
    return {
        ...workLog,
        id: workLog.id.toString(),
        date: format(workLog.date, "dd/MM/yyyy"),
        task : workLog.task ? stringifyTask(workLog.task) : undefined,
        user : stringifyUser(workLog.user),
        activityId : workLog.activityId?.toString(),
        hours : workLog.hours?.toFixed()
    }
}

export function convertWorkLogFromJson(json: DatesAsStrings<WorkLog>): WorkLog {
    return {
        ...json,
        date: new Date(json.date),
        task: json.task ? convertTaskFromJson(json.task) : undefined
    }
}