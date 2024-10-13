import User from './user.class.js';
export default class Users {
    constructor() {
        this.data = [];
        this.lastId = 0;
    }

    populate(data) {
        this.data = data.map(user => new User(user.id, user.nick, user.email, user.password));
        this.lastId = this.data.map(user => user.id).reduce((a, b) => Math.max(a, b), 0) + 1;
    }

    addUser(user) {
        const newUser = new User(this.lastId, user.nick, user.email, user.password);

        if (this.data.push(newUser)) {
            this.lastId++;
            return newUser;
        }
    }

    removeUser(userId) {
        this.data = this.data.filter(user => user.id !== userId);
        
    }

    removeUser(userId) {
        const user = this.data.find(user => user.id === userId);
        
        if (!user) {
            throw new Error(`El usuario con ID ${userId} no se encontró.`);
        }
        
        this.data = this.data.filter(user => user.id !== userId);
    }
    
    changeUser(user){
        const changUser = new User(user.id, user.nick, user.email, user.password);
        const index = this.data.findIndex(b => b.id === changUser.id);
        
        if (index === -1) {
            throw new Error(`El usuario con ID ${changUser.id} no se encontró.`);
        }
        
        this.data[index] = changUser;
        return changUser;
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
    
    toString(){
        return JSON.stringify(this);
    }
    

}