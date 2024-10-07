import './style.css'
import logoBatoi from '/logoBatoi.png'

document.querySelector('#app').innerHTML = `
  <div>
    <img src="${logoBatoi}" class="logo" alt="Vite logo" />
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resultado</p>
  </div>`