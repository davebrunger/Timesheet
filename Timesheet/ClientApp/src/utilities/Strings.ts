import { type } from "os";

export type Stringified<T> = {
    [K in keyof T]: T[K] extends Date
        ? string
        : (T[K] extends object
            ? Stringified<T[K]>
            : string)
};