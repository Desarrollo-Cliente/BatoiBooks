import url from './api';


function getDBModules() {
  return fetch(`${url}modules`)
    .then(response => response.json());
}