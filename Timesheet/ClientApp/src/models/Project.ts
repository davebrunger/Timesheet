import { Stringified } from "../utilities/Strings";

export type Project = {
    id: number;
    name: string;
};

export function stringify(project: Project): Stringified<Project> {
    return {
        ...project,
        id: project.id.toString()
    }
}