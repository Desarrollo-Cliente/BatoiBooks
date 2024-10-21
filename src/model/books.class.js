import Book from './book.class.js';
import api from '../services/books.api.js';


export default class Books {

    constructor() {
        this.data = [];
    }

    async populate() {
        let data = await api.getDBBooks();
        this.data = data.map(book => new Book(book));
    }

    async addBook(book) {
        try {
            const bookDB = new Book(await api.addDBBook(book));
            if (this.data.push(bookDB)) {
                return bookDB;
            }
        }catch (error) {
            console.error(error);
            return;
        }
    }

    async removeBook(bookId) {
        // Hace falta un reques hanled
        // const a = await api.getDBBookById(bookId);
        // if ( a === null) {
        //     throw new Error(`El libro con ID ${bookId} no se encontró.`);
        // }
        const index = this.data.findIndex(b => b.id === bookId);
        
        if (index === -1) {
            throw new Error(`El libro con ID ${changeBook.id} no se encontró.`);
        }

        try {
            await api.removeDBBook(bookId);
            this.data = this.data.filter(book => book.id !== bookId);
        } catch (error) {
            throw new Error(`El libro con ID ${bookId} no se pudo eliminar.`);            
        }
    }
    
    async changeBook(book){
        // Hace falta un reques hanled
        // const a = await api.getDBBookById(book.id);
        // if ( a === null) {
        //     throw new Error(`El libro con ID ${book.id} no se encontró.`);
        // }

        const changeBook = new Book(book);
        const index = this.data.findIndex(b => b.id === book.id);
        
        if (index === -1) {
            throw new Error(`El libro con ID ${changeBook.id} no se encontró.`);
        }

        try {
            await api.changeDBBook(book);
            this.data[index] = changeBook;
            return changeBook;
        } catch (error) {
            throw new Error(`El libro con ID ${book.id} no se pudo comabiar.`);
        }
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