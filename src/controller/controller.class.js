import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import Book from "../model/book.class";
import Cart from "../model/cart.class";
import View from "../view/view.class";
export default class Controller {

    constructor() {
        this.view = new View();
        this.books = new Books();
        this.cart = new Cart();
        this.users = new Users();
        this.modules = new Modules();
        this.eventosBook = {
            'remove': this.handleRemoveBook.bind(this),
            'addCart': this.cart.addItem.bind(this.cart),
            'edit': this.view.editBook.bind(this.view),
        }


    }

    async init() {
        try {
            await Promise.all([
                this.books.populate(),
                this.users.populate(),
                this.modules.populate(),
                this.cart.populate()
            ]);
            this.view.renderBooks(this.books.data, this.eventosBook);
            this.view.renderModules(this.modules.data);

            const bookExist = function () {
                const userId = 2;
                const moduleCode = document.getElementById('id-module').value;
                debugger
                return this.books.bookExists.bind(this)(moduleCode, userId);
            }
            
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this), () => {
                return bookExist.call(this).then(exists => {
                    const module = document.getElementById('id-module');
                    if (exists) {
                        // Manejar el caso en que el libro existe
                        const errorInput = document.createElement('p');
                        errorInput.classList.add('inputError');
                        module.setCustomValidity('No puedes añadir dos libros con el mismo módulo');
                        errorInput.textContent = module.validationMessage;
                        module.insertAdjacentElement('afterend', errorInput);
                        return false;
                    } else {
                        // Manejar el caso en que el libro no existe
                        module.setCustomValidity('');
                        return true;
                    }
                });
            });

            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        } catch (error) {
            this.view.mensaje('error', error.message);
        }

    }

        // view.class.js
    
    
    // controller.class.js
   

    async handleSubmitBook(data) {
        const book = new Book(data);
        
        if (book.id !== '') {
            try {
                await this.books.changeBook(book);
                this.view.mensaje('success', 'El libro fue editado correctamente');
                this.view.removeBook(book.id);
                this.view.renderBook(book, this.eventosBook);
            } catch (error) {
                console.log(error);
                
                this.view.mensaje('error', 'Error al editar el libro');
            }
            return;
        }
        try {
            await this.books.addBook(book);
            this.view.mensaje('success', 'El libro fue añadido');
            
            this.view.renderBook(book, this.eventosBook);
        } catch (error) {
            this.view.mensaje('error', 'Error al añadir el libro');
        }
    }

    async handleRemoveBook(id) {
        if (!id) {
            this.view.mensaje('error', 'Error no hay id');
            return;
        }
        try {
            await this.books.removeBook(id);
            this.view.removeBook(id);
            this.cart.remove(id);
            this.view.mensaje('success', 'El libro fue eliminado correctamente');
        } catch (error) {
            this.view.mensaje('error', error.message);
        }
    }



}