import './style.css'
import logoBatoi from '/logoBatoi.png'
import data from './src/services/datos.js'
import { booksFromUser, booksFromModule, booksWithStatus, incrementPriceOfbooks } from './src/functions.js'

const books = data.books


document.querySelector('#app').innerHTML = `
  <div>
    <img src="${logoBatoi}" class="logo" alt="Vite logo" />
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>`

  console.log(booksFromUser(books, 4));
  console.log(booksWithStatus(booksFromModule(books, "5021"), "good"));
  console.log(incrementPriceOfbooks(books, 0.1));
  