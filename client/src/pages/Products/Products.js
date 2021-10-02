import React, { Component } from "react";
import { Card } from "antd";
import axios from "axios";

import "./Product.css";
import Button from "../../components/UI/Button/Button";
import NewProductForm from "../../components/Forms/NewProductForm";
import Pagination from "../../components/Pagination/Paginations";
import Spinner from "../../components/UI/Spinner/Spinner";

class Products extends Component {
  state = {
    products: [],
    showModal: false,
    currentPage: 1,
    totalItems: 1,
    pageSize: 3,
  };

  fetchProducts = (pageNum) => {
    const page = pageNum ? pageNum : "1";
    axios
      .get(`api/v1/products?page=${page}`)
      .then((response) => {
        const {
          data: {
            data: { products, currentPage, totalItems, pageSize },
          },
        } = response;
        this.setState({
          products: products,
          currentPage: currentPage,
          totalItems: totalItems,
          pageSize: pageSize,
        });
      })
      .catch((err) => {
        console.log(`Error message: ${err}`);
      });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  handleDelete = (id) => {
    var isConfirmed = window.confirm("Delete this customer?");
    if (isConfirmed) {
      axios
        .delete(`api/v1/products/${id}`)
        .then(() => {
          //reload page to renew product list
          this.fetchProducts();
        })
        .catch((err) => {
          console.log(`Error message: ${err}`);
        });
    }
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  handleCancel = () => {
    this.setState({ showModal: false });
  };

  handleAdd = (values) => {
    axios
      .post("api/v1/products", values)
      .then(() => {
        this.setState({ showModal: false });
        setTimeout(() => {
          alert("Successfully added");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (page) => {
    this.fetchProducts(page);
  };

  render() {
    let products = null;
    if (this.state.products.length === 0) {
      products = <Spinner size="large" />;
    } else {
      products = this.state.products.map((product) => {
        return (
          <Card
            key={product._id}
            title={product.name}
            extra={
              <Button
                action="delete"
                clicked={(e) => this.handleDelete(product._id)}
              />
            }
            className="card"
          >
            <h3>$ {product.price}</h3>
            <p>{product.description}</p>
          </Card>
        );
      });
    }
    // eslint-disable-next-line array-callback-return
    return (
      <div className="content">
        <h1>Product List</h1>
        {products}
        <Pagination
          current={this.state.currentPage}
          onChange={this.handleChange}
          total={this.state.totalItems}
          pageSize={this.state.pageSize}
        />
        <div className="addButton">
          <Button action="add" size="large" clicked={this.showModal} />
        </div>
        <NewProductForm
          visible={this.state.showModal}
          onCancel={this.handleCancel}
          onAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default Products;
