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
    onChange: (newValue: T | undefined) => void;
    disabled: boolean;
    options: T[] | undefined;
    isNoSelectionAllowed? : boolean;
}

export function InlineFormSelect<T extends Option>(props: Props<T>): JSX.Element {

    const [initialized, setInitialized] = React.useState(false)

    if (props.options && !initialized) {
        if(props.options.length > 0 && !props.isNoSelectionAllowed) {
            props.onChange(props.options[0]);
        }
        setInitialized(true);
    }

    const options = props.options?.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
    if (props.isNoSelectionAllowed) {
        options?.unshift(<option key={null} value=""></option>)
    }

    const change = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!props.options || (props.options.length < 1 && !props.isNoSelectionAllowed)) {
            return;
        }
        const newValue = props.options.find(o => o.id === event.currentTarget.value);
        if (newValue || props.isNoSelectionAllowed) {
            props.onChange(newValue);
        };
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

