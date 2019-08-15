import React from 'react';
import Map from 'ui/core/Map';
import {HoustonCoordinates} from 'samples/geo';
import {getProspectStatusColor} from 'lib/model';

/**
  Draws prospects on a map with colored markers to indicate funnel status.
  The map is centered at Houston, TX, which is more or less the bottom-middle of the US.

  @required
  @prop prospects
**/
export default function ProspectsMap(props) {
  const markers = props.prospects.map(prospect => {
    const color = getProspectStatusColor(prospect);

    return {
      key: prospect.uuid,
      coordinates: prospect.location.coordinates,
      color
    };
  });

  return <Map center={HoustonCoordinates} markers={markers} />;
}
