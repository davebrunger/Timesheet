import * as React from "react";
import { Table } from "reactstrap";
import { Request } from "../../models/Request";
import { Async } from "./Async";
import { TDataItem } from "./DataTable";

interface Props<T extends TDataItem> {
    entityName: string
    request: Request<T[]>;
    columns: {
        label: string,
        getValue: (row: T) => React.ReactNode | undefined,
        isRowHeader?: boolean
    }[]
}

export function RequestDataTable<T extends TDataItem>(props: Props<T>): JSX.Element {

    const renderTableRows = (data: T[]): JSX.Element => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan={props.columns.length}>No {props.entityName} records have been created</td>
                </tr>
            )
        }
        return (
            <>
                {data.map(t => (
                    <tr key={t.id}>
                        {props.columns.map(c => c.isRowHeader 
                            ? <th key={c.label} scope="row">{c.getValue(t)}</th> 
                            : <td key={c.label} >{c.getValue(t)}</td>)}
                    </tr>
                ))}
            </>
        );
    }

    return (
        <Table borderless striped size="sm">
            <thead>
                <tr>
                    {props.columns.map(c => <th key={c.label}>{c.label}</th>)}
                </tr>
            </thead>
            <tbody>
                <Async
                    request={props.request}
                    notRequested={() => (
                        <tr>
                            <td colSpan={props.columns.length}>Initializing...</td>
                        </tr>
                    )}
                    requested={() => (
                        <tr>
                            <td colSpan={props.columns.length}>Please wait...</td>
                        </tr>
                    )}
                    success={renderTableRows}
                    error={error => (
                        <tr>
                            <td colSpan={props.columns.length}>{error}</td>
                        </tr>
                    )}
                />
            </tbody>
        </Table>
    );
}