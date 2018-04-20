import React from 'react';
import Card from "material-ui/Card";
import Paper from "material-ui/Paper";
import Skeleton from 'react-loading-skeleton';

const AvgSessionLength = (props) => {
  const sessionMinutes = props.gaData.totalsForAllResults
    ? (props.gaData.totalsForAllResults["ga:sessionDuration"] /
        props.gaData.totalsForAllResults["ga:sessions"] /
        60)
        .toString()
        .split(".")[0]
    : <Skeleton />;
  const sessionSeconds = props.gaData.totalsForAllResults
    ? (props.gaData.totalsForAllResults["ga:sessionDuration"] /
        props.gaData.totalsForAllResults["ga:sessions"] /
        60)
        .toString()
        .split(".")[1]
        .substring(0, 2)
    : <Skeleton />;
  return (
    <Card style={{ padding: "10px", margin: "10px" }}>
      <h2>Avg. Session Length </h2>
      <Paper
        style={props.style}
        zDepth={3}
        circle={true}
        children={
          <div>
            {props.gaData.totalsForAllResults
              ? <h3 style={{ margin: 0 }}>
                  {sessionMinutes}
                  {" "}
                  Minutes and
                  {" "}
                  <br />
                  {" "}
                  {sessionSeconds}
                  {" "}
                  Seconds
                </h3>
              : <div style={{ margin: 20 }}><Skeleton count={2} /> </div>}
          </div>
        }
      />
    </Card>
  )
}

export default AvgSessionLength;