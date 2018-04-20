import React, { Component } from "react";
import axios from "axios";
import RaisedButton from 'material-ui/RaisedButton';

import TotalUsers from "../components/TotalUsers";
import Leader from "../components/Leader";
import Orders from "../components/TotalOrders";
import AvgSessionLength from "../components/AvgSessionLength";
import LeaderBoard from "../components/LeaderBoard";
import UsersTable from "../components/UsersTable/index";

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        prospect: [""],
        total_results: null
      },
      leaderInfo: null,
      totalOrders: null,
      gaData: {}
    };
  }

  componentDidMount() {
    axios
      .get("https://icons-club-metrics.herokuapp.com/analytics")
      .then(response => {
        this.setState({ gaData: response.data });
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
            key =>
              leaderboard[key] ===
              leadersArray.sort((a, b) => {
                return b - a;
              })[0]
          );
          let sortedLeaderboard = Object.keys(leaderboard).sort((a, b) => {
            return leaderboard[b] - leaderboard[a];
          });
          this.setState({
            leaderInfo: {
              leader: leader,
              leaderTotal: leaderboard[leader],
              leaderboard: sortedLeaderboard,
              leaderboardObject: leaderboard
            }
          });
        }
      });
  }

  showUsers() {
    Array.from(document.getElementsByClassName("usersTable")).map(table => {
      return (table.style.display = "table");
    });
    Array.from(document.getElementsByClassName("leaderboard")).map(table => {
      return (table.style.display = "none");
    });
  }

  showLeaderboard() {
    Array.from(document.getElementsByClassName("usersTable")).map(table => {
      return (table.style.display = "none");
    });
    Array.from(document.getElementsByClassName("leaderboard")).map(table => {
      return (table.style.display = "table");
    });
  }

  render() {
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
          <TotalUsers total={this.state.data} style={paperStyle}/>
          <Leader info={this.state.leaderInfo} style={paperStyle}/>
          <Orders total={this.state.totalOrders} style={paperStyle} />
          <AvgSessionLength gaData={this.state.gaData} style={paperStyle} />
        </div>
        <div style={{margin: "20px 0"}}>
          <RaisedButton label="Leader Board" onClick={this.showLeaderboard} backgroundColor="#d88c2b" labelColor="#ffffff" style={{margin: "12px"}}/>
          <RaisedButton label="Users" onClick={this.showUsers} backgroundColor="#000000" labelColor="#ffffff" style={{margin: "12px"}}/>
        </div>
        <LeaderBoard info={this.state.leaderInfo} />
        <UsersTable users={this.state.data} />
      </div>
    );
  }
}

export default UserReport;
