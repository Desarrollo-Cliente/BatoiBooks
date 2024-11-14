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

    renderBook(book, eventosBook) {
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
            <div class="icons">
                <button class="addCart">
                    <i class="bi bi-bag-plus"></i>
                </button>
                <button class="edit">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="delete">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
            `;

        bookContainer.append(bookImage, bookDetails);
        this.booksList.append(bookContainer);
        document.getElementById(book.id).querySelector('.addCart').addEventListener('click', () => {
            eventosBook.addCart(book);
        });
        document.getElementById(book.id).querySelector('.delete').addEventListener('click', () => {
            eventosBook.remove(book.id);
        });
        document.getElementById(book.id).querySelector('.edit').addEventListener('click', () => {
            eventosBook.edit(book);
        });

    }



    renderBooks(books, eventosBook) {
        this.booksList.innerHTML = '';
        const title = document.createElement('h1');
        title.textContent = 'Listado de libros';
        this.booksList.appendChild(title);
        books.map(book => { this.renderBook(book, eventosBook); });
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
            console.log('submit');
            
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

    editBook(book) {
        this.bookForm.reset();
        this.bookForm.querySelector('h2').textContent = 'Editar libro';
        const idLabel = document.createElement('h3');
        idLabel.textContent = `Id: ${book.id}`;
        idLabel.id = 'id-book';
        this.bookForm.querySelector('h2').after(idLabel);

        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = book.id;
        this.bookForm.appendChild(idInput);

        this.bookForm.querySelector('#id-module').value = book.moduleCode;
        this.bookForm.querySelector('#publisher').value = book.publisher;
        this.bookForm.querySelector('#price').value = book.price;
        this.bookForm.querySelector(`#status label[for="${book.status}"] input`).checked = true;
        this.bookForm.querySelector('#pages').value = book.pages;
        this.bookForm.querySelector('#comments').value = book.comments;

        this.bookForm.querySelector('input[type="submit"]').value = 'Editar';
        const btnCancelar = this.bookForm.querySelector('button[type="reset"]');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', this.resetEditBook);
        document.querySelector('#add-book').addEventListener('click', this.resetEditBook);
        
    }

    resetEditBook = () => {
        this.bookForm.reset();
        this.bookForm.querySelector('h2').textContent = 'Añadir libro';
        this.bookForm.querySelector('input[type="hidden"]').remove();
        this.bookForm.querySelector('#id-book').remove();
        this.bookForm.querySelector('input[type="submit"]').value = 'Añadir';
        this.bookForm.querySelector('button[type="reset"]').textContent = 'Limpiar';
    }






}