
import { useContext, useEffect, useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.services';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';
const App = () => {

  const {setUser, isAppLoading, setIsAppLoading} = useContext(AuthContext);

  //hàm delay, định nghĩa giây, phút, giờ
  // const delay = (miliSecond) => {
  //   return new Promise((resolve, reject) =>{
  //     setTimeout(() =>{
  //       resolve()
  //     }, miliSecond)
  //   })
  // }
  useEffect(()=> {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async() => {
    const res = await getAccountAPI();
    // await delay(3000)
    if(res.data) {
      //success
      setUser(res.data.user)
    }
    setIsAppLoading(false)
  }
  return (
    <>
    {isAppLoading === true ?
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Spin/>
    </div>
      :
      <>
      <Header/>
      <Outlet/>
      <Footer/>
      </>
    }
    </>
  );
}
export default App
