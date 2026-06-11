import axios from "axios"
import type { HelpRequest } from "../models/helpRequest.model"
export default new class HelpRequestService {

    // שליפת כל הקריאות
    getRequestsList() {
        return axios.get("http://127.0.0.1:8080/api/requests")
    }

    
    // הוספת קריאה
    createRequest(req :  Omit<HelpRequest, '_id'>) {
        return axios.post("http://127.0.0.1:8080/api/requests", req)
    }

    // עדכון קריאה
    updateRequest(id: string, data: HelpRequest){
        return axios.put(`http://127.0.0.1:8080/api/requests/${id}`, data )

    }

    // מחיקת קריאה
    deleteRequest(id: string)
    {
        return axios.delete(`http://127.0.0.1:8080/api/requests/${id}`)
    }

    // שליפת קריאה 
    getRequestById(id: string)
    {
        return axios.get(`http://127.0.0.1:8080/api/requests/${id}`)
    }


    // התאמת מתנדב לקריאה
    assignVolunteer(id: number, volunteerCode: string, status: string) {
        return axios.put(`http://127.0.0.1:8080/api/requests/${id}/assign`, {
            volunteerCode,
            status
        });
    }

}