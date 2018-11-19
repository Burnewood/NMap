
import React, { Component } from 'react';
import './App.css';
import Map from "./map.js";
import SquareAPI from "./squareApi.js";
import SideBar from './sideBar';

class App extends Component {
  constructor(){
    super();
    this.state={
      venues:[],
      markers:[],
      center:[],
      zoom:13,
      updateSuperState: obj=>{
        this.setState(obj);
      }
    };
  }
  /* function to close all open markers (effectively removes the visable infowindow and stops the bounce animation) */
  closeAllMarkers = () =>{
      const markers = this.state.markers.map(marker=>{
        marker.isOpen = false;
        return marker;
      });
      this.setState({markers: Object.assign(this.state.markers,markers)});
  } ;
/* closes all markers upon clicking 1 of them so multiple infowindows do not display at once*/
  handleMarkerClick = marker =>{
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers:Object.assign(this.state.markers,marker)});
/* gathers information from foursquare api upon clicking the marker, to pass said information to other components*/
    const venue =  this.state.venues.find(venue => venue.id === marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res=>{
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues:Object.assign(this.state.venues, newVenue)});
    });
  };
  /* allow clicking list items to activate map marker infowindow and animation */
  handleListItemClick = venue =>{
    const marker = this.state.markers.find(marker => marker.id=== venue.id);
    this.handleMarkerClick(marker);
  }
  /* use foursquare api to search for venues of specified query near specified locaiton*/
  componentDidMount(){
    SquareAPI.search({
      near: "Whitby,ON",
      query: "burger",
      limit: 10
    }).then(results =>{
        /* provide information from foursquare results for other components to use and display*/
      const {venues} = {results.response != null ? results.response : "Foursquare load issue"};
      const {center} = {results.response.geocode.feature.geometry != null ? results.response.geocode.feature.geometry : "Foursquare load issue"};
      const markers = venues.map(venue =>{
        return{
          lat:venue.location.lat,
          lng:venue.location.lng,
          isOpen:false,
          isVisible:true,
          id:venue.id
        };
      });
      this.setState({venues,center,markers});
    });
  }
  /* render map and sidebar components in section below header */
  render() {
    return (
      <section className="App">
      <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
      </section>
    );
  }
}

export default App;
