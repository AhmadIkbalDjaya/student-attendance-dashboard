import { message } from "antd";

let messageInstance = null;

export const useMessage = () => {
  if (!messageInstance) {
    const [messageApi, contextHolder] = message.useMessage();
    messageInstance = { messageApi, contextHolder };
  }
  return messageInstance.contextHolder;
};

export const showMessage = ({ type, content }) => {
  if (messageInstance && messageInstance.messageApi) {
    messageInstance.messageApi.open({
      type,
      content,
      style: {
        marginTop: "20px",
      },
    });
  }
};
