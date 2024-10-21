import './style.css'
import logoBatoi from '/logoBatoi.png'
import Modules from './src/model/modules.class.js'
import Books from './src/model/books.class.js'
// import Users from './src/model/users.class.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitesjs.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Vite logo" />
    </a>
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>`


const modules = new Modules()
console.log('hola');
// await modules.populate()
// console.log(modules.data);

// modules.populate()


// const users = new Users()
// users.populate(data.users)
const books = new Books()
await books.populate()
console.log(books.data);


// console.log(books.booksFromModule("5021"));
// console.log(books.booksWithStatus("new"));
// console.log(books.incrementPriceOfbooks(0.1));

// console.log(JSON.stringify(books.data));
