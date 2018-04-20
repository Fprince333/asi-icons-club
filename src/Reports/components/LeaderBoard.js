import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const LeaderBoard = (props) => {
  const leaderboardBody = props.info
    ? props.info.leaderboard.map((person, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn>{index + 1}</TableRowColumn>
            <TableRowColumn>{person}</TableRowColumn>
            <TableRowColumn>
              {props.info.leaderboardObject[person]}
            </TableRowColumn>
          </TableRow>
        );
      })
    : null;
  return (
    <Table className="leaderboard" style={{ display: "none" }}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn> </TableHeaderColumn>
          <TableHeaderColumn> Name</TableHeaderColumn>
          <TableHeaderColumn> Members </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {leaderboardBody}
      </TableBody>
    </Table>
  )
}

export default LeaderBoard;