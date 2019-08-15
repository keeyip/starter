import React from 'react';
import {Label, Icon} from 'semantic-ui-react';

/**
  Just a simple pill with a delete button.

  @required
  @prop label: string

  @optional If omitted, 'blue'
  @prop color: string

  @optional If omitted, the delete button is hidden.
  @prop onDelete: () => void
**/
export default function Pill(props) {
  const color = props.color || 'blue';

  return (
    <Label color={color} onClick={props.onDelete}>
      {props.label}

      {props.onDelete && <Icon name='delete' />}
    </Label>
  );
}
