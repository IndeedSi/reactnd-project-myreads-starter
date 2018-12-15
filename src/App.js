import React from 'react';
import * as BooksAPI from './BooksAPI'
import {Switch, Route} from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import './App.css';

const shelves = ["wantToRead", "currentlyReading", "read"];

class BooksApp extends React.Component {
    state = {
        books: {}
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({books: books.reduce((obj, book) => ({...obj, [book.id]: book}), {})})
            });
    }

    getShelfTitle = (shelf) => (shelf.charAt(0).toUpperCase() + shelf.slice(1).replace(/[A-Z]/g, m => " " + m));

    onUpdateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((result) => {
                if (result) {
                    this.setState((prevState) => {
                        if (shelf === 'none') {
                            let newBooks = prevState.books;
                            delete newBooks[book.id];
                            return {books: newBooks}
                        }
                        let newBook = {...book};
                        let newBooks = prevState.books;
                        newBook.shelf = shelf;
                        newBooks[book.id] = newBook;
                        return {books: newBooks};
                    })
                }
            })
    };

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path='/'
                           render={() => (<MainPage books={Object.values(this.state.books)} shelves={shelves}
                                                    getShelfTitle={this.getShelfTitle}
                                                    onUpdateShelf={this.onUpdateShelf}/>)}/>
                    <Route path='/search'
                           render={() => (<SearchPage shelves={shelves} getShelfTitle={this.getShelfTitle}
                                                      onUpdateShelf={this.onUpdateShelf}
                                                      shelfBooks={this.state.books}/>)}/>
                </Switch>
            </div>
        )
    }
}

export default BooksApp
