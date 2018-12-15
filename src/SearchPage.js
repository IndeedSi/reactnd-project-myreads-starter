import React from 'react';
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar';
import BookGrid from './BookGrid';
import PropTypes from "prop-types";

class SearchPage extends React.Component {
    state = {
        query: '',
        result: []
    };
    onQueryChange = (query) => {
        this.setState({query: query});
        if (query) {
            this.handleSearch(query);
        } else {
            this.setState({result: []});
        }
    };
    handleSearch = (query) => {
        BooksAPI.search(query)
            .then((books) => {
                this.setState((prevState) => {
                    if (prevState.query === query) {
                        let newResult = !books || books.error ? [] : books;
                        let shelfBooks = this.props.shelfBooks;
                        for (let book of newResult) {
                            if (shelfBooks[book.id]) {
                                book.shelf = shelfBooks[book.id].shelf;
                            }
                        }
                        return {result: newResult};
                    }
                    return {};
                });
            });
    };
    onUpdateShelf = (book, shelf) => {
        this.props.onUpdateShelf(book, shelf);
        this.setState((prevState) => {
            let result = prevState.result;
            for (let resultBook of result) {
                if (resultBook.id === book.id) {
                    resultBook.shelf = (shelf === 'none' ? undefined : shelf);
                }
            }
            return result;
        });
    };

    render() {
        const {shelves, getShelfTitle} = this.props;
        return (<div className="search-books">
            <SearchBar onQueryChange={this.onQueryChange} query={this.state.query}/>
            <div className="search-books-results">
                <BookGrid shelves={shelves} books={this.state.result} getShelfTitle={getShelfTitle}
                          onUpdateShelf={this.onUpdateShelf}/>
            </div>
        </div>);
    }
}

SearchPage.propTypes = {
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelfBooks: PropTypes.object.isRequired
};

export default SearchPage;