import * as React from "react";

export function useAsyncEffect<T>(asyncEffect: () => Promise<T>, deps : React.DependencyList | undefined) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => { asyncEffect(); }, deps); 
}