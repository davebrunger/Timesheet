import { Stringified } from "../utilities/Strings";

export enum ActivityId {
    Plan = 1,
    Design,
    Development,
    Test
}

export type Activity = {
    id: ActivityId;
    name: string;
};

export function stringifyActivity(activity : Activity) : Stringified<Activity> {
    return {
        ...activity,
        id : activity.id.toString(),
    }
}