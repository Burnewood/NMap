import React,{Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 43.879840, lng: -78.942210 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 43.887890, lng: -78.944820 }} />}
  </GoogleMap>
))

export default class Map extends Component{
  render(){
    return(<MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAjtvbvM08TzCn66vzA4eD1W6HSLS1lOZk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `800px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />)
  }
}
