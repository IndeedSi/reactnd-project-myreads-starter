import React from 'react';
import Book from './Book';
import PropTypes from "prop-types";

const BookGrid = ({ books, shelves, getShelfTitle, onUpdateShelf }) => (
            <ol className="books-grid">
                { books.map((book) => (<Book key={book.id} book={book} shelves={shelves} getShelfTitle={getShelfTitle}
                                             onUpdateShelf={onUpdateShelf}/>)) }
            </ol>
        );

BookGrid.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookGrid;