import Book from './book.class.js';


export default class Cart {

    constructor() {
        this.data = [];
    }

    async populate() {}

    getBookById(bookId) {
        return this.data.find(b => b.id === bookId);
    }

    async addItem(book) {
        const bookCopia = new Book(book);
        const existingBook = this.getBookById(book.id);
        if (existingBook) {
            throw new Error(`Error: El libro con id ${book.id} ya esta en el carro.`);
        }
        this.data.push(bookCopia);
        console.log('Se ha añadido el libro' + bookCopia);
        
    }

    getBookIndexById(bookId) {
        return this.data.findIndex(book => book.id === bookId);
    }

    toString(){
        return JSON.stringify(this.data);
    }
    



}