import Module from './module.class.js';
import { getDBModules } from '../services/modules.api.js';


export default class Modules {
    constructor() {
        this.data = [];
    }

    async populate() {
        try {
            const data = await getDBModules(); 
            this.data = data.map(modulo => new Module(modulo.code, modulo.cliteral, modulo.vliteral, modulo.courseId));
        }catch (error) {
            console.error(error);
        }

    }

    toString(){
        return JSON.stringify(this);
    }

    getModuleByCode(modeuleCode) {
        const module = this.data.find(module => module.code === modeuleCode);
        if (!module) {
            throw new Error('Book not found');
        }
        return module;
    }


}
    