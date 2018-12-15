import React from 'react'
import BookGrid from './BookGrid';
import PropTypes from "prop-types";

const BookShelf = ({ books, shelf, shelves, getShelfTitle, onUpdateShelf}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{getShelfTitle(shelf)}</h2>
        <div className="bookshelf-books">
            <BookGrid books={books} shelves={shelves} getShelfTitle={getShelfTitle} onUpdateShelf={onUpdateShelf}/>
        </div>
    </div>
);

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookShelf;