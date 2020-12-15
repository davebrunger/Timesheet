import * as React from "react";
import { Request, notRequested, isSuccess } from "../models/Request";

export function useBasicReducer<T>(initialValue: T) {
    return React.useReducer((_: T, action: T) => action, initialValue);
}

export function useRequestReducer<T>(onSuccess?: (data: T) => void) {
    const reducer = (_: Request<T>, action: Request<T>) => {
        if (isSuccess(action) && onSuccess) {
            onSuccess(action.data);        
        }
        return action;
    };
    return React.useReducer(reducer, notRequested());
}