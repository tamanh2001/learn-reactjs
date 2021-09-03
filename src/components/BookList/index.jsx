import React from 'react';
import PropTypes from 'prop-types';

BookList.propTypes = {
    books:PropTypes.array,
};
BookList.defaultProps = {
    books:[],
}

function BookList(props) {
    const {books}=props
    return (
        <ul className="book-list">
            {books.map(book => (
                <li 
                key={book.id}>{book.title}

                </li>
            ))}
        </ul>
    );
}

export default BookList;