import React, { useState } from "react";
import { Input, notification, Modal, Button } from "antd";
import axios from "axios";
import { createUserApi } from "../../services/api.services.js"
const UserForm = (props) => {
  const {loadUser} = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [phone, setPhone] = useState("");


  const[isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
   const res = await createUserApi(fullName, email, password, phone)
  //  debugger
   if(res.data){
    notification.success({
      message: "Create user",
      description: "Tạo user thành công"
     }) 
     resetAndCloseModal();
     await loadUser();
   } else {
    notification.error ({
      message: "Error create user",
      description: JSON.stringify(res.message)
    })
   }
  } 
  
  const resetAndCloseModal = () => {
    setIsModalOpen(false)
    setFullName("");
    setEmail("");
    setPassWord("");
    setPhone("");
  }

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        
        <div style={{display: "flex", justifyContent: "space-between"}}>
        <h3>Table Users</h3>
          <Button 
          type="primary"
          onClick={() =>setIsModalOpen(true)}>Create User
          </Button>
        </div>
          <Modal
          title="Create User"
          open={isModalOpen}
          onOk={() => handleSubmitBtn()}
          onCancel={() => resetAndCloseModal()}
          maskClosable={false}
          okText={"CREATE"}
        >
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
        </Modal>
      </div>
    </div>
  );
};

export default UserForm;
