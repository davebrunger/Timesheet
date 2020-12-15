export const NOT_REQUESTED = "NOT_REQUESTED";

export const REQUESTED = "REQUESTED";

export const SUCCESS = "SUCCESS";

export const ERROR = "ERROR";

type NotRequested = { type: typeof NOT_REQUESTED }

type Requested = { type: typeof REQUESTED }

type Success<T> = { type: typeof SUCCESS, data: T }

type RequestError = { type: typeof ERROR, error: number | string }

export type Request<TData> = NotRequested | Requested | Success<TData> | RequestError

export function notRequested(): NotRequested { return { type: NOT_REQUESTED } };

export function requested(): Requested { return { type: REQUESTED } };

export function success<T>(data: T): Success<T> { return { type: SUCCESS, data: data } };

export function requestError(error: number | string): RequestError { return { type: ERROR, error: error } };

export function isSuccess<TData>(request: Request<TData>): request is Success<TData> {
    return request.type === SUCCESS;
}

export function isError<TData>(request: Request<TData>): request is RequestError {
    return request.type === ERROR;
}

export function isComplete<TData>(request: Request<TData>): request is Success<TData> | RequestError {
    return isSuccess(request) || isError(request);
}