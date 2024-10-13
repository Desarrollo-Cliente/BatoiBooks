export default class Book{
    constructor(book) {
        this.id = book.id;
        this.userId = book.userId;
        this.moduleCode = book.moduleCode;
        this.publisher = book.publisher;
        this.price = book.price;
        this.pages = book.pages;
        this.status = book.status;
        
        this.photo = (book.photo != null) ? book.photo : "";
        this.comments = (book.comments != null) ? book.comments : "";
        this.soldDate = (book.soldDate != null) ? book.soldDate : "";
    }

    toString(){
        return JSON.stringify(this);
    }


}