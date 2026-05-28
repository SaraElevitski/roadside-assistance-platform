const Controller = require('./Controller.js');
const priorityService = require('../../services/priority.service.js');

class PriorityController extends Controller {
    constructor() {
        super(priorityService);
    }
}

module.exports = new PriorityController();
