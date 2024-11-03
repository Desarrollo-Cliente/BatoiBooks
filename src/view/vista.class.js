export default class View {

    constructor() {
        this.mensaje = document.querySelector('#user-messages');
        this.booksList = document.querySelector('#books-list');
        this.bookForm = document.querySelector('#book-form');
        this.form = document.querySelector('#section-form');
        this.about = document.querySelector('#about');
        this.remove = document.querySelector('#remove');
    }
    

    renderSelectModules(modules) {
        const select = document.querySelector('#module-select');
        select.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = '- Selecciona un módulo -';
        select.appendChild(defaultOption);

        modules.sort((a, b) => a.cliteral.localeCompare(b.cliteral));

        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = module.cliteral;
            select.appendChild(option);
        });
    }

    renderBook(book) {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('card');

        const bookImage = document.createElement('img');
        bookImage.src = book.photo === "" ? 'https://placehold.co/200x200' : `/img/books/${book.photo}`;
        bookImage.alt = `Libro: ${book.id}`;

        const bookDetails = document.createElement('div');
        bookDetails.classList.add('book-details');

        const createBookElement = (tag, text) => {
            const element = document.createElement(tag);
            element.textContent = text;
            return element;
        };

        const bookTitle = createBookElement('h3', `${book.moduleCode} (${book.id})`);
        const bookPublisher = createBookElement('h4', `Editorial: ${book.publisher}`);
        const bookPrice = createBookElement('p', `Precio: ${book.price}€`);
        const bookPages = createBookElement('p', `Paginas: ${book.pages}`);
        const bookStatus = createBookElement('p', `Estado: ${book.status}`);
        const bookComments = createBookElement('p', `Comentarios: ${book.comments}`);
        const bookSoldDate = createBookElement('p', `Fecha Venta: ${book.soldDate}`);

        const bookElements = [
            bookTitle,
            bookPublisher,
            bookPrice,
            bookPages,
            bookStatus,
            bookComments,
            bookSoldDate
        ];

        bookElements.forEach(element => {
            bookDetails.appendChild(element);
        });

        bookContainer.append(bookImage, bookDetails);

        const booksList = document.querySelector('#main-content');
        booksList.append(bookContainer);
    }
    

    renderLibros(libros) {
        this.booksList.innerHTML = '';
        const titulo = document.createElement('h2');
        titulo.textContent = 'Listado de libros';
        titulo.classList.add('section-title');

        this.booksList.appendChild(titulo);

        libros.forEach(libro => {
            this.renderBook(libro);
        });
    }

    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
           event.preventDefault()
        const formData = new FormData(this.bookForm);
        const payload = {};
        formData.forEach((value, key) => {
            payload[key] = value;
        });
        callback(payload)
        })
    }
   
 



}