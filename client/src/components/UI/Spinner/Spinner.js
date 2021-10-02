import { Spin } from "antd";
import "./Spinner.css";

function spinner(props) {
  return (
    <div className="spinner">
      <Spin size={props.size} />
    </div>
  );
}

export default spinner;
