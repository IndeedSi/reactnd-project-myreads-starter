import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

const SearchBar = ({query, onQueryChange}) => (
    <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" value={query} placeholder="Search by title or author" onChange={(event) => {
                const value = event.target.value;
                onQueryChange(value);
            }}/>
        </div>
    </div>
);

SearchBar.propTypes = {
    query: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired
};

export default SearchBar;