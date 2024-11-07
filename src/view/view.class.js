export default class View {

    constructor() {
        this.booksList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
        this.messages = document.getElementById('messages');
    }

    renderModules(modules) {
        const modulos = document.getElementById('id-module');
        const defaultMod = document.createElement('option');
        defaultMod.disabled = true;
        defaultMod.selected = true;
        defaultMod.textContent = 'Selecciones un módulo';
        modulos.append(defaultMod);

        modules.sort((a, b) => a.cliteral.localeCompare(b.cliteral));

        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.code;
            option.textContent = module.cliteral;
            modulos.append(option);
        });
    }

    renderBook(book) {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('card');
        bookContainer.id = book.id;

        const bookImage = document.createElement('img');
        bookImage.src = 'https://dummyimage.com/100x100/fff/000';
        bookImage.alt = `Libro con id,: ${book.id}`;

        const bookDetails = document.createElement('div');
        bookDetails.innerHTML = `
            <h3>${book.moduleCode} (${book.id})</h3>
            <h4>Editorial: ${book.publisher}</h4>
            <p>Precio: ${book.price}€</p>
            <p>Páginas: ${book.pages}</p>
            <p>Estado: ${book.status}</p>
            <p>Comentarios: ${book.comments}</p>
            <p>Fecha de venta: ${book.soldDate}</p>
        `;

        bookContainer.append(bookImage, bookDetails);
        this.booksList.append(bookContainer);
    }

    renderBooks(books) {
        this.booksList.innerHTML = '';
        const title = document.createElement('h1');
        title.textContent = 'Listado de libros';
        this.booksList.appendChild(title);
        books.map(book => {this.renderBook(book);});
    }

    removeBook(id) {
        const bookToRemove = document.getElementById(id);
        bookToRemove.remove();
    }

    mensaje(type, message) {
        const rendedMessage = document.createElement('div');
        rendedMessage.className = type + ' alert alert-danger alert-dismissible';
        rendedMessage.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `
        this.messages.appendChild(rendedMessage);
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

    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {
            const idToRemove = document.getElementById('id-remove').value
            callback(idToRemove)
        })
    }






}