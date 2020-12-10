import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface Props
{
    id : string;
    name : string;
    label : string;
    value? : string;
    onChange : (newValue : string) => void;
    disabled : boolean;
    type? : "number" | "date";
    min? : string;
    max? : string;
}

export function InlineFormInput(props : Props): JSX.Element {
    
    const change = (event : React.ChangeEvent<HTMLInputElement>) => props.onChange(event.currentTarget.value)

    return (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for={props.id} className="mr-sm-2">{props.label}</Label>
          <Input
            type={props.type} id={props.id} name={props.name} bsSize="sm"  placeholder={props.label} 
            value={props.value || ""} onChange={change} disabled={props.disabled}
            min={props.min} max={props.max} />
        </FormGroup>
    );
}

