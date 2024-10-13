import Module from './module.class.js';
export default class Modules {
    constructor() {
        this.data = [];
    }

    populate(data) {
        this.data = data.map(modulo => new Module(modulo.code, modulo.cliteral, modulo.vliteral, modulo.courseId));
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
    