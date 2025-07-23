import React from "react";
import { Input, Button, Form, notification, Descriptions } from "antd";
import { registerUserApi } from "../services/api.services";
import { useNavigate } from "react-router";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) =>{
        console.log("<<< Check values: ",values)

        const res = await registerUserApi(
            values.fullName, 
            values.email, 
            values.password, 
            values.phone);

        if(res.data) {
            notification.success({
                message: "Register use",
                Descriptions: "Đăng ký user thành công"
            });
            navigate("/login");
        } else {
            notification.error ({
                message: "Register user error",
                Descriptions: "Đăng ký user thất bại"
            })
        }
    }
    
  return (
    <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
  >
    <div style={{
        margin:"50px",
    }}>
    <Form.Item
      label="Full Name"
      name="fullName"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="PhoneNumber"
      name="phone"
      rules={[{
        required: true,
        pattern: new RegExp(/\d+/g),
        message: "Wrong format!"
      }]}
    >
      <Input />
    </Form.Item>

      <div>
        <Button onClick ={() => form.submit()} type="primary">Register</Button>
        
        <Button onClick={()=> {
            form.setFieldsValue({
                email: "khac1@gmail.com",
                fullname:"PHamKhac"
            })
           console.log("<<<check form:") 
        }}>Test</Button>
      </div>
    </div>
    </Form>
  );
};

export default RegisterPage;
