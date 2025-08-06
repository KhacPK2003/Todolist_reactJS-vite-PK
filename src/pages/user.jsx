import React, { useEffect, useState } from 'react';
import UserTable from '../components/user/user.table';
import UserForm from '../components/user/user.form';
import { fetchAllUserAPI } from '../services/api.services';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    //empty array => run once   
    // not empty => next value !== prev value
    useEffect(() => {
      loadUser();
    }, [current, pageSize]); //[] + condition

    const loadUser = async () => {
        const res= await fetchAllUserAPI(current, pageSize);
        if(res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total)
        }
        
      }
    return (
        <div>
            <div style={{padding: '20px'}}>
                <UserForm loadUser={loadUser}/>
                <UserTable 
                dataUsers={dataUsers}
                loadUser = {loadUser}
                current = {current}
                pageSize = {pageSize}
                total = {total}
                setCurrent={setCurrent}
                setPageSize = {setPageSize}
                />
            </div>
        </div>
    );
};

export default UserPage;