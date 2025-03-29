import { Link } from "react-router-dom";
import { Button, Flex } from "antd";

export default function ShowAction({ handleClickDelete, editLink, children }) {
  return (
    <Flex gap={10}>
      <Button onClick={handleClickDelete} color="danger" variant="outlined">
        Delete
      </Button>
      <Link to={editLink}>
        <Button color="primary" variant="solid">
          Edit
        </Button>
      </Link>
      {children}
    </Flex>
  );
}
