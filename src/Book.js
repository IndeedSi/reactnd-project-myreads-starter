import React from 'react'
import PropTypes from "prop-types";

const Book = ({ book, shelves, getShelfTitle, onUpdateShelf }) => (
    <div className="book">
        <div className="book-top">
            {
            (<div className="book-cover" style={book.imageLinks && book.imageLinks.smallThumbnail && { backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>)}
            <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : 'none'} onChange={(event) => {
                    const value = event.target.value;
                    onUpdateShelf(book, value);
                }}>
                    <option value="move" disabled>Move to...</option>
                    {shelves.map((shelf) => (<option key={shelf} value={shelf}>{getShelfTitle(shelf)}</option>))}
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.map((author) => (<div key={author}>{author}</div>))}</div>
    </div>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default Book;