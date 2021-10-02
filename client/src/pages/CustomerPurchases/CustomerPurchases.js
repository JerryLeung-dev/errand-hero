import { Component } from "react";
import { withRouter } from "react-router-dom";

import "./CustomerPurchases.css";
import SearchBar from "../../components/SearchBar/Searchbar";
import PurchasesControl from "../../components/PurchasesControl/PurchasesControl";
import { Row, Col } from "antd";
// import axios from "../../axios-order";
import axios from "axios";

class CustomerPurchases extends Component {
  state = {
    products: [],
    search: true,
    selectedSuggestion: "",
    suggestions: [],
    purchaseList: [],
    customerName: "",
    searchValue: "",
  };

  fetchCustomerData = (slug) => {
    axios
      .get(`/api/v1/customers/${slug}`)
      .then((response) => {
        this.setPurchaseList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProductNames = () => {
    axios.get(`/api/v1/products/name-list`).then((response) => {
      this.setProductList(response);
    });
  };
  setPurchaseList = (data) => {
    const {
      data: {
        data: {
          customer: { name, purchaseList },
        },
      },
    } = data;
    const editedPurchaseList = purchaseList.map((purchase) => {
      const { name, quantity } = purchase;
      return { name: name, quantity: quantity };
    });
    this.setState({ purchaseList: editedPurchaseList, customerName: name });
  };

  setProductList = (data) => {
    const {
      data: {
        data: { products },
      },
    } = data;
    const editedProducts = products.map((product) => {
      const { name } = product;
      return { name: name };
    });
    this.setState({ products: editedProducts });
  };

  componentDidMount() {
    //retrieve params id from url
    this.fetchCustomerData(this.props.match.params.slug);
    this.fetchProductNames();
  }

  suggestionsSearch = (searchText) => {
    const filteredSuggestions = this.state.products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    );
    this.setState({
      suggestions: filteredSuggestions,
      selectedSuggestion: filteredSuggestions[0],
    });
  };

  handleChange = (value) => {
    this.setState({ searchValue: value });
    if (value === "") {
      this.setState({ suggestions: [], selectedSuggestion: {} });
    }
    if (this.state.search) {
      this.suggestionsSearch(value);
    }
    this.setState({ search: true });
  };

  handleAdd = () => {
    const purchaseList = this.state.purchaseList;
    const selectedSuggestion = this.state.selectedSuggestion;
    const products = this.state.products;

    //check if the search text matches any product in the product list
    const matchedProduct = products.filter(
      (product) => product.name === selectedSuggestion
    );
    if (matchedProduct.length === 0) {
      alert("Please select options from dropdown menu");
      this.setState({ selectedSuggestion: {} });
      return;
    }

    //loop through purchase list, if item already exists, add value to 1
    //else add the product to the purchase list
    let isExists = false;
    for (let i = 0; i < purchaseList.length; i++) {
      if (purchaseList[i]["name"] === selectedSuggestion) {
        isExists = true;
        const updatedPurchase = {
          ...purchaseList[i],
          value: purchaseList[i]["quantity"] + 1,
        };
        const newPurchaseList = purchaseList.map((purchase) => {
          if (purchase.name === updatedPurchase.name) {
            return updatedPurchase;
          }
          return purchase;
        });
        this.setState({ purchaseList: newPurchaseList }, () => {
          this.setState({ searchValue: "" });
        });
      }
    }
    if (!isExists) {
      const newPurchaseList = [
        ...purchaseList,
        { name: selectedSuggestion, quantity: 1 },
      ];
      this.setState({ purchaseList: newPurchaseList }, () => {
        this.setState({ searchValue: "" });
      });
    }
  };

  handleSearch = (value) => {
    this.setState({
      selectedSuggestion: value,
      search: false,
    });
  };

  handleDelete = (purchases) => {
    this.setState({ purchaseList: purchases });
  };

  handleSave = (purchaseList) => {
    const id = this.props.match.params.id;
    axios.patch(`/api/v1/customers/${id}`, purchaseList).then((response) => {
      if (response.status === 200) {
        alert("You have successfully updated your purchase record");
        this.props.history.push("/customers");
      }
    });
  };

  render() {
    return (
      <div className="content">
        <Row>
          <Col span={12}>
            <h1>Customer Purchases</h1>
          </Col>
          <Col span={12}>
            <h1 style={{ marginLeft: "35px" }}>{this.state.customerName}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div className="search-bar">
              <SearchBar
                products={this.state.suggestions}
                selectedProduct={this.state.selectedSuggestion}
                onChange={this.handleChange}
                handleSearch={this.handleSearch}
                onAdd={this.handleAdd}
                searchValue={this.state.searchValue}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="purchases-control">
              <PurchasesControl
                onDelete={this.handleDelete}
                purchases={this.state.purchaseList}
                handleSave={this.handleSave}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(CustomerPurchases);
