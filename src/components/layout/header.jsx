import React, { useContext, useState } from 'react';
// import './header.css'
import {Menu} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { AppstoreOutlined, HomeOutlined, MailOutlined, ProductOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
const Header = () => {
    const [current, setCurrent] = useState('mail');

    const user = useContext(AuthContext);

    console.log("Check data: ", user)
    
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
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
        {
          label: <Link to={"/"}>Cài đặt</Link>,
          key: 'setting',
          icon: <SettingOutlined />,
          children: [
            {
              label: <Link to={"/login"}>Đăng nhập</Link>,
              key: 'login',
            },
            {
              label: 'Đăng xuất',
              key: 'logout',
            }
          ],
        },
      ];
    return (
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>  
    );
};

export default Header;