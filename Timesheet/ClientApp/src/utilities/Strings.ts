import { type } from "os";

export type Stringified<T> = {
    [K in keyof T]: T[K] extends Date
        ? string
        : (T[K] extends Date | undefined
            ? string | undefined
            : (T[K] extends object
                ? Stringified<T[K]>
                : (T[K] extends object | undefined
                    ? Stringified<T[K]> | undefined
                    : string)))
};