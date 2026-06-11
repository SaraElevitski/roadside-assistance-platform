const Service = require('./Service.js');
const repo = require('../repositories/repository/request.repo.js')
const volunteerRepo = require('../repositories/repository/volunteer.repo.js')
class RequestService extends Service {
    constructor() {
        super(repo);
        this.volunteerRepo = volunteerRepo
    }


    async getAll(query) {
        const filters = {}
        if (query['location.areaCode'])
            filters['location.areaCode'] = query['location.areaCode'];
        if (query.status) filters.status = query.status;
        if (query.priority) filters.priority = query.priority;
        return super.getAll(filters)
    }

    
    async assignVolunteerToRequest(requestId, volunteerCode, newStatus, isAdmin) {
        
        const currentRequest = await this.repo.getById(requestId);
        if (!currentRequest) {
            const error = new Error("request not found");
            error.statusCode = 404;
            throw error;
        }

        const data = { status: newStatus };

    if (!isAdmin ) {
        data.volunteerCode = volunteerCode;
    }

      if (!isAdmin  && currentRequest.volunteerCode !== volunteerCode) {
    const error = new Error("Only the volunteer associated with the request can complete it.");
    error.statusCode = 403;
    throw error;
}

const requestUpdate = await this.repo.update(requestId, data);
return requestUpdate

        
    }
}

module.exports = new RequestService();