import { Drawer } from 'antd';
import React from 'react';

const ViewBookDetail = (props) => {
    const {dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen} = props;
    return (
        <>
      <Drawer
        title="Chi tiết sách"
        onClose={() => {
            setDataDetail(null);
            setIsDetailOpen(false);
         }}
        open={isDetailOpen}
      >
        {dataDetail ? <>
        <p>ID: {dataDetail._id}</p>
        <br></br>
        <p>Tiêu đề: {dataDetail.mainText}</p>
        <br></br>
        <p>Tác giả: {dataDetail.author}</p>
        <br></br>
        <p>Thể loại: {dataDetail.category}</p>
        <br></br>
        <p>Giá tiền: {dataDetail.price}</p>
        <br></br>
        <p>Số lượng: {dataDetail.quantity}</p>
        <br></br>
        <p>Đã bán: {dataDetail.sold}</p>
        <br></br>
        <p>Thumbnail</p>
        <div style={{
          marginTop:"15px",
          height: "100px",
          width:"150px",
          border: "1px solid #ccc"
        }}>
          <img style={{
            height: "100%",
            width: "100%",
            objectFit:"contain"
          }}
          src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
          />
        </div>
        </>
        :
        <>
            <p>Không có dữ liệu</p>
        </>}
      </Drawer>
    </>
    );
};

export default ViewBookDetail;