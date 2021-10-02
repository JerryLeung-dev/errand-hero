import React from "react";
import { Modal, Form, Input } from "antd";

function NewCustomerForm(props) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={props.visible}
      title="ADD A NEW CUSTOMER"
      okText="Add"
      cancelText="Cancel"
      onCancel={props.onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.onAdd(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Customer name"
          rules={[
            {
              required: true,
              message: "Please input the customer name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input the customer phone!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input the customer address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewCustomerForm;
