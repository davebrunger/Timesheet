import * as React from "react";
import * as d3 from "d3";
import { Activity, ActivityId } from "../../models/Activity";
import { WorkLog } from "../../models/WorkLogs";
import { groupBy } from "../../utilities/GroupBy";
import { Pie } from "../common/Pie";

interface Props {
    workLogs: WorkLog[];
    activities: Activity[];
}

interface ActivityHours {
    activityId?: ActivityId,
    activityName?: string,
    hours: number
}

export function ProjectActivities(props: Props): JSX.Element {

    const activityHours = groupBy(props.workLogs, wl => wl.activityId)
        .map(kvp => {
            return {
                label: props.activities.find(a => a.id === kvp.key)?.name ?? "",
                value: kvp.value.reduce((a, wl) => a + wl.hours, 0)
            };
        });

    return (
        <>
            <h6>Activities</h6>
            <Pie radiusInPixels={150} lineWidthInPixels={1} data={activityHours} colorScheme={d3.schemeGreys} />
        </>
    );
}