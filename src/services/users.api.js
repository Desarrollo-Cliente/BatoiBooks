const url = import.meta.env.VITE_API_URL;


async function getDBUsers() {
  return await fetch(`${url}users`)
    .then(response => response.json());
}

async function getDBUserById(userId) {
    return await fetch(`${url}users/${userId}`)
        .then(response => response.json());
}

async function addDBUser(user) {
    // Esto no deberia de hacer falta, pero lo hago porque no me llega la id desde el test
    user.id = await getId();

    // Codigo normal
    return await fetch(`${url}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json());
}

async function removeDBUser(userId) {
    return await fetch(`${url}users/${userId}`, {
        method: 'DELETE'
    }).then(response => response.json());
}

async function changeDBUser(user) {
    return await fetch(`${url}users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json());
}

async function changeDBUserPassword(userId, password) {
    return await fetch(`${url}users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    }).then(response => response.json());
}

async function getId() {
    return await fetch(`${url}users`)
        .then(response => response.json())
        .then(data => {
            return Math.max(...data.map(user => user.id)) + 1;
        });
}

export default { 
    getDBUsers, 
    getDBUserById, 
    addDBUser, 
    removeDBUser, 
    changeDBUser, 
    changeDBUserPassword 
};