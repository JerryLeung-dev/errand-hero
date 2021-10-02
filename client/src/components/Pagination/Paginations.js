import { Pagination } from "antd";
import "./Pagination.css";

function pagination(props) {
  return (
    <div className="pagination">
      <Pagination
        current={props.current}
        onChange={props.onChange}
        total={props.total}
        pageSize={props.pageSize}
      />
    </div>
  );
}

export default pagination;
