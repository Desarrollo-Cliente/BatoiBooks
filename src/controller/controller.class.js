import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import Book from "../model/book.class";
import View from "../view/vista.class";
export default class Controller {

    constructor(){
        this.view = new View();
        this.books = new Books();
        this.users = new Users();
        this.modules = new Modules();

        
    }

    async init(){
        try{
            await this.books.populate();
            await this.users.populate();
            await this.modules.populate();
            this.view.renderBooks(this.books.data);
            this.view.renderSelectModules(this.modules.data);
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
            }catch(error){
               
            }

    }

    



}