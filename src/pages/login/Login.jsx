import { useEffect } from "react";
import { Form, Row } from "antd";

import IllustrationSection from "./components/IllustrationSection";
import FormSection from "./components/FormSection";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const [form] = Form.useForm();
  const { loadingSubmit, handleSubmit, checkAuthentication } = useLogin();

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Row justify="space-between" align="stretch" style={{ height: "100vh" }}>
      <FormSection
        form={form}
        loadingSubmit={loadingSubmit}
        onFinish={() => handleSubmit(form)}
      />
      <IllustrationSection />
    </Row>
  );
}
