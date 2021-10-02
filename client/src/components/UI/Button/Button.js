import { Button } from "antd";
import {
  ShoppingCartOutlined,
  SaveOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import "./Button.css";

function button(props) {
  let button;
  switch (props.action) {
    case "delete":
      button = (
        <Button
          type="danger"
          onClick={props.clicked}
          size={props.size || "default"}
          className="btn"
        >
          Delete
        </Button>
      );
      break;
    case "add":
      button = (
        <Button
          type="primary"
          onClick={props.clicked}
          size={props.size || "default"}
          className="btn"
        >
          Add
        </Button>
      );
      break;
    case "select":
      button = (
        <Button
          onClick={props.clicked}
          size={props.size || "default"}
          icon={<ShoppingCartOutlined />}
          className="btn"
        >
          Select
        </Button>
      );
      break;
    case "save":
      button = (
        <Button
          onClick={props.clicked}
          size={props.size || "default"}
          icon={<SaveOutlined />}
          className="btn"
        >
          Save
        </Button>
      );
      break;
    case "view":
      button = (
        <Button
          type="primary"
          onClick={props.clicked}
          size={props.size || "default"}
          icon={<RightCircleOutlined />}
          id="btn__view"
        >
          View Products
        </Button>
      );
      break;
    default:
      button = (
        <Button
          onClick={props.clicked}
          size={props.size || "default"}
          className="btn"
        >
          Add
        </Button>
      );
      break;
  }
  return button;
}

export default button;
