import * as React from "react";
import { useParams } from "react-router";
import { Activity } from "../../models/Activity";
import { convertProjectFromJson, Project } from "../../models/Project";
import { get, getWithDates } from "../../utilities/AsyncFetch";
import { useRequestReducer } from "../../utilities/Reducers";
import { Async } from "../common/Async";
import { ProjectDetails } from "./ProjectDetails";

export function ProjectDetailsPage(): JSX.Element {
    const [dataRequest, dispatchDataRequest] = useRequestReducer<Project>();
    const [activitiesRequest, dispatchActivitiesRequest] = useRequestReducer<Activity[]>();

    const { id } = useParams<{ id: string }>();

    const getData = React.useCallback(() => {
        getWithDates(`projects/${id}`, convertProjectFromJson, dispatchDataRequest)
    }, [dispatchDataRequest, id]);

    React.useEffect(getData, [getData, id])
    React.useEffect(() => { get("activities", dispatchActivitiesRequest); }, [dispatchActivitiesRequest])

    return (
        <Async
            request={dataRequest}
            success={project => <ProjectDetails project={project} activitiesRequest={activitiesRequest} />}
        />
    );
}