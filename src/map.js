/* global google */

import React,{Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={13}
    zoom={props.zoom}
    defaultCenter={{ lat: 43.838413, lng: -79.086761 }}
  >
    {props.markers &&
      props.markers.filter(marker=>marker.isVisible).map((marker,idx)=>{
        const venueInfo = props.venues.find(venue => venue.id===marker.id);
      return (
         <Marker
       key={idx}
        position={{ lat: marker.lat, lng: marker.lng }}
         onClick={()=>props.handleMarkerClick(marker)}
         animation={marker.isOpen === true ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
         >
        {marker.isOpen && venueInfo.bestPhoto &&(
        <InfoWindow>
        <React.Fragment>
        <h1>{venueInfo.name}</h1>
          <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={`{venueInfo.name}`}/>
          </React.Fragment>
        </InfoWindow>
      )}
      </Marker>
    );
  })}
  </GoogleMap>
))
);
export default class Map extends Component{
  render(){
    return(<MyMapComponent
      {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAjtvbvM08TzCn66vzA4eD1W6HSLS1lOZk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width:`75%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />)
  }
}
