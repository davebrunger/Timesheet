import * as React from "react";
import { Table } from "reactstrap";

export interface TDataItem {
    id: string | number;
}

interface Props<T extends TDataItem> {
    entityName: string
    data?: T[];
    columns: {
        label: string,
        getValue: (row: T) => React.ReactNode | undefined,
        isRowHeader?: boolean
    }[]
}

export function DataTable<T extends TDataItem>(props: Props<T>): JSX.Element {

    const renderTableRows = () => {
        if (!props.data) {
            return (
                <tr>
                    <td colSpan={props.columns.length}>Please wait...</td>
                </tr>
            )
        }
        if (props.data.length === 0) {
            return (
                <tr>
                    <td colSpan={props.columns.length}>No {props.entityName} records have been created</td>
                </tr>
            )
        }
        return props.data.map(t => (
            <tr key={t.id}>
                {props.columns.map(c => c.isRowHeader ? <th scope="row">{c.getValue(t)}</th> : <td>{c.getValue(t)}</td>)}
            </tr>
        ))
    };

    return (
        <Table borderless striped size="sm">
            <thead>
                <tr>
                    {props.columns.map(c => <td key={c.label}>{c.label}</td>)}
                </tr>
            </thead>
            <tbody>
                {renderTableRows()}
            </tbody>
        </Table>
    );
}