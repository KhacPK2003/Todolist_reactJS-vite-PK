import React, { useState } from "react";
import { Input, notification } from "antd";
import { Button } from "antd";
import axios from "axios";
import { createUserApi } from "../../services/api.services.js"
const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickBtn = async () => {
   const res = await createUserApi(fullName, email, password, phone)
   debugger
   if(res.data){
    notification.success({
      message: "Create user",
      description: "Tạo user thành công"
     }) 
   } else {
    notification.error ({
      message: "Error create user",
      description: JSON.stringify(res.message)
    })
   }
  } 
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassWord(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone Number</span>
          <Input
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div>
          <Button 
          type="primary"
          onClick={handleClickBtn}>Create User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
