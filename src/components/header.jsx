import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <>
        <div className="header container" style={{ backgroundColor: "red" }}>
          <div className="fa fa-more"></div>
          <span className="title">Timeline</span>
          <input type="text" className="searchInput" placeholder="Search ..." />
          <div className="fa fa-search searchIcon"></div>
        </div>
      </>
    );
  }
}

export default Header;
