const Controller = require('./Controller.js');
const statusService = require('../../services/status.service.js');

class StatusController extends Controller {
    constructor() {
        super(statusService);
    }
}

module.exports = new StatusController();
