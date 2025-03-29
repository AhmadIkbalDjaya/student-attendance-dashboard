import { useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";

export default function CreateAction({ submitLoading, onSubmit, children }) {
  const navigate = useNavigate();

  return (
    <Flex gap={10}>
      <Button color="danger" variant="outlined" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button
        loading={submitLoading}
        onClick={onSubmit}
        color="primary"
        variant="solid"
      >
        Submit
      </Button>
      {children}
    </Flex>
  );
}
