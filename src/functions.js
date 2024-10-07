function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    return book;
}
function getBookIndexById(books, bookId) {
    const book = books.findIndex(book => book.id === bookId);
    if (book === -1) {
        throw new Error('Book not found');
    }
    return book;
}
function bookExists(books, userId, moduleCode) {
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode);
}
function booksFromUser(books, userId) {
    return books.filter(book => book.userId === userId);
}
function booksFromModule(books, moduleCode) {
    return books.filter(book => book.moduleCode === moduleCode);
}
function booksCheeperThan(books, price) {
    return books.filter(book => book.price < price);
}
function booksWithStatus(books, status) {
    return books.filter(book => book.status === status);
}
function averagePriceOfBooks(books) {
    const total = (books.reduce((acc, book) => acc + book.price, 0) / books.length).toFixed(2) + ' €';
    return (books.length === 0)? '0.00 €' : total;
}
function booksOfTypeNotes(books) {
    return books.filter(book => book.publisher === 'Apunts');
}
function booksNotSold(books) {
    return books.filter(book => book.soldDate === '');
}
function incrementPriceOfbooks(books, percentage) {
    return books.map((book) => {
        const incremento = parseFloat((book.price * (1 + percentage)).toFixed(2));
        return { ...book, price: incremento };
        
    });
}
function getUserById(users, userId) {
    return users.find(user => user.id === userId) || (() => { throw new Error('Book not found'); })();
}
function getUserIndexById(users, userId) {
    const user = users.findIndex(user => user.id === userId);
    if (user === -1) {
        throw new Error('Book not found');
    }
    return user;
}
function getUserByNickName(users, nick) {
    return users.find(user => user.nick === nick) || (() => { throw new Error('Book not found'); })();
}
function getModuleByCode(modules, modeuleCode) {
    const module = modules.find(module => module.code === modeuleCode);
    if (!module) {
        throw new Error('Book not found');
    }
    return module;
}


export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}