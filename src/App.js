import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Reports from "./Reports";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const currentDate = new Date();
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Metrics Report</h2>
          </div>
          <p className="App-intro">As of {currentDate.toDateString()}</p>
          <Reports />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
