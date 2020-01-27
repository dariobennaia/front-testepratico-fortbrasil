import React from 'react';
import './style.css';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from 'react-google-maps';

class ShopsListMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: {},
      info: false
    };
  }

  toggleInfo = () => {
    const { info } = this.state;
    this.setState({
      info: !info
    });
  };

  render() {
    const { shops = [], radius = {}, currentPosition = {} } = this.props;// eslint-disable-line

    const { info } = this.state;
    const myLocation = {
      lat: currentPosition.latitude,
      lng: currentPosition.longitude
    };

    const myLocationIcon = new window.google.maps.MarkerImage(
      '/me-ico.png',
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(40, 40)
    );

    const shopIcon = new window.google.maps.MarkerImage(
      '/shop-ico.png',
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(40, 40)
    );

    const MapWithAMarker = withGoogleMap(props => (
      <GoogleMap defaultZoom={12} defaultCenter={myLocation}>
        {props.children}
      </GoogleMap>
    ));

    return (
      <MapWithAMarker
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
        <Marker position={myLocation} icon={myLocationIcon}>
          {radius.showRadius && (
            <Circle
              defaultCenter={myLocation}
              radius={radius.distance}
              options={{ strokeColor: { strokeColor: radius.strokeColor } }}
            />
          )}
        </Marker>
        {shops.map(shop => (
          <Marker
            key={shop._id}
            position={{
              lat: shop.location.coordinates[1],
              lng: shop.location.coordinates[0]
            }}
            icon={shopIcon}
            onClick={this.toggleInfo}
          >
            {info && (
              <InfoWindow>
                <div style={{ color: 'black' }}>Shop {shop.name}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </MapWithAMarker>
    );
  }
}

export default ShopsListMaps;
