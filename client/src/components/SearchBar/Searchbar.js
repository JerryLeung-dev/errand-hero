import "./SearchBar.css";
import { Component } from "react";
import { AutoComplete } from "antd";
import Button from "../../components/UI/Button/Button";

const Option = AutoComplete.Option;

class SearchBar extends Component {
  state = {
    products: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.product && prevProps.product !== this.props.product) {
      this.setState({ products: this.props.products });
    }
  }

  onSelect = (value) => {
    this.props.handleSearch(value);
  };

  render() {
    return (
      <>
        <AutoComplete
          backfill={true}
          size={"large"}
          style={{
            width: 400,
          }}
          placeholder="Search your grocery item"
          onChange={this.props.onChange}
          onSelect={this.onSelect}
          value={this.props.searchValue}
          notFoundContent={"Select a product"}
        >
          {this.props.products.map((product, index) => (
            <Option key={product.name} value={product.name}>
              {product.name}
            </Option>
          ))}
        </AutoComplete>
        <Button action="add" size="large" clicked={this.props.onAdd} />
      </>
    );
  }
}
export default SearchBar;
