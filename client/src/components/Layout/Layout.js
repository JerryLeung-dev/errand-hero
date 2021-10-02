import React from "react";
import ToolBar from "../Navigation/Toolbar/ToolBar";
import "./Layout.css";
import Footer from "../Footer/Footer";

function layout(props) {
  return (
    <>
      <ToolBar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default layout;
