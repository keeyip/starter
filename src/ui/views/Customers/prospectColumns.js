import React from 'react';
import {Label} from 'semantic-ui-react';
import {getProspectStatusColor} from 'lib/model';

/**
  This module holds all prospects-related table columns.
**/

export const ProspectStatusColumn = {
  key: 'prospect_status',
  label: 'Status',

  /**
    Renders a label with prospect's status text,
    colored according to `getProspectStatusColor()`
  **/
  render: prospect => {
    const style = {
      backgroundColor: getProspectStatusColor(prospect),
      color: 'white'
    };

    return (
      <Label style={style}>{prospect.status}</Label>
    );
  }
};
