import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface Option {
    id: string;
    name: string;
}

interface Props<T extends Option> {
    id: string;
    label: string;
    valueId?: string;
    onChange: (newValue: T) => void;
    disabled: boolean;
    options: T[] | undefined;
}

export function InlineFormSelect<T extends Option>(props: Props<T>): JSX.Element {

    if (props.options && props.options.length > 0 && !props.valueId) {
        props.onChange(props.options[0]);
    }

    const options = props.options?.map(o => <option key={o.id} value={o.id}>{o.name}</option>)

    const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!props.options || props.options.length < 1) {
            return;
        }
        const newValue = props.options.filter(o => o.id === event.currentTarget.value)[0];
        props.onChange(newValue);
    };

    return (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for={props.id} className="mr-sm-2">{props.label}</Label>
            <Input
                type="select" id={props.id} name={props.id} bsSize="sm" placeholder={props.label}
                value={props.valueId} onChange={change} disabled={props.disabled}>
                {options}
            </Input>
        </FormGroup>
    );
}

