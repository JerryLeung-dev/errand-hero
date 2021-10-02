import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";

import "./Customer.css";
import Button from "../../components/UI/Button/Button";
import NewCustomerForm from "../../components/Forms/NewCustomerForm";
import Pagination from "../../components/Pagination/Paginations";
import Spinner from "../../components/UI/Spinner/Spinner";

class Customers extends Component {
  state = {
    customers: [],
    showModal: false,
    confirmLoading: false,
    currentPage: 1,
    totalItems: 1,
    pageSize: 3,
    redirectId: null,
  };

  fetchCustomers = (pageNum) => {
    const page = pageNum ? pageNum : "1";
    axios.get(`api/v1/customers?page=${page}`).then((response) => {
      const {
        data: {
          data: { customers, currentPage, totalItems, pageSize },
        },
      } = response;
      this.setState({
        customers: customers,
        currentPage: currentPage,
        totalItems: totalItems,
        pageSize: pageSize,
      });
    });
  };

  componentDidMount() {
    this.fetchCustomers();
  }

  handleDelete = (id) => {
    var isConfirmed = window.confirm("Delete this customer?");
    if (isConfirmed) {
      axios
        .delete(`api/v1/customers/${id}`)
        .then(() => {
          //reload page to renew customer list
          this.fetchCustomers();
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
    // e.preventDefault();
    this.setState({ confirmLoading: true });
    axios
      .post("api/v1/customers", values)
      .then(() => {
        this.setState({ showModal: false, confirmLoading: false });
        setTimeout(() => {
          alert("Successfully added");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (page) => {
    this.fetchCustomers(page);
  };

  handleSelect = (slug) => {
    this.props.history.push(`/customers/${slug}`);
  };

  // renderRedirect = () => {
  //   if (this.state.redirectId !== null)
  //     return <Redirect to={`api/v1/customers/${this.state.redirectId}`} />;
  // };

  render() {
    // eslint-disable-next-line array-callback-return
    let customers = null;
    if (this.state.customers.length === 0) {
      customers = <Spinner size="large" />;
    } else {
      customers = this.state.customers.map((customer) => {
        return (
          <Card
            hoverable
            key={customer._id}
            title={customer.name}
            extra={
              <>
                <Button
                  action="delete"
                  clicked={(e) => this.handleDelete(customer.slug)}
                />
                <Button
                  action="select"
                  clicked={(e) => this.handleSelect(customer.slug)}
                />
              </>
            }
            className="card"
          >
            <p>{customer.phone}</p>
            <p>{customer.address}</p>
          </Card>
        );
      });
    }
    return (
      <div className="content">
        {/* {this.renderRedirect()} */}
        <h1>Customers</h1>
        {customers}
        <Pagination
          current={this.state.currentPage}
          onChange={this.handleChange}
          total={this.state.totalItems}
          pageSize={this.state.pageSize}
        />
        <div className="addButton">
          <Button action="add" size="large" clicked={this.showModal} />
        </div>
        <NewCustomerForm
          visible={this.state.showModal}
          onCancel={this.handleCancel}
          onAdd={this.handleAdd}
          confirmLoading={this.state.confirmLoading}
        />
      </div>
    );
  }
}

export default withRouter(Customers);
