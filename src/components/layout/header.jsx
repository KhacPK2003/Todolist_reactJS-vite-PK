import React, { useContext, useState } from 'react';
// import './header.css'
import {Menu, message} from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppstoreOutlined, HomeOutlined, MailOutlined, 
  ProductOutlined, SettingOutlined, UsergroupAddOutlined,
  LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.services';

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);

    
  const onClick = e => {
    setCurrent(e.key);
  };

  const handleLogout = async() => {
    const res = await logoutAPI();
    if(res.data) {
      // clear data
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      })
      message.success("Logout thành công.");
      //redirect to home
      navigate("/");
    }
  }
    const items = [
        {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to={"/users"}>Users</Link>,
          key: 'users',
          icon: <UsergroupAddOutlined />,
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'products',
          icon: <ProductOutlined />,
        },

        ...(!user.id  ? [{
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: 'login',
          icon: <LoginOutlined />,
        }] : []),
        

        ...(user.id ? [{
          label: `Welcome ${user.fullName}`,
          key: 'settings',
          icon: <AliwangwangOutlined />,
          children: [
            {
              label: <span onClick={() =>handleLogout()}>Đăng xuất</span>,
              key: 'logout',
            }
          ]
        },] : []),
        
      ];
    return (
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>  
    );
};

export default Header;