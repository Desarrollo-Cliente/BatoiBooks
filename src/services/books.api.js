import url from './api';


function getDBBooks() {
  return fetch(`${url}books`)
    .then(response => response.json());
}

function getDBBookById(bookId) {
    return fetch(`${url}books/${bookId}`)
        .then(response => response.json());
}

function addDBBook(book) {
    return fetch(`${url}books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(response => response.json());
}

function removeDBBook(bookId) {
    return fetch(`${url}books/${bookId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

function changeDBBook(book) {
    return fetch(`${url}books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(response => response.json());
}