const Service = require('./Service.js');
const repo = require('../repositories/repository/volunteer.repo.js')
const { HttpResponse } = require('../helper/HttpResponse.js');
class VolunteerService extends Service {
    constructor() {
        super(repo);
    }



    // volunteer.service.js
    async create(data) {
        const newData = {}
        if (data.firstName)
            newData.firstName = data.firstName
        if (data.lastName)
            newData.lastName = data.lastName
        if (data.phone)
            newData.phone = data.phone
        if (data.specialties)
            newData.specialties = data.specialties
        if (data.tz)
            newData.tz = data.tz;
        if (data.email)
            newData.email = data.email;

        // צור קוד אוטומטי למתנדב ושמור אותו כ-_id
        let code = this.createCode();
        while (await this.repo.findOne({ _id: code })) {
            code = this.createCode();
        }
        newData._id = code;

        const item = await this.repo.create(newData);
        if (item, { statusCode: 201, message: "מתנדב נוצר בהצלחה" }) {

            return new HttpResponse(item);
        }
       
        throw new Error('Error creating item');
    }

    createCode() {
        let newCode = '';
        const asci1 = Math.floor(Math.random() * 26) + 65;
        newCode += String.fromCharCode(asci1);
        const asci2 = Math.floor(Math.random() * 26) + 97;
        newCode += String.fromCharCode(asci2);
        for (let i = 0; i < 3; i++) {
            newCode += Math.floor(Math.random() * 10).toString();
        }
        return newCode;
    }

}

module.exports = new VolunteerService();