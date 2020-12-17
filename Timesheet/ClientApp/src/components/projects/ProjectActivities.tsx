import * as React from "react";
import * as d3 from "d3";
import { Activity, ActivityId } from "../../models/Activity";
import { WorkLog } from "../../models/WorkLogs";
import { groupBy } from "../../utilities/GroupBy";
import { DataTable } from "../common/DataTable";

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

    const radiusPixels = 150;
    const lineWidthPixels = 1;

    const ref = React.useRef(null);

    const activityHours = groupBy(props.workLogs, wl => wl.activityId)
        .map(kvp => {
            return {
                activityId: kvp.key,
                activityName: props.activities.find(a => a.id === kvp.key)?.name,
                hours: kvp.value.reduce((a, wl) => a + wl.hours, 0)
            };
        });

    const arcGen = d3.arc<d3.PieArcDatum<ActivityHours>>()
        .innerRadius(radiusPixels * 2 / 3)
        .outerRadius(radiusPixels - lineWidthPixels)
        .cornerRadius(5);

    //const taskHours = groupBy(props.workLogs, wl => wl.task!.id);
    //const userHours = groupBy(props.workLogs, wl => wl.user.id);

    const arcs = d3.pie<ActivityHours>().padAngle(0.02).value(a => a.hours)(activityHours);

    React.useEffect(() => {
        d3.select(ref.current)
            .select("g")
            .selectAll('whatever')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('fill',"green")
            .attr("stroke", "black")
            .style("stroke-width", `${lineWidthPixels}px`)
            .style("opacity", 0.7);
    }, [arcGen, arcs]);

    return (
        <>
            <DataTable
                entityName="arcs"
                data={arcs.map((a, i) => { return { ...a, id: a.index }; })}
                columns={[
                    { label: "Activity ID", getValue: a => a.data.activityId, isRowHeader: true },
                    { label: "Activity Name", getValue: a => a.data.activityName },
                    { label: "Start Angle", getValue: a => a.startAngle },
                    { label: "End Angle", getValue: a => a.endAngle },
                ]} />
            <svg className="container" ref={ref}
                width={radiusPixels * 2} height={radiusPixels * 2}>
                <g transform={`translate(${radiusPixels},${radiusPixels})`}></g>
            </svg>
        </>
    );
}