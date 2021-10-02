import React from "react";
import { NavLink } from "react-router-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./ToolBar.css";
import Logo from "../../UI/Logo/Logo";

function navigationBar(props) {
  return (
    <>
      <header>
        <h3 className="brand">
          <Logo />
          <NavLink to="/">ErrandHero</NavLink>
        </h3>
        <nav>
          <NavigationItems />
        </nav>
      </header>
    </>
  );
}

export default navigationBar;
