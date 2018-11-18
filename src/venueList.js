import React,{Component} from "react";
import ListItem from './listItem';

export default class VenueList extends Component{
  render(){
    /*Inside the sidebar and below the search bar, display the following list of venues via the listItem component*/
    return(
        <ul tabIndex="3" className="venueList">
          {this.props.venues && this.props.venues.map((venue,idx) => (
          <ListItem key={idx} {...venue} handleListItemClick={this.props.handleListItemClick}/>
        ))}
        </ul>
    );
  }
}
