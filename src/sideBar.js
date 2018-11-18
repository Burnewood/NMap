import React,{Component} from "react";
import VenueList from './venueList';
import { slide as Menu } from 'react-burger-menu';

export default class SideBar extends Component{
  constructor(){
    super();
    this.state ={
      query:"",
      venues:[]
    };
  }
  showSettings (event){
    event.preventDefault();
  };
/*Change venue names to lowercase for the sake of using the filter search bar, trim available venues by filtered value*/
  handleFilterVenues= ()=>{
    if(this.state.query.trim()!== ""){
      const venues = this.props.venues.filter(venue => venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase()))
        return venues;
    }
    return this.props.venues;
  };
  /*Use above filter of venues to filter out visible markers based on same filtered search bar*/
  handleChange = e =>{
    this.setState({query:e.target.value});
    const markers = this.props.venues.map(venue=>{
      const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if(isMatched){
        marker.isVisible = true;
      } else{
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({markers});
  };
  render(){
    /*Inside the sidebar display the filter search bar, a foursquare attribrutation, and the venueList component*/
    return(
    <Menu role="Navigation" className="sidebar" width={200}>
        <input role="Search" tabIndex="2" type={"search"} id={"search"} placeholder={"Filter Locations"} onChange={this.handleChange}/>
        <img tabIndex="2" src={require('./fs.png')} alt={"Foursquare attribute"}/>
        <VenueList
        {...this.props}
        venues={this.handleFilterVenues()}
        handleListItemClick={this.props.handleListItemClick}/>
    </Menu>
    )
  }
}
