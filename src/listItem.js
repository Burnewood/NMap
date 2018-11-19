import React,{Component} from "react";

export default class ListItem extends Component{
  render(){
    /*For each venue loaded from the foursquare api, provide a clickable list item of the venue's name*/
    return(
      <li tabIndex="3" role="button" className="listItem"
          onClick={() => this.props.handleListItemClick(this.props)}>
        {this.props.name}
      </li>
    )
  }
}
