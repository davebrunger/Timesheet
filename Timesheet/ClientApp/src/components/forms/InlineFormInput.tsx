import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface Props
{
    id : string;
    name : string;
    label : string;
    value : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
    disabled : boolean;
}

export function InlineFormInput(props : Props): JSX.Element {
    return (
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for={props.id} className="mr-sm-2">{props.label}</Label>
          <Input id={props.id} name={props.name} bsSize="sm"  placeholder={props.label} value={props.value} onChange={props.onChange} disabled={props.disabled} />
        </FormGroup>
    );
}

