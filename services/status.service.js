const Service = require('./Service.js');
const { HttpResponse } = require('../helper/HttpResponse.js');

const statuses = ['ממתין', 'בטיפול', 'הסתיים'];

class StatusService extends Service {
    constructor() {
        super();
    }

    async getAll() {
        return new HttpResponse(statuses);
    }
}

module.exports = new StatusService();
