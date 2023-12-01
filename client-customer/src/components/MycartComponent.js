import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CartUtil from "../utils/CartUtil";
import axios from "axios";
import withRouter from "../utils/withRouter";
import "../components/style/Mycart.scss";
import { Navigate } from "react-router-dom";

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64," + item.product.image}
              width="70px"
              height="70px"
              alt=""
            />
          </td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td>
            <span
              className="link"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </td>
        </tr>
      );
    });
    return (
      <div className="warapper-mycart">
        {mycart == "" ? (
          <Navigate replace to="/" />
        ) : (
          <div className="align-center">
            <h2 className="text-center">DANH SÁCH SẢN PHẨM</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>Số Thứ Tự</th>
                  <th>Mã ID</th>
                  <th>Tên</th>
                  <th>Loại</th>
                  <th>Ảnh</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Tổng Cộng</th>
                  <th>Kiểm Tra</th>
                </tr>
                {mycart}
                <tr>
                  <td colSpan="6"></td>
                  <td>Tổng cộng</td>
                  <td>{CartUtil.getTotal(this.context.mycart)}</td>
                  <td>
                    <span
                      className="link"
                      onClick={() => this.lnkCheckoutClick()}
                    >
                      CHECKOUT
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm("ARE YOU SURE?")) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate("/login");
        }
      } else {
        alert("Giỏ bạn không có đồ");
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("Thành công");
        this.context.setMycart([]);
        this.props.navigate("/home");
      } else {
        alert("Thất bại");
      }
    });
  }
}
export default withRouter(Mycart);
