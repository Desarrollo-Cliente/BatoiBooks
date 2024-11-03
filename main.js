import './style.css';
import './public/estilo.css';
import Controller from "./src/controller/controller.class";

import logoBatoi from '/logoBatoi.png';

async function loadHtml() {
  // Cargar el contenido HTML del archivo en /public/myContent.html
  const response = await fetch('/index.html');
  const html = await response.text();
  return html;
}

document.querySelector('#app').innerHTML = `
  <header>
    <a href="https://vitesjs.dev" target="_blank">
      <img src="${logoBatoi}" class="logo" alt="Vite logo" />
    </a>
    <h1>BatoiBooks</h1>
  </header>
`;

// Llama a la función loadHtml para añadir el contenido dinámico
await loadHtml().then(async (htmlContent) => {
  document.querySelector('#app').innerHTML+= htmlContent;

  const controller = new Controller()
  await controller.init()
}).catch((error) => {
  console.error('Error al cargar el contenido HTML:', error);
});







