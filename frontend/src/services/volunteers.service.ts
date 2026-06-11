import axios from "axios";
import type { Volunteer } from "../models/volunteers.model";

export default new (class VolunteersService {
  // שליפת כל המתנדבים
  getVolunteersList() {
    return axios.get("http://127.0.0.1:8080/api/volunteers");
  }

  // הוספת מתנדב
  createVolunteer(volunteer: Omit<Volunteer, "_id">) {
    return axios.post("http://127.0.0.1:8080/api/volunteers", volunteer);
  }

  // עדכון מתנדב
  updateVolunteer(id: string, data: Omit<Volunteer, "_id">) {
    return axios.put(`http://127.0.0.1:8080/api/volunteers/${id}`, data);
  }

  // מחיקת מתנדב
  deleteVolunteer(id: string) {
    return axios.delete(`http://127.0.0.1:8080/api/volunteers/${id}`);
  }

  loginVolunteer(loginData: any) {
    return axios.post("http://127.0.0.1:8080/api/volunteers/login", {
      _id: loginData.password,
      email: loginData.email,
    });
  }
})();
