
import { useContext, useEffect, useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.services';
import { AuthContext } from './components/context/auth.context';
const App = () => {

  const {setUser} = useContext(AuthContext);
  
  useEffect(()=> {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = async() => {
    const res = await getAccountAPI();
    if(res.data) {
      //success
      setUser(res.data.user)
      console.log("check data", res.data)
    }
  }
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}
export default App
