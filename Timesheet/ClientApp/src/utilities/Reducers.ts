import * as React from "react";
import { Request, notRequested } from "../models/Request";

export function useBasicReducer<T>(initialValue: T) {
    return React.useReducer((_: T, action: T) => action, initialValue);
}

export function useRequestReducer<T>() {
    return useBasicReducer<Request<T>>(notRequested())
}