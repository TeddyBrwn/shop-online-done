// Home.js

import React, { Component } from "react";
import axios from "axios";
import "./style/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProducts: [],
      hotProducts: [],
    };
  }

  componentDidMount() {
    this.fetchProducts("new");
    this.fetchProducts("hot");
  }

  fetchProducts(type) {
    // Replace 'YOUR_MONGODB_API_ENDPOINT' with your actual MongoDB API endpoint
    const endpoint = `/api/customer/products/${type}`;

    axios
      .get(endpoint)
      .then((response) => {
        if (type === "new") {
          this.setState({ newProducts: response.data });
        } else if (type === "hot") {
          this.setState({ hotProducts: response.data });
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${type} products:`, error);
      });
  }

  renderProducts(products) {
    return products.map((product) => (
      <div key={`${product._id}`} className="item">
        <div className="product-container">
          <img
            src={`data:image/jpg;base64,${product.image}`}
            alt={product.name}
            className="product-image"
          />
          <h3>{product.name}</h3>
          <p className="product-price">Giá {product.price}$</p>
        </div>
      </div>
    ));
  }

  render() {
    const { newProducts, hotProducts } = this.state;

    return (
      <div className="align-center">
        <h2 className="text-center">Sản Phẩm Mới</h2>
        <div className="product-row">{this.renderProducts(newProducts)}</div>

        <h2 className="text-center">Sản Phẩm Bán Chạy</h2>
        <div className="product-row">{this.renderProducts(hotProducts)}</div>
      </div>
    );
  }
}

export default Home;
