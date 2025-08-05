import React, { useContext, useState } from 'react';
// import './header.css'
import {Menu} from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { AppstoreOutlined, HomeOutlined, MailOutlined, 
  ProductOutlined, SettingOutlined, UsergroupAddOutlined,
  LoginOutlined, AliwangwangOutlined
} from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
const Header = () => {
    const [current, setCurrent] = useState('mail');

    const {user} = useContext(AuthContext);

    
  const onClick = e => {
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
              label: 'Đăng xuất',
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