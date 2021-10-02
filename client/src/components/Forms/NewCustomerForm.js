import React from "react";
import { Modal, Form, Input, Radio } from "antd";

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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          gender: "M",
        }}
      >
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
        <Form.Item name="phone" label="Phone">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          //   className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewCustomerForm;
