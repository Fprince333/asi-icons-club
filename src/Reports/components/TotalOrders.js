import React from 'react';
import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import Skeleton from "react-loading-skeleton";

const TotalOrders = (props) => {
  return (
    <Card style={{ padding: "10px", margin: "10px" }}>
      <h2>Total Orders </h2>
      <Paper
        style={props.style}
        zDepth={3}
        circle={true}
        children={
          <div>
            <h3 style={{ margin: 20 }}>{props.total ? props.total : <Skeleton />}</h3>
          </div>
        }
      />
    </Card>
  )
}

export default TotalOrders;