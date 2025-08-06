import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";
const BookTable = (props) => {

    const {dataBook, pageSize, setPageSize, current, setCurrent, loadBook, total} = props;


    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

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
      title: "id",
      dataIndex: "_id",
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
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (price) =>Number(price).toLocaleString("vi-VN"),
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
          <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
        </Space>
      ),
    },
  ];
  
  const onChange = (pagination, filters, sorter, extra) => {
    if(pagination && pagination.current ) {
        if(pagination.current !== current) {
            setCurrent(+pagination.current)
        }
    }
    if(pagination && pagination.pageSize){
        if(pagination.pageSize !== +pageSize) {
          setPageSize(+pagination.pageSize)  // thêm dấu + trc 1 tên biến để nó sẽ tự động convert từ chuỗi string sang số nguyên
        }
      }

  }
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
      dataSource={dataBook} 
      rowKey={"_id"}

      
      />;
      <ViewBookDetail
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
};

export default BookTable;
