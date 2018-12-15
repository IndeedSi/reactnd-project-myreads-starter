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
        }
    };
    handleSearch = (query) => {
        BooksAPI.search(query)
            .then((books) => {
                this.setState((prevState) => {
                    if (prevState.query === query) {
                        return {result: !books || books.error ? [] : books};
                    }
                    return {};
                });
            });
    };
    onUpdateShelf = (book, shelf) => {
        this.props.onUpdateShelf(book, shelf);
        this.setState((prevState) => {
            let prevResult = prevState.result;
            let result = [];
            for (let resultBook of prevResult) {
                if (resultBook.id === book.id) {
                    book.shelf = (shelf === 'none' ? undefined : shelf);
                    result.push(book);
                } else {
                    result.push(resultBook);
                }
            }
            return result;
        });
    };
    render() {
        const { shelves, getShelfTitle, onUpdateShelf } = this.props;
        return (<div className="search-books">
            <SearchBar onQueryChange={this.onQueryChange} query={this.state.query}/>
            <div className="search-books-results">
                <BookGrid shelves={shelves} books={this.state.result} getShelfTitle={getShelfTitle} onUpdateShelf={onUpdateShelf}/>
            </div>
        </div>);
    }
}

SearchPage.propTypes = {
    shelves: PropTypes.array.isRequired,
    getShelfTitle: PropTypes.func.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
};

export default SearchPage;