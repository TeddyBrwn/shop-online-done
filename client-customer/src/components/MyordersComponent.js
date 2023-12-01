import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "../components/style/Myorders.scss";

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }
  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;
    const orders = this.state.orders.map((item) => {
      return (
        <tr
          key={item._id}
          className="datatable"
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
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
          </tr>
        );
      });
    }
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">DANH SÁCH ĐẶT HÀNG</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>Mã ID</th>
                <th>Ngày Tạo</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Tổng Cộng</th>
                <th>Trạng Thái</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ? (
          <div className="align-center">
            <h2 className="text-center">
              CHI TIẾT ĐẶT HÀNG CỦA{" "}
              <span className="name-customer">
                {this.context.customer.name}
              </span>
            </h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>Số Thứ Tự</th>
                  <th>Mã ID</th>
                  <th>Tên</th>
                  <th>Ảnh</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Tổng Cộng</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/customer/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;
