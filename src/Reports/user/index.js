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

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { prospect: [""], total_results: "Loading..." } };
  }

  componentDidMount() {
    axios
      .get("https://icons-club-metrics.herokuapp.com/members")
      .then(response => {
        this.setState({ data: response.data });
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
    const totalMembers = this.state.data.prospect.length > 1
      ? this.state.data.total_results -
          this.state.data.prospect.filter(member =>
            member.company.includes("Architectural Systems")
          ).length
      : 0;
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
