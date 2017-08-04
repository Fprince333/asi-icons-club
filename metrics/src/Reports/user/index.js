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
    axios.get("https://icons-club-metrics.herokuapp.com/members").then(response => {
      this.setState({ data: response.data });
    });
  }

  render() {
    const paperStyle = {
      height: 100,
      width: 100,
      margin: 0,
      padding: 15,
      textAlign: "center",
      display: "inline-block"
    };
    const headers = Object.keys(this.state.data.prospect[0]).map(key => {
      switch (key) {
        case "first_name":
          return <TableHeaderColumn key={key}>First Name</TableHeaderColumn>;
          break;

        case "last_name":
          return <TableHeaderColumn key={key}>Last Name</TableHeaderColumn>;

        case "company":
          return <TableHeaderColumn key={key}>Company</TableHeaderColumn>;

        case "job_title":
          return <TableHeaderColumn key={key}>Job Title </TableHeaderColumn>;

        case "Account_Executive":
          return (
            <TableHeaderColumn key={key}>Account Executive </TableHeaderColumn>
          );

        default:
          break;
      }
    });

    const body = this.state.data.prospect.map(prospect => {
      let rowBody = Object.keys(prospect).map(key => {
        switch (key) {
          case "first_name":
            return <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>;
            break;

          case "last_name":
            return <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>;
            break;

          case "company":
            return <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>;
            break;

          case "job_title":
            return <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>;
            break;

          case "Account_Executive":
            return <TableRowColumn key={key}>{prospect[key]}</TableRowColumn>;
            break;

          default:
            break;
        }
      });
      return (
        <TableRow key={prospect.id ? prospect.id : 42}>{rowBody}</TableRow>
      );
    });
    return (
      <div>
        <h2>Total Users </h2>
        <Paper
          style={paperStyle}
          zDepth={3}
          circle={true}
          children={<h3>{this.state.data.total_results}</h3>}
        />
        <Table>
          <TableHeader>
            <TableRow>
              {headers}
            </TableRow>
          </TableHeader>
          <TableBody>
            {body}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserReport;
