import Book from './book.class.js';
import api from '../services/books.api.js';


export default class Books {

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

    async removeBook(bookId) {
        const index = this.getBookIndexById(bookId);
        
        if (index === -1) {
            throw new Error(`Error  El libro con ID ${changeBook.id} no se encontró en el carro.`);
        }

        try {
            await api.removeDBBook(bookId);
            this.data = this.data.filter(book => book.id !== bookId);
        } catch (error) {
            throw new Error(`Error   El libro con ID ${bookId} no se pudo eliminar del carro.`);            
        }
    }

    

    getBookIndexById(bookId) {
        return this.data.findIndex(book => book.id === bookId);
    }

    toString(){
        return JSON.stringify(this.data);
    }
    



}