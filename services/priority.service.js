const Service = require('./Service.js');
const { HttpResponse } = require('../helper/HttpResponse.js');

const priorities = [
    { id: 1, label: 'נמוכה' },
    { id: 2, label: 'בינונית' },
    { id: 3, label: 'גבוהה' },
    { id: 4, label: 'קריטית' }
];

class PriorityService extends Service {
    constructor() {
        super();
    }

    async getAll() {
        return new HttpResponse(priorities);
    }
}

module.exports = new PriorityService();
