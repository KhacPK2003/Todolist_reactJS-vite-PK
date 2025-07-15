import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserApi, updateUserAvatarApi } from '../../services/api.services';
const ViewUserDetail = (props) => {
    const {dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser} = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const handleOnchangeFile = (event) =>{
      if (!event.target.files || event.target.files.length === 0) {
        setSelectedFile(null);
        setPreview(null);
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if(file){
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file))
    } 
    }
    const handleUpdateUserAvatar = async() =>{
      const resUpload = await handleUploadFile(selectedFile, "avatar")
      if(resUpload.data) {
        //success
        const newAvatar = resUpload.data.fileUploaded;
        const resUpdateAvatar = await updateUserAvatarApi(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
        if(resUpdateAvatar.data) {
          setIsDetailOpen(false);
          setSelectedFile(null);
          setPreview(null);
          await loadUser();

          notification.success({
            message: "Success upload file",
            description: "Cập nhật avatar thành công"
          })
        }else{
          notification.error({
            message: "Error update avatar",
            description: JSON.stringify(resUpdateAvatar.message)
          })
        }
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message)
        })
      }
    }
    return (
        <>
        <Drawer
        width={"40vw"}
        title="Chi tiết người dùng"
         onClose={() => {
            setDataDetail(null);
            setIsDetailOpen(false);
         }}
        open={isDetailOpen}
      >
        {dataDetail ? <>
        <p>ID: {dataDetail._id}</p>
        <br></br>
        <p>Full Name: {dataDetail.fullName}</p>
        <br></br>
        <p>Email: {dataDetail.email}</p>
        <br></br>
        <p>Phone Number: {dataDetail.phone}</p>
        <br></br>
        <p>avatar</p>
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
          src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
          />
        </div>
        <div>
        <label htmlFor='btnUpload' style={{
          display: "block",
          width: "fit-content",
          background: "orange",
          marginTop: "15px",
          padding: "5px 10px",
          borderRadius:"5px",
          cursor: "pointer"
        }}> 
          Upload avatar
        </label>
        <input 
        type='file' hidden id='btnUpload'
        // onChange={handleOnchangeFile} 
        onChange={ (event) =>{handleOnchangeFile(event)}}

        ></input>
        </div>
        {preview &&
        <>
        <div style={{
          marginTop:"15px",
          marginBottom:"15px",
          height: "100px",
          width:"150px"
        }}>
          <img style={{ height: "100%", width: "100%", objectFit:"contain"}}
          src={preview}
          />
        </div>
        <Button type='primary'
        onClick={()=>{handleUpdateUserAvatar()}}
        >Save</Button>
        </>
      }
        </> 
        :
        <>
            <p>Không có dữ liệu</p>
        </>
        }
      </Drawer>
        </>
        )
};
export default ViewUserDetail;
