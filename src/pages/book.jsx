import React, { useEffect, useState } from 'react';
import BookTable from '../components/book/book.table';
import { fetchAllBookAPI } from '../services/api.services';

const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState([1]);
    const [pageSize, setPageSize] = useState([5]);
    const [total, setTotal] = useState(0);

    const loadBook = async() =>{
        const res = await fetchAllBookAPI();
        if(res.data) {
            setDataBook(res.data.result);
            setCurrent(res.meta.current);
            setPageSize(res.meta.pageSize);
            setTotal(res.meta.total);
        }
    }

    useEffect(()=>{
        loadBook();
    }, [current, pageSize]);

    
    return (
        <div>
            <BookTable
                dataBook={dataBook}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setCurrent ={setCurrent}
                current={current}
                total={total}
                loadBook={loadBook}
            />
        </div>
    );
};

export default BookPage;