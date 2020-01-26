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

  componentDidMount() {
    this.handleCurrentPosition();
  }

  handleCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({ myLocation: { lat: latitude, lng: longitude } });
    });
  };

  toggleInfo = () => {
    const { info } = this.state;
    this.setState({
      info: !info
    });
  };

  render() {
    const { shops = [], radius = {} } = this.props;// eslint-disable-line

    const { myLocation, info } = this.state;

    const myLocationIcon = new window.google.maps.MarkerImage(
      'https://static.thenounproject.com/png/607183-200.png',
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(40, 40)
    );

    const shopIcon = new window.google.maps.MarkerImage(
      'https://cdn.icon-icons.com/icons2/606/PNG/512/shop-store-frontal-building_icon-icons.com_56118.png',
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
