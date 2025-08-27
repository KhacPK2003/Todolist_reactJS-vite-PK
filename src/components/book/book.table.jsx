import React, { useCallback, useEffect, useState } from "react";
import { Popconfirm, Space, Table, Tag, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";
import CreateBookControl from "./create.book.control";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.services";
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";
import UpdateBookUnControl from "./update.book.uncontrol";
const BookTable = (props) => {
  const[current, setCurrent] = useState(1);
  const[pageSize, setPageSize] = useState(5);
  const[total, setTotal] = useState(0);

  const [dataBook, setDataBook] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [loadingTable, setLoadingTable] = useState(false);


  useEffect(() =>{
    loadBook();
  }, [current, pageSize])

  const loadBook = useCallback(async() =>{
    setLoadingTable(true)
    const res = await fetchAllBookAPI(current, pageSize);
    if(res.data) {
        setDataBook(res.data.result);
        setCurrent(res.data.meta.current);
        setPageSize(res.data.meta.pageSize);
        setTotal(res.data.meta.total);
    }
    setLoadingTable(false)
}, [current, pageSize])

const handleDeleteBook = async (id) => {
  const res = await deleteBookAPI(id);
  if(res.data){
    notification.success({
      message: "Delete book",
      description: "Xóa book thành công"
    })
    await loadBook();
  } else {
    notification.error ({
      message:"Error delete book",
      description: JSON.stringify(res.message)
    })
  }
}

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataDetail(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (price) => Number(price).toLocaleString("vi-VN"),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined style={{ cursor: "pointer", color: "orange" }} 
            onClick={() => {
              setDataUpdate(record)
              setIsModalUpdateOpen(true);
            }}
          />
          <Popconfirm
            title="Xóa book"
            description="Bạn chắc chắn xóa book này ?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (pagination.current !== current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize); // thêm dấu + trc 1 tên biến để nó sẽ tự động convert từ chuỗi string sang số nguyên
      }
    }
  };
  return (
    <>
      {/* <CreateBookControl 
        loadBook={loadBook}
        isCreateOpen = {isCreateOpen}
        setIsCreateOpen = {setIsCreateOpen}
      /> */}
      <CreateBookUncontrol
        loadBook={loadBook}
        isCreateOpen = {isCreateOpen}
        setIsCreateOpen = {setIsCreateOpen}
      />
      <Table
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        columns={columns}
        dataSource={dataBook}
        rowKey={"_id"}
        loading={loadingTable}
      />
      ;
      <ViewBookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
      {/* <UpdateBookControl
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        loadBook={loadBook}
      /> */}
      <UpdateBookUnControl
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        loadBook={loadBook}
      />
    </>
  );
};

export default BookTable;
