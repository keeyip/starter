import React from 'react';
import {Card} from 'semantic-ui-react';

export default function({header, meta, description}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header content={header} />
        {meta && <Card.Meta content={meta} />}
        {description && <Card.Description content={description} />}
      </Card.Content>
    </Card>
  );
}
