import { Button, Modal, notification } from "antd";
import { InputNumber } from "antd";
import { Select, Space } from "antd";
import { Input } from "antd";
import React, { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.services";
const CreateBookControl = (props) => {
  const { isCreateOpen, setIsCreateOpen, loadBook } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuThor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async () => {
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
    setMainText("");
    setAuThor("");
    setCategory("");
    setQuantity("");
    setPrice("");
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
          title="Create Book"
          open={isCreateOpen}
          onOk={() => handleSubmitBtn()}
          onCancel={() => resetAndCloseModal()}
          maskClosable={false}
          okText={"CREATE"}
        >
          <div>
            <span>Tiêu đề</span>
            <Input
              value={mainText}
              onChange={(event) => {
                setMainText(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={(event) => {
                setAuThor(event.target.value);
              }}
            />
          </div>
          <div>
            <span>Giá tiền</span>
            <InputNumber
              style={{ width: "100%" }}
              addonAfter={" đ"}
              value={price}
              onChange={(event) => {
                setPrice(event);
              }}
            />
          </div>
          <div>
            <span>Số lượng</span>
            <InputNumber
              style={{ width: "100%" }}
              value={quantity}
              onChange={(event) => {
                setQuantity(event);
              }}
            />
          </div>
          <div>
            <span>Thể loại</span>
            <Select
              style={{ width: "100%" }}
              value={category}
              onChange={(event) => {
                setCategory(event);
              }}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },

                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },

                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            />
            <div>
              <span>Thumnail</span>
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
        </Modal>
      </div>
    </div>
  );
};

export default CreateBookControl;
