const Controller = require('./Controller.js');
const requestService = require('../../services/request.service.js');
const volunteerService = require('../../services/volunteer.service.js');


class RequestController extends Controller {
    constructor() {
        super(requestService)
    }



    async assignVolunteer(req, res, next) {
        try {

            const { id } = req.params;

            const { volunteerCode, status } = req.body;

            
            const voluntter = await volunteerService.findOne({ _id: volunteerCode })
            const isAdmin = voluntter ? (voluntter.data?.role === "admin") : false;
            console.log("Structure of volunteer object:", JSON.stringify(voluntter, null, 2));
            const result = await requestService.assignVolunteerToRequest(id, volunteerCode, status, isAdmin);


            return res.status(200).json(result);
        } catch (err) {

            next(err);
        }
    }
}


module.exports = new RequestController();