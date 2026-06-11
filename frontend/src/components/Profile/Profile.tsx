import { useEffect, useState, type FC } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import type { Volunteer } from "../../models/volunteers.model";
import VolunteerForm from "../VolunteerForm/VolunteerForm";
import {
  Form,
  Button,
  Card,
  Container,
  Col,
  Row,
  Offcanvas,
} from "react-bootstrap";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const [volunteer, setVolunteer] = useState<Volunteer>();
  const user = useSelector((state: any) => state.user.user?.data);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setVolunteer(user);
  }, []);

  return (
    <div className="Profile">
      {isEdit ? (
        <VolunteerForm isEdit={true} volunteer={user}></VolunteerForm>
      ) : (
        <>
          
          <Offcanvas.Body >
            <Offcanvas.Title  className="mb-4 display-6 text-center">הפרופיל שלי</Offcanvas.Title>
            <Offcanvas.Title className="m-4">קוד אישי: {volunteer?._id} </Offcanvas.Title>
            
              <Offcanvas.Title className="m-4">שם:{volunteer?.firstName}</Offcanvas.Title>
            
            <Offcanvas.Title className="m-4">משפחנ:{volunteer?.lastName}</Offcanvas.Title>

            <Offcanvas.Title className="m-4">תז:{volunteer?.tz}</Offcanvas.Title>

            <Offcanvas.Title className="m-4">טלפון:{volunteer?.phone}</Offcanvas.Title>

            <Offcanvas.Title className="m-4">התמחויות:{volunteer?.specialties}</Offcanvas.Title>

            <Offcanvas.Title className="m-4">מייל:{volunteer?.email}</Offcanvas.Title>

            <Button
              onClick={() => setIsEdit(!isEdit)}
              variant="primary"
              type="submit"
              className="w-100 mt-5"
            >
              {isEdit ? "עדכון הנתונים" : "לעדכון"}
            </Button>
          </Offcanvas.Body>
        </>
      )}

      {/*<div> {volunteers?._id}</div>
   <div> {volunteers?.email}</div>
   <div> {volunteers?.firstName}</div>
   <div> {volunteers?.lastName}</div>
   <div> {volunteers?.phone}</div>
   <div> {volunteers?.specialties}</div>
   <div> {volunteers?.tz}</div> */}
    </div>
  );
};

export default Profile;
