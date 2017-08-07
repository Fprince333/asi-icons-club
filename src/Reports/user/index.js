import React, { Component } from "react";
import axios from "axios";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { Card } from "material-ui/Card";

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { prospect: [""], total_results: "Loading..." },
      leader: "Loading..."
    };
  }

  componentDidMount() {
    axios
      .get("https://icons-club-metrics.herokuapp.com/members")
      .then(response => {
        this.setState({ data: response.data });
        let leaders = [];
        let leaderboard = {};
        this.state.data.prospect.map(prospect => {
          Object.keys(prospect).map(key => {
            switch (key) {
              case "Account_Executive":
                leaders.push(prospect[key]);

              default:
                break;
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
            key => leaderboard[key] === leadersArray[0]
          );
          this.setState({ leader: leader });
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
    const sortedData = this.state.data.prospect.sort(function(a, b) {
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
    const headers = Object.keys(this.state.data.prospect[0]).map(key => {
      switch (key) {
        case "first_name":
          return (
            <TableHeaderColumn key={key} data-id={key}>
              First Name
            </TableHeaderColumn>
          );

        case "last_name":
          return (
            <TableHeaderColumn key={key} data-id={key}>
              Last Name
            </TableHeaderColumn>
          );

        case "company":
          return (
            <TableHeaderColumn key={key} data-id={key}>
              Company
            </TableHeaderColumn>
          );

        case "job_title":
          return (
            <TableHeaderColumn key={key} data-id={key}>
              Job Title{" "}
            </TableHeaderColumn>
          );

        case "Account_Executive":
          return (
            <TableHeaderColumn key={key} data-id={key}>
              Account Executive{" "}
            </TableHeaderColumn>
          );

        default:
          return null;
      }
    });

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
    const paperStyle = {
      height: 100,
      width: 100,
      margin: 5,
      paddingTop: 20,
      textAlign: "center",
      display: "inline-block",
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
                </div>
              }
            />
          </Card>
        </div>
        <Table className="usersTable" style={{ display: "none" }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow
              onCellClick={event => {
                this.sortByColumn(event);
              }}
            >
              {headers}
            </TableRow>
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
