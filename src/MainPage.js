import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

const MainPage = ({books, shelves, getShelfTitle, onUpdateShelf}) => {
    const shelvesToBooks = {};
    shelves.forEach((shelf) => (shelvesToBooks[shelf] = []));
    books.forEach((book) => {
        if (book.shelf && shelvesToBooks[book.shelf]) {
            shelvesToBooks[book.shelf].push(book);
        }
    });
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {shelves.map((shelf) =>
                    (<BookShelf key={shelf} books={shelvesToBooks[shelf]} shelf={shelf} shelves={shelves}
                                getShelfTitle={getShelfTitle}
                                onUpdateShelf={onUpdateShelf}/>))}
            </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
    </div>);
};

MainPage.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default MainPage;