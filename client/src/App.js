import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Spinner from "./components/UI/Spinner/Spinner";

import Layout from "./components/Layout/Layout";
const Products = React.lazy(() => import("./pages/Products/Products"));
const Customers = React.lazy(() => import("./pages/Customers/Customers"));
const CustomerPurchases = React.lazy(() =>
  import("./pages/CustomerPurchases/CustomerPurchases")
);
const Home = React.lazy(() => import("./pages/Home/Home"));

class App extends Component {
  render() {
    let routers = (
      <Suspense fallback={<Spinner size="large" />}>
        <Switch>
          <Route path="/customers/:slug" component={CustomerPurchases} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/products" component={Products} />

          <Route path="/" exact component={Home} />
          {/* If user directs to any unknown path, redirect back to homepage */}
          <Redirect to="/" component={Home} />
        </Switch>
      </Suspense>
    );
    return (
      <>
        <Layout>{routers}</Layout>
      </>
    );
  }
}

export default App;
