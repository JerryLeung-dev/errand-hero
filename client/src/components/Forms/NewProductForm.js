import React from "react";
import { Modal, Form, Input } from "antd";

function NewProductForm(props) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={props.visible}
      title="ADD A NEW PRODUCT"
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{

        // }}
      >
        <Form.Item
          name="name"
          label="Product name"
          rules={[
            {
              required: true,
              message: "Please input the product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Price">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewProductForm;
