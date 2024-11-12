import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import Book from "../model/book.class";
import View from "../view/view.class";
export default class Controller {

    constructor() {
        this.view = new View();
        this.books = new Books();
        this.users = new Users();
        this.modules = new Modules();


    }

    async init() {
        try {
            await Promise.all([
                this.books.populate(),
                this.users.populate(),
                this.modules.populate()
            ]);
            this.view.renderBooks(this.books.data, this.handleRemoveBook.bind(this));
            this.view.renderModules(this.modules.data);
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
        } catch (error) {
            this.view.mensaje('error', error.message);
        }

    }

    async handleSubmitBook(data) {
        try {
            const book = new Book(data);
            await this.books.addBook(book);
            this.view.mensaje('success', 'El libro fue añadido');
            
            this.view.renderBook(book, this.handleRemoveBook.bind(this));
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
            this.view.mensaje('success', 'El libro fue eliminado correctamente');
        } catch (error) {
            this.view.mensaje('error', error.message);
        }
    }



}