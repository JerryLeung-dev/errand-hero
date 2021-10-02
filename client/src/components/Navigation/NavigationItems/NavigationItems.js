import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./NavigationItems.css";

function navigation() {
  return (
    <Menu mode="horizontal" className="menu">
      <Menu.Item key="customers">
        <Link to="/customers">Customers</Link>
      </Menu.Item>
      <Menu.Item key="products">
        <Link to="/products">Products</Link>
      </Menu.Item>
    </Menu>
  );
}

export default navigation;
