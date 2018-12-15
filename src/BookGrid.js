import React from 'react';
import Book from './Book';

const BookGrid = ({ books, shelves, getShelfTitle, onUpdateShelf }) => (
            <ol className="books-grid">
                { books.map((book) => (<Book key={book.id} book={book} shelves={shelves} getShelfTitle={getShelfTitle}
                                             onUpdateShelf={onUpdateShelf}/>)) }
            </ol>
        );

export default BookGrid;