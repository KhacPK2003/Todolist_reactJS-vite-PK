import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.services';



const UserTable = () => {
    const [dataUsers, setDataUsers] = useState([
      { _id: "khac", fullName: 22, email: "tp hcm"},
      { _id: "khacdeptrai", fullName: 25, email: "tp hcm"}, 
    ]);
    useEffect(() => {
      console.log(">>> run useEffect 111")
      loadUser
    }, []);
    const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
 
  const loadUser = async () => {
    const res= await fetchAllUserAPI();
    // setDataUsers(res.data);
  }
  loadUser();
  console.log(">>> run render 000")
    return (
        <div>
            <Table 
            columns={columns} 
            dataSource={dataUsers}
            rowKey={"_id"}
             />
        </div>
    );
};

export default UserTable;