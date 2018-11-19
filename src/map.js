/* global google */

import React,{Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps";

const mapStyles = require("./mapStyles.json");
/* Initiate base settings for google map object including base zoom and center point */
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
/* Initiate base settings for marker information and provide venue information from foursquare API via an infowindow when the marker is opened by click */
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
        {marker.isOpen &&(
        <InfoWindow>
        <React.Fragment>
        <h2 tabIndex="4">{venueInfo.name != undefined ? venueInfo.name : "Foursquare load issue"}</h2>
          <p tabIndex="4">{venueInfo.location.address != undefined ? venueInfo.location.address : "Foursquare load issue"}</p>
          <a href={`${venueInfo.canonicalUrl != undefined ? venueInfo.canonicalUrl : "Foursquare load issue"}`}><img tabIndex="4" style={{width:125, height:10}}src={require('./fs.png')} alt={"Foursquare attribute"}/></a>
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
      tabIndex="-1"
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAjtvbvM08TzCn66vzA4eD1W6HSLS1lOZk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width:`100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />)
  }
}
