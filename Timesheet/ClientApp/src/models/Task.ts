export type Task = {
    id: number;
    name: string;
    project: {
        id: number;
        name: string;
    }
};