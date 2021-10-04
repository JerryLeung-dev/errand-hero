import { Component } from "react";
import { List, Card, InputNumber } from "antd";

import "./PurchasesControl.css";
import Button from "../../components/UI/Button/Button";

class PurchasesControl extends Component {
  state = {
    purchases: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.purchases && prevProps.purchases !== this.props.purchases) {
      this.setState({ purchases: this.props.purchases });
    }
  }

  componentDidMount() {
    this.setState({ purchases: this.props.purchases });
  }

  handleSave = () => {
    this.props.handleSave(this.state.purchases);
  };

  handleDelete = (name) => {
    const updatedPurchase = this.state.purchases.filter(
      (purchase) => purchase.name !== name
    );
    this.props.onDelete(updatedPurchase);
  };
  render() {
    return (
      <>
        <List
          // style={{ minHeight: "70vh" }}
          // grid={{
          //   column: 2,
          //   gutter: 30,
          // }}
          pagination={{
            style: { textAlign: "center" },
            pageSize: 6,
          }}
          dataSource={this.state.purchases}
          renderItem={(purchase) => (
            <List.Item key={purchase.name}>
              <Card
                size="small"
                className="purchase-item"
                headStyle={{ backgroundColor: "#7cfb7c33" }}
                title={purchase.name}
                extra={
                  <Button
                    size="small"
                    action="delete"
                    clicked={() => this.handleDelete(purchase.name)}
                  />
                }
              >
                <InputNumber
                  keyboard={true}
                  defaultValue={purchase.quantity}
                  // value={purchase.value}
                  min={1}
                  onChange={(value) => {
                    const updatedPurchases = this.state.purchases.map(
                      (oldPurchase) => {
                        if (oldPurchase.name === purchase.name) {
                          const newPurchase = {
                            ...purchase,
                            quantity: value,
                          };
                          return newPurchase;
                        }
                        return oldPurchase;
                      }
                    );
                    this.setState({ purchases: updatedPurchases });
                  }}
                />
              </Card>
            </List.Item>
          )}
        />
        <div className="right">
          <Button action="save" size="large" clicked={this.handleSave} />
        </div>
      </>
    );
  }
}

export default PurchasesControl;
