import React from "react";
import { Input, Button, Form, notification, Row, Col, Divider } from "antd";
import { registerUserApi } from "../services/api.services";
import { Link,useNavigate } from "react-router";
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("<<< Check values: ", values);

    const res = await registerUserApi(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );

    if (res.data) {
      notification.success({
        message: "Register use",
        Descriptions: "Đăng ký user thành công",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Register user error",
        Descriptions: "Đăng ký user thất bại",
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{margin: "30px"}}
      // onFinishFailed={onFinishFailed}
    >
    <h3 style={{textAlign:"center"}}>Đăng ký tài khoản</h3>
      <Row>
        <Col xs={24} md={6}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col xs={24} md={6}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col xs={24} md={6}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col xs={24} md={6}>
          <Form.Item
            label="PhoneNumber"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <div>
          <Button onClick={() => form.submit()} type="primary">
            Register
          </Button>
          <Divider/>
          <div>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></div>
          {/* <Button
            onClick={() => {
              form.setFieldsValue({
                email: "khac1@gmail.com",
                fullname: "PHamKhac",
              });
              console.log("<<<check form:");
            }}
          >
            Test
          </Button> */}
        </div>
      </Row>
    </Form>
  );
};

export default RegisterPage;
