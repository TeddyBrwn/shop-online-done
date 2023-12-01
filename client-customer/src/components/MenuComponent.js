import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import Search from "./SearchComponent";
import "../components/style/Menu.scss";
import "../components/style/Popup.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      xtKeyword: "",
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={"/product/category/" + item._id}>{item.name}</Link>
        </li>
      );
    });
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/">Home</Link>
            </li>
            {cates}
          </ul>
        </div>
        <div className="float-right">
          <Popup
            trigger={
              <div className="icon-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            }
            // position="right center"
          >
            <div className="popup-content">
              <form className="search">
                <input
                  type="search"
                  placeholder="SEARCH"
                  className="keyword"
                  value={this.state.txtKeyword}
                  onChange={(e) => {
                    this.setState({ txtKeyword: e.target.value });
                  }}
                />
                <input
                  className="submit-search"
                  type="submit"
                  value="SEARCH"
                  onClick={(e) => this.btnSearchClick(e)}
                />
              </form>
            </div>
          </Popup>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate("/product/search/" + this.state.txtKeyword);
  }
  // apis
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);
