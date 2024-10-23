import './style.css'
import logoBatoi from '/logoBatoi.png'
import Modules from './src/model/modules.class.js'
import Books from './src/model/books.class.js'
import Users from './src/model/users.class.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitesjs.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Vite logo" />
    </a>
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>`


const myBooks = new Books();
const myUsers = new Users();
const myModules = new Modules();

Promise.all([
  myBooks.populate(),
  myUsers.populate(),
  myModules.populate()
]).then(() => {
  // Mostrar todos los datos por consola después de que las promesas se hayan resuelto
  console.log(myBooks.toString());
  console.log(myUsers.toString());
  console.log(myModules.toString());

  
  console.log('Libros del módulo 5021:\n', myBooks.booksFromModule('5021'));
  console.log('Libros con estado "new":\n', myBooks.booksWithStatus('new'));
}).catch(error => {
  console.error("Error populando datos: ", error);
});