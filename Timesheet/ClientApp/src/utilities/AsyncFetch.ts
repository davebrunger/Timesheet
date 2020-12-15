import { Request, requested, success, requestError } from "../models/Request";

export async function get<TData>(apiPath: string, dispatch: (action: Request<TData>) => void) {
    dispatch(requested());
    try {
        const response = await fetch(`api/${apiPath}`);
        if (response.ok) {
            dispatch(success(await response.json()));
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