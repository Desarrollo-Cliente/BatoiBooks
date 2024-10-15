import url from './api';


function getDBUsers() {
  return fetch(`${url}users`)
    .then(response => response.json());
}

function getDBUserById(userId) {
    return fetch(`${url}users/${userId}`)
        .then(response => response.json());
}

function addDBUser(user) {
    return fetch(`${url}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json());
}

function removeDBUser(userId) {
    return fetch(`${url}users/${userId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

function changeDBUser(user) {
    return fetch(`${url}users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json());
}

function changeDBUserPassword(userId, password) {
    return fetch(`${url}users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    }).then(response => response.json());
}