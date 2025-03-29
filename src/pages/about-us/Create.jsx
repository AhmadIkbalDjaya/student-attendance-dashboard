import { Breadcrumb, Flex, Form, Typography } from "antd";

import CreateAction from "../../components/CreateAction";
import AboutUsForm from "./components/AboutUsForm";
import { useCreate } from "./hooks/useCreate";

export default function CreateAboutUsPage() {
  const { breadcrumbItems, handleSubmit, submitLoading } = useCreate();
  const [form] = Form.useForm();

  return (
    <>
      <Breadcrumb separator=">" items={breadcrumbItems} />
      <Flex justify="space-between" style={{ margin: "10px 0" }}>
        <Typography.Title level={3}>Create About Us</Typography.Title>
        <CreateAction
          submitLoading={submitLoading}
          onSubmit={() => handleSubmit(form)}
        />
      </Flex>
      <AboutUsForm form={form} handleSubmit={() => handleSubmit(form)} />
    </>
  );
}
