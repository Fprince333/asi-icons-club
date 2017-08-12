import React, { Component } from "react";
import axios from "axios";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Card } from "material-ui/Card";

import Header from "./list/header";

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { prospect: [""], total_results: "Loading..." },
      leader: "Loading...",
      totalOrders: "Loading...",
      gaData: {}
    };
  }

  componentDidMount() {
    axios
      .get("https://icons-club-metrics.herokuapp.com/analytics")
      .then(response => {
        this.setState({ gaData: response.data })
      });
    axios
      .get("https://icons-club-metrics.herokuapp.com/orders")
      .then(response => {
        this.setState({ totalOrders: response.data.total_orders });
      });
    axios
      .get("https://icons-club-metrics.herokuapp.com/members")
      .then(response => {
        this.setState({ data: response.data });
        let leaders = [];
        let leaderboard = {};
        this.state.data.prospect.map(prospect => {
          return Object.keys(prospect).map(key => {
            switch (key) {
              case "Account_Executive":
                return leaders.push(prospect[key]);

              default:
                return null;
            }
          });
        });
        for (var index = 0; index < leaders.length; index++) {
          var num = leaders[index];
          leaderboard[num] = leaderboard[num] ? leaderboard[num] + 1 : 1;
        }
        if (Object.keys(leaderboard).length > 0) {
          let leadersArray = Object.keys(leaderboard).map(
            key => leaderboard[key]
          );
          let leader = Object.keys(leaderboard).find(
            key => leaderboard[key] === leadersArray.sort((a, b) => { return b - a })[0]
          );
          this.setState({ leader: leader, leaderTotal: leaderboard[leader] });
        }
      });
  }

  showUsers() {
    Array.from(document.getElementsByClassName("usersTable")).map(table => {
      return (table.style.display = "table");
    });
  }

  sortByColumn(event) {
    const sortProperty = event.target.dataset.id;
    const sortedData = this.state.data.prospect.sort(function (a, b) {
      if (a[sortProperty] && b[sortProperty]) {
        let typeA = a[sortProperty].toUpperCase();
        let typeB = b[sortProperty].toUpperCase();
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
      }
      return 0;
    });
    this.setState({
      data: {
        prospect: sortedData,
        total_results: this.state.data.total_results
      }
    });
  }

  render() {
    const totalMembers = this.state.data.prospect.length > 1
      ? this.state.data.total_results -
      this.state.data.prospect.filter(member =>
        member.company.includes("Architectural Systems")
      ).length
      : "Loading...";

    const body = this.state.data.prospect.length > 1
      ? this.state.data.prospect
        .filter(member => !member.company.includes("Architectural Systems"))
        .map(prospect => {
          let rowBody = Object.keys(prospect).map(key => {
            switch (key) {
              case "first_name":
                return (
                  <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>
                );

              case "last_name":
                return (
                  <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>
                );

              case "company":
                return (
                  <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>
                );

              case "job_title":
                return (
                  <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>
                );

              case "Account_Executive":
                return (
                  <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>
                );

              default:
                return null;
            }
          });
          return (
            <TableRow key={prospect.id ? prospect.id : 42}>
              {rowBody}
            </TableRow>
          );
        })
      : null;
    const sessionMinutes = this.state.gaData.totalsForAllResults ? ((this.state.gaData.totalsForAllResults['ga:sessionDuration'] / this.state.gaData.totalsForAllResults['ga:sessions']) / 60).toString().split(".")[0] : null
    const sessionSeconds = this.state.gaData.totalsForAllResults ? ((this.state.gaData.totalsForAllResults['ga:sessionDuration'] / this.state.gaData.totalsForAllResults['ga:sessions']) / 60).toString().split(".")[1].substring(0, 2) : null
    const paperStyle = {
      height: 150,
      width: 150,
      margin: "0 auto",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      cursor: "pointer"
    };
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <h2>Total Users </h2>
            <Paper
              style={paperStyle}
              zDepth={3}
              circle={true}
              children={
                <div>
                  <h3 style={{ margin: 0 }}>{totalMembers}</h3> <p>View All</p>
                </div>
              }
              onClick={this.showUsers}
            />
          </Card>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <h2>Leader </h2>
            <Paper
              style={paperStyle}
              zDepth={3}
              circle={true}
              children={
                <div>
                  <h3 style={{ margin: 0 }}>{this.state.leader}</h3>
                  <p style={{ marginTop: 5 }}>{this.state.leaderTotal}</p>
                </div>
              }
            />
          </Card>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <h2>Total Orders </h2>
            <Paper
              style={paperStyle}
              zDepth={3}
              circle={true}
              children={
                <div>
                  <h3 style={{ margin: 0 }}>{this.state.totalOrders}</h3>
                </div>
              }
            />
          </Card>
          <Card style={{ padding: "10px", margin: "10px" }}>
            <h2>Avg. Session Length </h2>
            <Paper
              style={paperStyle}
              zDepth={3}
              circle={true}
              children={
                <div>
                  {this.state.gaData.totalsForAllResults ?
                    <h3 style={{ margin: 0 }}>{sessionMinutes} Minutes and <br /> {sessionSeconds} Seconds</h3> :
                    <h3 style={{ margin: 0 }}>Loading...</h3>}
                </div>
              }
            />
          </Card>
        </div>
        <Table className="usersTable" style={{ display: "none" }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <Header
              onCellClick={event => {
                this.sortByColumn(event);
              }}
              columns={this.state.data.prospect[0]}
            />
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {body}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserReport;
