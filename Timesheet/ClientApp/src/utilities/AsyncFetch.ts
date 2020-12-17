import { Request, requested, success, requestError } from "../models/Request";
import { DatesAsStrings } from "./Dates";

async function performGet<TData, TJson>(
    apiPath: string,
    convert: (json: TJson) => TData,
    dispatch: (action: Request<TData>) => void
) {
    dispatch(requested());
    try {
        const response = await fetch(`api/${apiPath}`);
        if (response.ok) {
            dispatch(success(convert(await response.json())));
        } else {
            dispatch(requestError(response.status));
        }
    } catch (e: unknown) {
        const message =
            typeof e === "string"
                ? e
                : (e instanceof Error
                    ? e.message
                    : undefined);
        if (message) {
            dispatch(requestError(message));
        }
    }
}

export function get<TData>(apiPath: string, dispatch: (action: Request<TData>) => void) {
    return performGet<TData, TData>(apiPath, t => t, dispatch);
}

export function getWithDates<TData>(
    apiPath: string,
    convert: (json: DatesAsStrings<TData>) => TData,
    dispatch: (action: Request<TData>) => void
) {
    return performGet<TData, DatesAsStrings<TData>>(apiPath, convert, dispatch);
}

export async function post(apiPath: string, data: any, dispatch: (action: Request<void>) => void): Promise<boolean> {
    dispatch(requested());
    try {
        const response = await fetch(`api/${apiPath}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            dispatch(success(undefined));
        } else {
            dispatch(requestError(response.status));
        }
        return response.ok;
    } catch (e: unknown) {
        const message =
            typeof e === "string"
                ? e
                : (e instanceof Error
                    ? e.message
                    : undefined);
        if (message) {
            dispatch(requestError(message));
        }
        return false;
    }
}