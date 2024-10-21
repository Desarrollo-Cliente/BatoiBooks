const url = import.meta.env.VITE_API_URL;

async function getDBBooks() {
  return await fetch( url + `books`)
    .then(response => response.json());
}

async function getDBBookById(bookId) {
    try {
        const response = await fetch(`${url}books/${bookId}`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        throw new Error('An error occurred while retrieving the book from the database');
    }
}

async function addDBBook(book) {
    try {
        // Esto no deberia de hacer falta, pero lo hago porque no me llega la id desde el test
        book.id = await getId();


        // Codigo normal
        const response = await fetch(`${url}books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });

        console.log(response);
        
        
        if (!response.ok) {
            throw new Error('Failed to add book to the database');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error('An error occurred while adding the book to the database');
    }
}

async function removeDBBook(bookId) {
    try {
        const response = await fetch(`${url}books/${bookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to remove book from the database');
        }

        return await response.json();
    } catch (error) {
        throw new Error('An error occurred while removing the book from the database');
    }
}

async function changeDBBook(book) {
    return await fetch(`${url}books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }).then(response => response.json());
}

async function getId() {
    return await fetch(`${url}books`)
        .then(response => response.json())
        .then(data => {
            return Math.max(...data.map(book => book.id)) + 1;
        });
}

export default {
    getDBBooks,
    getDBBookById,
    addDBBook,
    removeDBBook,
    changeDBBook
};