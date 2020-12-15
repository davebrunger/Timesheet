import { ERROR, NOT_REQUESTED, Request, REQUESTED, SUCCESS } from "../../models/Request";

interface Props<T> {
    request: Request<T>
    notRequested?: () => JSX.Element | null;
    requested?: () => JSX.Element | null;
    success?: (data: T) => JSX.Element | null;
    error?: (error: string | number) => JSX.Element | null;
}

export function Async<T>(props: Props<T>): JSX.Element | null {
    switch (props.request.type) {
        case NOT_REQUESTED:
            if (!props.notRequested) {
                return null;
            }
            return props.notRequested();
        case REQUESTED:
            if (!props.requested) {
                return null;
            }
            return props.requested();
        case SUCCESS:
            if (!props.success) {
                return null;
            }
            return props.success(props.request.data);
        case ERROR:
            if (!props.error) {
                return null;
            }
            return props.error(props.request.error);
        default:
            if (!props.error) {
                return null;
            }
            return props.error("Invalid Request");
    }
}