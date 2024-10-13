import Book from './book.class.js';
export default class Books {
    constructor() {
        this.data = [];
        this.lastId = 0;
    }

    populate(data) {
        this.data = data.map(book => new Book(book));
        this.lastId = this.data.map(book => book.id).reduce((a, b) => Math.max(a, b), 0) + 1;
    }

    addBook(book) {
        const newBook = new Book({...book, id: this.lastId});
        if (this.data.push(newBook)) {
            this.lastId++;
            return newBook;
        }
    }

    removeBook(bookId) {
        this.data = this.data.filter(book => book.id !== bookId);
        
    }

    removeBook(bookId) {
        const book = this.data.find(book => book.id === bookId);
        
        if (!book) {
            throw new Error(`El libro con ID ${bookId} no se encontró.`);
        }
        
        this.data = this.data.filter(book => book.id !== bookId);
    }
    
    changeBook(book){
        const changeBook = new Book(book);
        const index = this.data.findIndex(b => b.id === changeBook.id);
        
        if (index === -1) {
            throw new Error(`El libro con ID ${changeBook.id} no se encontró.`);
        }
        
        this.data[index] = changeBook;
        return changeBook;
    }

    getBookById(bookId) {
        const book = this.data.find(book => book.id === bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    getBookIndexById(bookId) {
        const book = this.data.findIndex(book => book.id === bookId);
        if (book === -1) {
            throw new Error('Book not found');
        }
        return book;
    }
    
    bookExists(userId, moduleCode) {
        return this.data.some(book => book.userId === userId && book.moduleCode === moduleCode);
    }
    
    booksFromUser(userId) {
        return this.data.filter(book => book.userId === userId);
    }
    
    booksFromModule(moduleCode) {
        return this.data.filter(book => book.moduleCode === moduleCode);
    }
    
    booksCheeperThan(price) {
        return this.data.filter(book => book.price < price);
    }
    
    booksWithStatus(status) {
        return this.data.filter(book => book.status === status);
    }
    
    averagePriceOfBooks() {
        const total = (this.data.reduce((acc, book) => acc + book.price, 0) / this.data.length).toFixed(2) + ' €';
        return (this.data.length === 0)? '0.00 €' : total;
    }
    
    booksOfTypeNotes() {
        return this.data.filter(book => book.publisher === 'Apunts');
    }
    
    booksNotSold() {
        return this.data.filter(book => book.soldDate === '');
    }
    incrementPriceOfbooks(percentage) {
        return this.data.map((book) => {
            const incremento = parseFloat((book.price * (1 + percentage)).toFixed(2));
            return { ...book, price: incremento };
            
        });
    }


    toString(){
        return JSON.stringify(this.data);
    }
    



}