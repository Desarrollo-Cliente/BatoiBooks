import api from '../services/users.api.js';
import User from './user.class.js';
export default class Users {
    #lastId = 0;

    constructor() {
        this.data = [];
    }

    async populate() {
        const data = await api.getDBUsers();
        this.data = data.map(user => new User(user.id, user.nick, user.email, user.password));
        // this.#lastId = this.data.map(user => user.id).reduce((a, b) => Math.max(a, b), 0) + 1;
    }

    async addUser(user) {
        try {
            const userDB = await api.addDBUser(user);
            const userNow = new User(userDB.id, userDB.nick, userDB.email, userDB.password);
            if (this.data.push(userNow)) {
                return userNow;
            }
        }catch (error) {
            console.error(error);
            return;
        }
    }

    async removeUser(userId) {
        // Hace falta un reques hanled
        // const a = await api.getDBUserById(userId);
        // if ( a === null) {
        //     throw new Error(`El usuario con ID ${userId} no se encontró.`);
        // }
        const user = this.data.find(user => user.id === userId);
        
        if (!user) {
            throw new Error(`El usuario con ID ${userId} no se encontró.`);
        }
        
        try {
            await api.removeDBUser(userId);
            this.data = this.data.filter(user => user.id !== userId);
        } catch (error) {
            throw new Error(`El usuario con ID ${userId} no se pudo eliminar.`);            
        }
    }
    
    async changeUser(user){
        // Hace falta un reques hanled
        // const a = await api.getDBUserById(userId);
        // if ( a === null) {
        //     throw new Error(`El usuario con ID ${userId} no se encontró.`);
        // }
        const changUser = new User(user.id, user.nick, user.email, user.password);
        const index = this.data.findIndex(b => b.id === changUser.id);
        
        if (index === -1) {
            throw new Error(`El usuario con ID ${changUser.id} no se encontró.`);
        }
        
        try {
            await api.changeDBUser(changUser);
            this.data[index] = changUser;
            return changUser;
        } catch (error) {
            throw new Error(`El usuario con ID ${userId} no se pudo eliminar.`);            
        }
    }

    getUserById(userId) {
        return this.data.find(user => user.id === userId) || (() => { throw new Error('User no encontrado'); })();
    }

    getUserIndexById(userId) {
        const index = this.data.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new Error('User no encontrado');
        }
        return index;
    }

    getUserByNickName(nick) {
        return this.data.find(user => user.nick === nick) || (() => { throw new Error('User no encontrado'); })();
    }

    async changeUserPassword(userId, password) {
        // Hace falta un reques hanled
        // const user = this.getUserById(userId);

        const user = this.data.find(user => user.id === userId);
        
        if (!user) {
            throw new Error(`El usuario con ID ${userId} no se encontró.`);
        }

        try {
            await api.changeDBUserPassword(userId, password);
            user.password = password;
            return user;
        } catch (error) {
            throw new Error(`El usuario con ID ${userId} no se pudo cambiar.`);
        }
    }
    
    toString(){
        return JSON.stringify(this);
    }
    

}