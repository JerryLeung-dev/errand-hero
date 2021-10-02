import "./Logo.css";
import logoImage from "../../../assets/images/logo.jpeg";

function logo(props) {
  return (
    <div className="logo">
      <img src={logoImage} alt="Logo" />
    </div>
  );
}

export default logo;
