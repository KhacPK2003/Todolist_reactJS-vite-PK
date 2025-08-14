import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { createBookApi, handleUploadFile } from "../../services/api.services";

const CreateBookUncontrol = (props) => {
  const { Option } = Select;
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form] = Form.useForm();

  //   const onFinish = (values) => {
  //     console.log("Success:", values);
  //   };
  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };
  // form của antd đã cung cấp sẵn values theo dạng name, ghi để nhớ

  const handleSubmitBtn = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    }
    //step 1: upload
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      //success
      const newThumbnail = resUpload.data.fileUploaded;
      // step 2: create book
      const { mainText, author, price, quantity, category } = values;
      const resBook = await createBookApi(
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
          message: "Create book",
          description: "Tạo mới book thành công",
        });
      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(resBook.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setIsCreateOpen(false);
  };

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

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Table Book</h3>
          <Button type="primary" onClick={() => setIsCreateOpen(true)}>
            Create Book
          </Button>
        </div>
        <Modal
          title="Create Book (UnController)"
          open={isCreateOpen}
          onOk={() => form.submit()}
          onCancel={() => resetAndCloseModal()}
          maskClosable={false}
          okText={"CREATE"}
        >
          <Form form={form} onFinish={handleSubmitBtn} layout="vertical">
            <div style={{ display: "flex", flexDirection: "column" }}>
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
    </div>
  );
};

export default CreateBookUncontrol;
