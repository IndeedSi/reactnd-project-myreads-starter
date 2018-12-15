import React from 'react'
import BookGrid from './BookGrid';

const BookShelf = ({ books, shelf, shelves, getShelfTitle, onUpdateShelf}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{getShelfTitle(shelf)}</h2>
        <div className="bookshelf-books">
            <BookGrid books={books} shelves={shelves} getShelfTitle={getShelfTitle} onUpdateShelf={onUpdateShelf}/>
        </div>
    </div>
);

export default BookShelf;