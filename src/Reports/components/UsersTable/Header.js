import React from "react";
import { TableHeaderColumn, TableRow } from "material-ui/Table";

const Header = props => {
  const headers = Object.keys(props.columns).map(key => {
    switch (key) {
      case "first_name":
        return (
          <TableHeaderColumn key={key} data-id={key}>
            Name
          </TableHeaderColumn>
        );

      case "email":
        return (
          <TableHeaderColumn key={key} data-id={key}>
            Email
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
  return <TableRow style={{cursor: "pointer"}}onCellClick={props.onCellClick}> {headers}</TableRow>;
};
export default Header;
