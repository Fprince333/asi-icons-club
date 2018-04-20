import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Card } from "material-ui/Card";
import Paper from "material-ui/Paper";

const TotalUsers = (props) => {
  const totalMembers = props.total.prospect.length > 1
  ? props.total.total_results -
      props.total.prospect.filter(member => {
        if (member.company) {
          return member.company.includes("Architectural Systems");
        } else {
          return null;
        }
      }).length
  : <Skeleton/>;
  const paperStyle = props.style;
  return (
    <Card style={{ padding: "10px", margin: "10px" }}>
      <h2>Total Users </h2>
        <Paper
          style={paperStyle}
          zDepth={3}
          circle={true}
          children={
            <div>
              <h3 style={{ margin: 20 }}>{totalMembers} </h3>
            </div>
          }
        />
    </Card>
  )
}

export default TotalUsers;