import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import Header from "./Header";

const UsersTable = (props) => {
  const body = props.users.prospect.length > 1
    ? props.users.prospect
        .filter(member => {
          if (member.company) {
            return !member.company.includes("Architectural Systems");
          } else {
            return null;
          }
        })
        .map(prospect => {
          let rowBody = Object.keys(prospect).map(key => {
            switch (key) {
              case "first_name":
                return (
                  <TableRowColumn key={key}>
                    {prospect[key] + " " + prospect["last_name"]}
                  </TableRowColumn>
                );

              case "email":
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
  return (
    <Table className="usersTable" style={{ display: "none" }}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <Header
          onCellClick={event => {
            props.sortByColumn(event);
          }}
          columns={props.users.prospect[0]}
        />
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {body}
      </TableBody>
    </Table>
  )
}

export default UsersTable;