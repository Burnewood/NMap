import React, { Component } from 'react';
import './App.css';
import Map from "./map.js";
import SquareAPI from "./squareApi.js";

class App extends Component {
  componentDidMount(){
    SquareAPI.search({
      near: "Whitby, ON",
      query: "bookstore",
      limit: 5
    }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
