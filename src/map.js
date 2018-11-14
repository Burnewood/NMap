/* global google */

import React,{Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";

const mapStyles = require("./mapStyles.json");
const MyMapComponent = withScriptjs(
  withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={14}
    zoom={props.zoom}
    defaultCenter={{lat: 43.897545, lng: -78.942932}}
    defaultOptions={{ styles: mapStyles,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false }}
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
         options={{icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
         >
        {marker.isOpen && venueInfo.bestPhoto &&(
        <InfoWindow>
        <React.Fragment>
        <h2>{venueInfo.name}</h2>
          <p>{venueInfo.location.address}</p>
          <a href={`${venueInfo.canonicalUrl}`}><img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={`${venueInfo.name}`}/></a>
          <img style={{width:125, height:10}}src={require('./fs.png')} alt={"Foursquare attribute"}/>
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
      containerElement={<div style={{ height: `100%`, width:`100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />)
  }
}
