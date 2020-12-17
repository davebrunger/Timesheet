import { format } from "date-fns";
import React from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Activity } from "../../models/Activity";
import { Project } from "../../models/Project";
import { Request } from "../../models/Request";
import { Async } from "../common/Async";
import { ProjectActivities } from "./ProjectActivities";
import { ProjectTasks } from "./ProjectTasks";
import { ProjectUsers } from "./ProjectUsers";

interface Props {
    project: Project;
    activitiesRequest: Request<Activity[]>;
}

export function ProjectDetails(props: Props): JSX.Element {

    const workLogs = (props.project.tasks?.map(t => t.workLogs?.map(wl => { return { ...wl, task: t }; }) ?? []) ?? []).flat();

    return (
        <>
            <Form>
                <FormGroup row>
                    <Label for="name" sm={2}>Project</Label>
                    <Col sm={10}>
                        <Input plaintext id="name" value={`${props.project.name} (ID: ${props.project.id})`} readOnly />
                    </Col>
                </FormGroup>
                {props.project.dueDate
                    ? <FormGroup row>
                        <Label for="dueDate" sm={2}>Due</Label>
                        <Col sm={10}>
                            <Input plaintext id="dueDate" value={format(props.project.dueDate, "dd/MM/yyyy")} readOnly />
                        </Col>
                    </FormGroup>
                    : undefined}
            </Form>
            <Row>
                <Col>
                    <Async request={props.activitiesRequest} success={activities => <ProjectActivities workLogs={workLogs} activities={activities} />} />
                </Col>
                <Col>
                    <ProjectTasks workLogs={workLogs} />
                </Col>
                <Col>
                    <ProjectUsers workLogs={workLogs} />
                </Col>
            </Row>
        </>
    );
}