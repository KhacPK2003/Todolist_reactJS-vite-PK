import React, { useEffect, useState } from 'react';
import { Popconfirm, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import { deleteUserAPI } from '../../services/api.services';
import ViewUserDetail from './view.user.detail';

const UserTable = (props) => {

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if(res.data){
      notification.success({
        message: "Delete user",
        description: "Xóa người dùng thành công"
      })
      loadUser();
    } else {
      notification.error ({
        message:"Error delete user",
        description: JSON.stringify(res.message)
      })
    }
  }
  const[isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
    const {dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize} = props;
    const columns = [
      {
        title: "STT",
          render: (_, record, index) => {
          return (
            <>{(index + 1) + (current - 1) * pageSize}</>
          )
        }
      },
    {
      title: 'Id',
      dataIndex: '_id',
      render: (_, record) => {
        return (
          <a href='#'
          onClick={()=> {
            setDataDetail(record);
            setIsDetailOpen(true);
          }}
          >{record._id}</a>
        )
      }
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{display: "flex", gap: "20px"}}> 
          <EditOutlined style={{cursor: "pointer", color: "orange"}}  
          onClick={() => {
            setDataUpdate(record);
            setIsModalUpdateOpen(true);}}
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn xóa user này ?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
          <DeleteOutlined style={{cursor: "pointer", color: "red"}}/>
          </Popconfirm>
          
        </div>
      ),
    }
  ];
  const onChange = (pagination, filters, sorter, extra) => {  
    //setCurrent, setPageSize
    // Nếu thay đổi trang : current
    if(pagination && pagination.current){
      if(pagination.current !== +current) {
        setCurrent(+pagination.current)  // thêm dấu + trc 1 tên biến để nó sẽ tự động convert từ chuỗi string sang số nguyên
      }
    }

    // Nếu thay đổi tổng số phần tử : pageSize
    if(pagination && pagination.pageSize){
      if(pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize)  // thêm dấu + trc 1 tên biến để nó sẽ tự động convert từ chuỗi string sang số nguyên
      }
    }
    console.log("<<< check ", {pagination, filters, sorter, extra})
  };

    return (
          <>
            <Table 

            pagination={
                {
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                } 
                }
                onChange={onChange}



            columns={columns} 
            dataSource={dataUsers}
            rowKey={"_id"}
             />
             <UpdateUserModal
              isModalUpdateOpen = {isModalUpdateOpen}
              setIsModalUpdateOpen = {setIsModalUpdateOpen}
              dataUpdate = {dataUpdate} 
              setDataUpdate = {setDataUpdate}
              loadUser = {loadUser}
             />
             <ViewUserDetail
              dataDetail = {dataDetail}
              setDataDetail = {setDataDetail}
              isDetailOpen = {isDetailOpen}
              setIsDetailOpen = {setIsDetailOpen}
              loadUser = {loadUser}
             />
          </>
    );
};

export default UserTable;