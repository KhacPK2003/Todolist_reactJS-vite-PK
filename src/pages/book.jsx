import React, { useEffect, useState } from 'react';
import BookTable from '../components/book/book.table';
import { fetchAllBookAPI } from '../services/api.services';

const BookPage = () => { 
    return (
        <div>
            <BookTable
            />
        </div>
    );
};

export default BookPage;