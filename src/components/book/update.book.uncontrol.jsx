import { Form, Input, InputNumber, Modal, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { updateBookApi } from "../../services/api.services";

const UpdateBookUnControl = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {
    loadBook,
    dataUpdate,
    setDataUpdate,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
  } = props;

  const handleOnchangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      ); 
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail, values) => {
    const { id, mainText, author, price, quantity, category } = values;
    const resBook = await updateBookApi(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );
    if (resBook.data) {
      resetAndCloseModal();
      await loadBook();
      notification.success({
        message: "Update book",
        description: "Cập nhật  book thành công",
      });
    } else {
      notification.error({
        message: "Error update book",
        description: JSON.stringify(resBook.message),
      });
    }
  };

  const handleSubmitBtn = async (values) => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error update book",
        Descriptions: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }
    let newThumbnail = "";
    // có ảnh preview và không có file => ko upload file
    if (!selectedFile && preview) {
      // do nothing
      newThumbnail = dataUpdate.newThumbnail;
    } else {
      // có ảnh preview và có file => upload file
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        //success
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        //failed
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }
    //step 2: update book
    await updateBook(newThumbnail, values);
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setIsModalUpdateOpen(false);
  };

  return (
    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
      <Modal
        title="Update Book (UnController)"
        open={isModalUpdateOpen}
        onOk={() => form.submit()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"Update"}
      >
        <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Form.Item label="id" name="id" >
                <Input disabled/>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Tiêu đề"
                name="mainText"
                rules={[
                  { required: true, message: "Please input your mainText!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Please input your author!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  { required: true, message: "Please input your price!" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} addonAfter={"đ"} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[
                  { required: true, message: "Please input your quantity!" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="category"
                label="Thể loại"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  <Option value="Arts">Arts</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Comics">Comics</Option>
                  <Option value="Cooking">Cooking</Option>
                  <Option value="Entertainment">Entertainment</Option>
                  <Option value="History">History</Option>
                  <Option value="Music">Music</Option>
                  <Option value="Sports">Sports</Option>
                  <Option value="Teen">Teen</Option>
                  <Option value="Travel">Travel</Option>
                </Select>
              </Form.Item>
            </div>
            <div>
              <div>Thumnail</div>
              <label
                htmlFor="btnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  background: "orange",
                  marginTop: "15px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Upload
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                id="btnUpload"
                // onChange={handleOnchangeFile}
                onChange={(event) => {
                  handleOnchangeFile(event);
                }}
                onClick={(event) => (event.target.value = null)}
              />
            </div>
            {preview && (
              <>
                <div
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    height: "100px",
                    width: "150px",
                  }}
                >
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src={preview}
                  />
                </div>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateBookUnControl;
