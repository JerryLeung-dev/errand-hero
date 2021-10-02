import "./Home.css";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="home">
      <div className="banner">
        <h1 className="banner__title">
          Welcome to <span className="banner__logo">ErrandHero</span>
        </h1>
        <p className="banner__para">
          An online store application that records your products and purchases
        </p>
        <div className="banner__btn">
          <Link to="/products">
            <Button action="view" size="large" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
