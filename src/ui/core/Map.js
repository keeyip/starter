import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";

/**
  Just a simple map of the US with optional circular markers.
  Responsively scales up to 800px in width, scales down proportionately.

  // Centers the map to this coordinate
  @optional
  @prop center: [longitude, latitude]

  // A list of circular markers
  @optional
  @prop markers: [
    {
      @required
      @member key: React key for this marker

      @required
      @member coordinates: [longitude, latitude]

      @optional If omitted, black
      @member color: CSS-compatible color string

      @optional If omitted, 8
      @member radius
    },
    ...
  ]
**/
export default function Map(props) {
  const containerMaxWidth = 800;

  const mapScale = 1000;

  const landscapeStrokeColor = 'hsl(200,5%,50%)';
  const landscapeStrokeWidth = 0.5;

  const defaultMarkerColor = 'black';
  const defaultMarkerRadius = 8;
  const markerStroke = 'white';
  const markerStrokeWidth = 1.2;

  return (
    <div style={{maxWidth: containerMaxWidth, margin: '0 auto'}}>
      <ComposableMap
        projectionConfig={{scale: mapScale}}
        width={mapScale} height={mapScale}
        style={{width: '100%', height: 'auto'}}
      >
        <ZoomableGroup center={props.center} disablePanning>

          {/* Topology is hard-coded for now, loaded async at runtime */}
          <Geographies geography={"/usa_states_topo.json"}>

            {(geographies, projection) => geographies.map(geography => {
              const geoStyle = {
                fill: "transparent",
                stroke: landscapeStrokeColor,
                strokeWidth: landscapeStrokeWidth,
                outline: "none",
              };
              return (
                <Geography
                  key={geography.properties.ID_1}
                  cacheId={geography.properties.ID_1}
                  geography={geography}
                  projection={projection}
                  style={{default: geoStyle, hover: geoStyle, pressed: geoStyle}}
                  tabable={false}
                />
              );
            })}
          </Geographies>

          {props.markers && (
            <Markers>
              {props.markers.map(marker => {
                const markerStyle = {
                  fill: marker.color || defaultMarkerColor,
                  stroke: markerStroke,
                  strokeWidth: markerStrokeWidth,
                };

                const radius = marker.radius || defaultMarkerRadius;

                return (
                  <Marker
                    key={marker.key}
                    marker={{coordinates: marker.coordinates}}
                    style={{default: markerStyle, hover: markerStyle, pressed: markerStyle}}
                    tabable={false}
                  >
                    <circle cx={0} cy={0} r={radius} />
                  </Marker>
                );
              })}
            </Markers>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
