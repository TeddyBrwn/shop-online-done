import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "../components/style/Inform.scss";

class Inform extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === "" ? (
            <div>
              <Link to="/login">Login</Link>
              <span className="space">/</span>
              <Link to="/signup">Sign-up</Link>
              <span className="space">/</span>
              <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{this.context.customer.name}</b>
              <span className="sub-space">/</span>{" "}
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Logout
              </Link>{" "}
              <span className="sub-space">/</span>
              <Link to="/myprofile">My profile</Link>
              <span className="sub-space">/</span>{" "}
              <Link to="/myorders">My orders</Link>
            </div>
          )}
        </div>
        <div className="float-right">
          <span className="total-items">({this.context.mycart.length})</span>
          <Link to="/mycart">Giỏ Hàng</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
